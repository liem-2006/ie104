/**
 * @file Hiển thị hồ sơ giảng viên theo email (TV2 Chặng 2B).
 * Hỗ trợ alias email, ưu tiên hiển thị chủ đề nghiên cứu thật cho hồ sơ tối giản,
 * đồng bộ thẻ nhóm lĩnh vực với danh bạ và phân trang danh sách chủ đề > 10 mục.
 */

import {
  loadResearch,
  loadLecturers,
  flattenTopics,
  normalizeEmail,
  element,
  avatar,
  externalLink,
  renderPageMessage,
  createTopicRow,
  createPaginationNav,
  createGroupTags,
  getScrollBehavior,
  countTopicNodes,
} from "./data.js";

/** Số lượng chủ đề tối đa trên một trang trong hồ sơ giảng viên. */
const TOPIC_PAGE_SIZE = 10;

/** Trang hiện tại của danh sách chủ đề nghiên cứu. */
let topicCurrentPage = 1;

document.addEventListener("DOMContentLoaded", initProfile);

/**
 * Nạp hồ sơ giảng viên theo email từ query parameter và render giao diện.
 * @returns {Promise<void>} Promise hoàn tất việc nạp và hiển thị hồ sơ.
 */
async function initProfile() {
  const main = document.getElementById("main-content");
  try {
    const [research, lecturers] = await Promise.all([loadResearch(), loadLecturers()]);
    const emailParam = new URLSearchParams(location.search).get("email");
    const email = normalizeEmail(emailParam);
    const lecturer = lecturers.find((person) => matchesLecturerEmail(person, email));

    if (!email || !lecturer) {
      renderPageMessage(
        main,
        "Không tìm thấy giảng viên",
        "Email trên đường dẫn không có trong danh bạ giảng viên UIT.",
        "../index.html",
      );
      return;
    }

    const groups = research.groups.map(getGroup);
    const allTopics = flattenTopics(research);
    const related = allTopics.filter((entry) => matchesTopicEmail(entry, email));

    renderProfile(lecturer, related, groups);
  } catch {
    renderPageMessage(
      main,
      "Không thể tải hồ sơ",
      "Đã có lỗi xảy ra khi nạp dữ liệu. Hãy tải lại trang để thử lại.",
      "../index.html",
    );
  } finally {
    // Luôn giải phóng trạng thái tải và thông báo loading kể cả khi lỗi hoặc không tìm thấy.
    main.removeAttribute("aria-busy");
    document.getElementById("profile-load-status")?.remove();
  }
}

/**
 * So khớp email giảng viên trong danh bạ với email đã chuẩn hóa.
 * @param {object} person - Bản ghi giảng viên trong danh bạ.
 * @param {string} targetEmail - Email đã chuẩn hóa từ URL.
 * @returns {boolean} True nếu trùng email.
 */
function matchesLecturerEmail(person, targetEmail) {
  return normalizeEmail(person.email) === targetEmail;
}

/**
 * So khớp email giảng viên hướng dẫn trong bản ghi chủ đề.
 * @param {object} entry - Bản ghi chủ đề kèm nhóm.
 * @param {string} targetEmail - Email đã chuẩn hóa của giảng viên.
 * @returns {boolean} True nếu trùng email.
 */
function matchesTopicEmail(entry, targetEmail) {
  return normalizeEmail(entry.topic.lecturer.email) === targetEmail;
}

/**
 * Lấy metadata nhóm từ mục nhóm nguồn.
 * @param {object} entry - Mục nhóm trong dữ liệu nghiên cứu.
 * @returns {object} Metadata nhóm gồm id và name.
 */
function getGroup(entry) {
  return entry.group;
}

/**
 * Lấy mã ID nhóm từ bản ghi chủ đề.
 * @param {object} entry - Bản ghi chủ đề kèm nhóm.
 * @returns {string} Mã nhóm nghiên cứu.
 */
function getGroupId(entry) {
  return entry.group.id;
}

/**
 * Kiểm tra giảng viên có dữ liệu giới thiệu thực tế (tiểu sử, hướng nghiên cứu hoặc nguồn) hay không.
 * @param {object} lecturer - Dữ liệu giảng viên.
 * @returns {boolean} True nếu giảng viên có thông tin hồ sơ chi tiết thực tế.
 */
function hasProfileDetails(lecturer) {
  const profile = lecturer?.profile;
  return Boolean(
    profile?.bio ||
      (Array.isArray(profile?.researchAreas) && profile.researchAreas.length) ||
      profile?.sourceUrl,
  );
}

/**
 * Tạo một khối section kèm tiêu đề h2 ngữ nghĩa.
 * @param {string} title - Tiêu đề mục.
 * @param {string} [id=""] - Thuộc tính ID tùy chọn cho section.
 * @returns {HTMLElement} Phần tử section đã gắn tiêu đề h2.
 */
function section(title, id = "") {
  const block = element("section", "profile-section");
  if (id) block.id = id;
  block.append(element("h2", "profile-section__title", title));
  return block;
}

/**
 * Ghép các thành phần hồ sơ theo mức độ đầy đủ dữ liệu thực và hiển thị lên trang.
 * @param {object} lecturer - Dữ liệu giảng viên.
 * @param {object[]} related - Danh sách chủ đề giảng viên hướng dẫn.
 * @param {object[]} groups - Danh sách nhóm nghiên cứu theo thứ tự nguồn.
 * @returns {void} Không trả về giá trị.
 */
function renderProfile(lecturer, related, groups) {
  document.title = lecturer.name + " | UIT Discovery";
  const title = document.getElementById("profile-title");
  title.textContent = lecturer.name;

  const breadcrumbCurrent = document.getElementById("profile-breadcrumb-current");
  if (breadcrumbCurrent) {
    breadcrumbCurrent.textContent = lecturer.name;
  }

  const card = element("article", "profile-card");
  card.append(createProfileHeader(lecturer, title, related, groups));
  // Quick-facts (M1/UI-05): 3 số liệu suy từ JSON thật (chủ đề / kiến thức / môn) làm điểm
  // neo thông tin cho cả hồ sơ đầy đủ lẫn hồ sơ tối giản (không thêm dữ liệu mới).
  const quickFacts = createQuickFacts(related);
  if (quickFacts) card.append(quickFacts);

  const links = createResearchLinks(lecturer.researchProfiles || []);
  const metrics = renderMetrics(lecturer.metrics || []);
  topicCurrentPage = 1;
  const topicsSection = createRelatedTopics(related);

  if (hasProfileDetails(lecturer)) {
    // Hồ sơ có dữ liệu giới thiệu thực: giữ luồng Giới thiệu -> Hồ sơ NC -> Chỉ số -> Chủ đề.
    card.append(createBiography(lecturer));
    if (links) card.append(links);
    if (metrics) card.append(metrics);
    card.append(topicsSection);
  } else {
    // Hồ sơ chưa có dữ liệu giới thiệu chi tiết: ưu tiên Chủ đề nghiên cứu ngay sau header, đặt ghi chú ở cuối.
    card.append(topicsSection);
    if (links) card.append(links);
    if (metrics) card.append(metrics);
    card.append(createMinimalProfileNote());
  }

  document.getElementById("profile-content").replaceChildren(card);
}

/**
 * Tạo các thẻ lĩnh vực nghiên cứu suy dẫn từ các chủ đề mà giảng viên hướng dẫn.
 * @param {object[]} related - Danh sách chủ đề liên quan của giảng viên.
 * @param {object[]} groups - Danh sách nhóm nghiên cứu theo thứ tự nguồn.
 * @returns {HTMLElement|null} Khối chứa thẻ nhóm hoặc null nếu không có nhóm liên quan.
 */
function createProfileTags(related, groups) {
  const groupIds = new Set(related.map(getGroupId));
  const tags = createGroupTags(groups, groupIds, "profile-tags");
  // Giữ nguyên hành vi cũ: trả null khi giảng viên chưa có nhóm nào khớp để header không rỗng.
  return tags.children.length ? tags : null;
}

/**
 * Tạo phần đầu trang hồ sơ gồm avatar, h1 tên, đơn vị, email và thẻ nhóm nghiên cứu.
 * @param {object} lecturer - Dữ liệu giảng viên.
 * @param {HTMLHeadingElement} title - Phần tử heading chính h1.
 * @param {object[]} related - Danh sách chủ đề liên quan.
 * @param {object[]} groups - Danh sách nhóm nghiên cứu.
 * @returns {HTMLElement} Phần tử header hồ sơ.
 */
function createProfileHeader(lecturer, title, related, groups) {
  const header = element("header", "profile-header");
  const info = element("div", "profile-header__info");
  info.append(title);

  if (lecturer.profile?.affiliation) {
    info.append(element("p", "profile-header__affiliation", lecturer.profile.affiliation));
  }

  const mail = element("span", "profile-header__email", lecturer.email);
  info.append(mail);

  const tags = createProfileTags(related, groups);
  if (tags) {
    info.append(tags);
  }

  header.append(avatar(lecturer, "profile-header__avatar"), info);
  return header;
}

/**
 * Tạo khối quick-facts gồm 3 ô số liệu suy từ dữ liệu thật: số chủ đề hướng dẫn, tổng mục
 * kiến thức nền và số môn học gợi ý duy nhất (khử trùng lặp giữa các chủ đề bằng Set chung).
 * @param {object[]} related - Danh sách chủ đề giảng viên hướng dẫn (kèm nhóm nguồn).
 * @returns {HTMLElement|null} Khối section quick-facts; null khi không có chủ đề.
 */
function createQuickFacts(related) {
  if (!related.length) return null;

  // Đếm mục kiến thức và gom môn gợi ý duy nhất qua toàn bộ chủ đề bằng Set chung (khử trùng).
  const courses = new Set();
  let nodeCount = 0;
  for (const entry of related) {
    const counts = countTopicNodes(entry.topic.keywords, courses);
    nodeCount += counts.nodeCount;
  }
  const facts = [
    { value: related.length, label: "chủ đề hướng dẫn" },
    { value: nodeCount, label: "mục kiến thức nền" },
    { value: courses.size, label: "môn học gợi ý" },
  ];

  const block = section("Tóm tắt hồ sơ");
  const grid = element("div", "metrics-grid profile-quick-facts");
  grid.setAttribute("role", "list");
  grid.setAttribute("aria-label", "Tóm tắt hồ sơ giảng viên");
  for (const fact of facts) {
    const item = element("div", "metric-card", "");
    item.setAttribute("role", "listitem");
    item.append(element("p", "metric-card__value", String(fact.value)));
    item.append(element("p", "metric-card__label", fact.label));
    grid.append(item);
  }
  block.append(grid);
  return block;
}

/**
 * Tạo khối giới thiệu tiểu sử, hướng nghiên cứu và nguồn xác minh cho hồ sơ có dữ liệu thực.
 * @param {object} lecturer - Dữ liệu giảng viên.
 * @returns {HTMLElement} Khối section Giới thiệu.
 */
function createBiography(lecturer) {
  const block = section("Giới thiệu");

  if (lecturer.profile?.bio) {
    block.append(element("p", "profile-section__text", lecturer.profile.bio));
  }

  if (lecturer.profile?.researchAreas?.length) {
    block.append(element("h3", "profile-section__subtitle", "Hướng nghiên cứu"));
    const list = element("ul", "profile-areas");
    for (const area of lecturer.profile.researchAreas) {
      list.append(element("li", "", area));
    }
    block.append(list);
  }

  const source = externalLink("Nguồn thông tin", lecturer.profile?.sourceUrl);
  if (source) {
    const note = element("p", "profile-source-note");
    note.append(source);
    if (lecturer.profile.checkedAt) {
      note.append(" · Ngày ghi nhận: " + lecturer.profile.checkedAt);
    }
    block.append(note);
  }

  return block;
}

/**
 * Tạo ghi chú ngắn ở cuối trang cho các hồ sơ chưa có dữ liệu tiểu sử và chỉ số học thuật.
 * @returns {HTMLParagraphElement} Phần tử ghi chú gọn.
 */
function createMinimalProfileNote() {
  return element(
    "p",
    "profile-minimal-note",
    "Chưa có thêm tiểu sử hoặc chỉ số học thuật trong dữ liệu hiện tại.",
  );
}

/**
 * Tạo khối danh sách liên kết hồ sơ nghiên cứu ngoài (Google Scholar, ORCID...).
 * @param {object[]} profiles - Danh sách liên kết hồ sơ ngoài.
 * @returns {HTMLElement|null} Khối liên kết hoặc null nếu không có liên kết hợp lệ.
 */
function createResearchLinks(profiles) {
  const block = section("Hồ sơ nghiên cứu");
  const links = element("div", "profile-links");
  for (const profile of profiles) {
    const link = externalLink(profile.label, profile.url);
    if (link) links.append(link);
  }
  if (!links.children.length) return null;
  block.append(links);
  return block;
}

/**
 * Tạo khối hiển thị danh sách chủ đề nghiên cứu kèm phân trang khi có hơn 10 chủ đề.
 * @param {object[]} related - Danh sách toàn bộ chủ đề của giảng viên.
 * @returns {HTMLElement} Section chứa danh sách chủ đề và thanh phân trang.
 */
function createRelatedTopics(related) {
  const block = section("Chủ đề nghiên cứu", "profile-topics-section");

  if (!related.length) {
    block.append(element("p", "profile-section__empty", "Chưa có chủ đề trong bộ dữ liệu hiện tại."));
    return block;
  }

  const total = related.length;
  const pageCount = Math.ceil(total / TOPIC_PAGE_SIZE);

  const summaryEl = element("p", "profile-topics-summary");
  const listEl = element("ul", "related-topics-list");
  const navEl = element("nav", "profile-pagination");
  navEl.setAttribute("aria-label", "Phân trang chủ đề nghiên cứu");
  block.append(summaryEl, listEl, navEl);

  navEl.addEventListener("click", (event) =>
    handleTopicPaginationClick(event, listEl, summaryEl, navEl, related, block, pageCount),
  );

  renderTopicPage(listEl, summaryEl, navEl, related, pageCount);
  return block;
}

/**
 * Render danh sách chủ đề và thanh phân trang tương ứng với trang hiện tại.
 * @param {HTMLElement} listEl - Phần tử ul chứa danh sách chủ đề.
 * @param {HTMLElement} summaryEl - Phần tử p hiển thị tổng số chủ đề.
 * @param {HTMLElement} navEl - Phần tử nav phân trang.
 * @param {object[]} related - Toàn bộ chủ đề của giảng viên.
 * @param {number} pageCount - Tổng số trang.
 * @returns {void} Không trả về giá trị.
 */
function renderTopicPage(listEl, summaryEl, navEl, related, pageCount) {
  const total = related.length;
  summaryEl.hidden = false;

  if (total > TOPIC_PAGE_SIZE) {
    const start = (topicCurrentPage - 1) * TOPIC_PAGE_SIZE;
    const end = Math.min(start + TOPIC_PAGE_SIZE, total);
    summaryEl.textContent = `Hiển thị ${start + 1}–${end} trong tổng số ${total} chủ đề (Trang ${topicCurrentPage}/${pageCount})`;
    listEl.replaceChildren(...related.slice(start, end).map(createRelatedTopicItem));
    createPaginationNav(navEl, topicCurrentPage, pageCount, "profile-pagination__button");
    return;
  }

  // Luôn hiển thị dòng tổng số chủ đề cho mọi hồ sơ có từ 1 chủ đề trở lên.
  summaryEl.textContent = `${total} chủ đề hướng dẫn`;
  listEl.replaceChildren(...related.map(createRelatedTopicItem));
  navEl.hidden = true;
  navEl.replaceChildren();
}

/**
 * Xử lý sự kiện click trên thanh phân trang chủ đề nghiên cứu.
 * @param {MouseEvent} event - Sự kiện click vào nút trang.
 * @param {HTMLElement} listEl - Phần tử ul danh sách chủ đề.
 * @param {HTMLElement} summaryEl - Phần tử p tóm tắt số lượng.
 * @param {HTMLElement} navEl - Phần tử nav phân trang.
 * @param {object[]} related - Danh sách chủ đề của giảng viên.
 * @param {HTMLElement} block - Section chủ đề nghiên cứu để focus/scroll tới đầu mục.
 * @param {number} pageCount - Tổng số trang.
 * @returns {void} Không trả về giá trị.
 */
function handleTopicPaginationClick(event, listEl, summaryEl, navEl, related, block, pageCount) {
  const btn = event.target.closest("button[data-page]");
  if (!btn || btn.disabled) return;

  topicCurrentPage = Number(btn.dataset.page);
  renderTopicPage(listEl, summaryEl, navEl, related, pageCount);

  const heading = block.querySelector("h2");
  if (heading) {
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  }
  // Tôn trọng prefers-reduced-motion: cuộn tức thời nếu người dùng bật giảm chuyển động.
  block.scrollIntoView({ behavior: getScrollBehavior(), block: "start" });
}

/**
 * Tạo phần tử li bọc một hàng chủ đề nghiên cứu.
 * @param {object} entry - Bản ghi chủ đề kèm nhóm nguồn.
 * @returns {HTMLLIElement} Phần tử li chứa hàng chủ đề.
 */
function createRelatedTopicItem(entry) {
  const item = element("li", "related-topic-item");
  item.append(createProfileTopicRow(entry));
  return item;
}

/**
 * Tạo hàng chủ đề nghiên cứu cho trang hồ sơ bằng component chung (lược bỏ dòng "Hướng dẫn:").
 * @param {object} entry - Bản ghi chủ đề và nhóm nguồn.
 * @returns {HTMLElement} Phần tử hàng chủ đề giữ nguyên tên đề tài, tóm tắt trụ cột và badge nhóm.
 */
function createProfileTopicRow(entry) {
  return createTopicRow(entry, 3, false);
}

/**
 * Tạo một thẻ hiển thị từng chỉ số nghiên cứu (Trích dẫn, h-index, i10-index).
 * @param {string} label - Nhãn tên chỉ số.
 * @param {number} value - Giá trị số nguyên hợp lệ (bao gồm cả 0 thật).
 * @returns {HTMLDivElement} Phần tử metric-card.
 */
function createMetricCard(label, value) {
  const metric = element("div", "metric-card");
  metric.append(
    element("p", "metric-card__value", value),
    element("p", "metric-card__label", label),
  );
  return metric;
}

/**
 * Render khối số liệu chỉ số nghiên cứu; giữ nguyên giá trị 0 có thật và không bịa khi thiếu.
 * @param {object[]} records - Danh sách bản ghi chỉ số từ JSON.
 * @returns {HTMLElement|null} Khối hiển thị chỉ số hoặc null nếu không có bản ghi hợp lệ.
 */
function renderMetrics(records) {
  const block = section("Chỉ số nghiên cứu");
  let count = 0;

  for (const record of records) {
    const source = externalLink(record.sourceName || "Nguồn chỉ số", record.sourceUrl);
    if (!source || !record.asOf) continue;

    const grid = element("div", "metrics-grid");
    for (const [key, label] of [
      ["citations", "Trích dẫn"],
      ["hIndex", "h-index"],
      ["i10Index", "i10-index"],
    ]) {
      if (typeof record[key] === "number" && Number.isFinite(record[key]) && record[key] >= 0) {
        grid.append(createMetricCard(label, record[key]));
      }
    }

    if (!grid.children.length) continue;

    const note = element("p", "profile-source-note");
    note.append(
      source,
      document.createTextNode(
        " · Ngày thống kê: " +
          record.asOf +
          (record.scope === "all-time" ? " · Toàn bộ thời gian" : ""),
      ),
    );

    block.append(grid, note);
    count++;
  }

  return count ? block : null;
}
