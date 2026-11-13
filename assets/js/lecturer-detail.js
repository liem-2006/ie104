/**
 * @file Hiển thị hồ sơ giảng viên theo email (TV2 Job 2 nâng cấp từ TV3).
 * Xử lý avatar fallback chuẩn tiếng Việt, phân trang danh sách chủ đề
 * khi có nhiều hơn 10 chủ đề, và tối ưu khả năng truy cập WAI-ARIA.
 */

import {
  loadResearch,
  loadLecturers,
  flattenTopics,
  normalizeEmail,
  element,
  externalLink,
  renderPageMessage,
  createTopicRow,
} from "./data.js";

/** Số lượng chủ đề tối đa trên một trang trong hồ sơ giảng viên */
const TOPIC_PAGE_SIZE = 10;

/** Trang hiện tại của danh sách chủ đề nghiên cứu */
let topicCurrentPage = 1;

document.addEventListener("DOMContentLoaded", initProfile);

/**
 * Nạp hồ sơ giảng viên theo email từ query parameter và render giao diện.
 * @returns {Promise<void>}
 */
async function initProfile() {
  const main = document.getElementById("main-content");
  try {
    const [research, lecturers] = await Promise.all([loadResearch(), loadLecturers()]);
    const emailParam = new URLSearchParams(location.search).get("email");
    let email = normalizeEmail(emailParam);
    // Hỗ trợ alias URL cũ hunglkt@uit.edu.vn -> hunglk@uit.edu.vn
    if (email === "hunglkt@uit.edu.vn") {
      email = "hunglk@uit.edu.vn";
    }
    const lecturer = lecturers.find(matchesEmail);

    if (!email || !lecturer) {
      renderPageMessage(
        main,
        "Không tìm thấy giảng viên",
        "Email trên đường dẫn không có trong danh bạ giảng viên UIT.",
        "../index.html",
      );
      return;
    }

    // Lấy các chủ đề liên quan được hướng dẫn bởi giảng viên này
    const allTopics = flattenTopics(research);
    const related = allTopics.filter(matchesTopic);

    renderProfile(lecturer, related);

    /**
     * So khớp email giảng viên trong danh bạ.
     * @param {object} person Giảng viên.
     * @returns {boolean} True nếu trùng email.
     */
    function matchesEmail(person) {
      return normalizeEmail(person.email) === email;
    }

    /**
     * So khớp email người hướng dẫn trong chủ đề.
     * @param {object} entry Bản ghi chủ đề.
     * @returns {boolean} True nếu trùng email.
     */
    function matchesTopic(entry) {
      return normalizeEmail(entry.topic.lecturer.email) === email;
    }
  } catch {
    renderPageMessage(
      main,
      "Không thể tải hồ sơ",
      "Đã có lỗi xảy ra khi nạp dữ liệu. Hãy tải lại trang để thử lại.",
      "../index.html",
    );
  } finally {
    main.removeAttribute("aria-busy");
    document.getElementById("profile-load-status")?.remove();
  }
}

/**
 * Tạo một khối section kèm tiêu đề h2 ngữ nghĩa.
 * @param {string} title Tiêu đề section.
 * @param {string} [id=""] ID tùy chọn cho section.
 * @returns {HTMLElement} Phần tử section.
 */
function section(title, id = "") {
  const block = element("section", "profile-section");
  if (id) block.id = id;
  block.append(element("h2", "profile-section__title", title));
  return block;
}

/**
 * Rút trích 2 chữ cái viết tắt đại diện cho avatar giảng viên (tiếng Việt chuẩn xác).
 * Loại bỏ học hàm (PGS, TS...) và đơn vị trong ngoặc ở cuối tên (ĐHQT, ĐHQG...).
 * @param {string} rawName Tên đầy đủ từ dữ liệu.
 * @returns {string} 2 ký tự viết tắt viết hoa.
 */
function getLecturerInitials(rawName) {
  if (!rawName) return "GV";
  // 1. Loại bỏ các phần chú thích đơn vị trong ngoặc ở cuối tên: (ĐHQT), (ĐHQG-HCM)...
  const withoutOrg = rawName.replace(/\s*\([^)]*\)\s*$/g, "").trim();
  // 2. Loại bỏ các học hàm, học vị tiền tố
  const withoutTitle = withoutOrg
    .replace(/^(PGS\.?\s*TS\.?|GS\.?\s*TS\.?|PGS\.?|GS\.?|TS\.?|ThS\.?|Th\.S\.?|CN\.?)\s+/i, "")
    .trim();
  // 3. Tách các từ tên tiếng Việt
  const words = withoutTitle.split(/\s+/).filter((w) => /[\p{L}]/u.test(w));
  if (!words.length) return "GV";
  // Lấy 2 từ cuối cùng của tên (Tên đệm + Tên chính)
  const selected = words.slice(-2);
  return selected
    .map((w) => {
      const match = w.match(/[\p{L}]/u);
      return match ? match[0].toUpperCase() : "";
    })
    .join("");
}

/**
 * Tạo khung avatar kèm ảnh (nếu có) hoặc fallback chữ viết tắt chuẩn xác.
 * @param {object} lecturer Dữ liệu giảng viên.
 * @param {string} className Tên lớp CSS khung avatar.
 * @returns {HTMLElement} Khung avatar.
 */
function createLecturerAvatar(lecturer, className) {
  const initials = getLecturerInitials(lecturer.name);
  const box = element("div", className, initials);
  box.setAttribute("aria-hidden", "true");

  if (lecturer.photo?.path) {
    try {
      const url = new URL(lecturer.photo.path, document.baseURI);
      if (["http:", "https:"].includes(url.protocol)) {
        const image = element("img");
        image.src = url.href;
        image.alt = lecturer.photo.alt || lecturer.name;
        image.loading = "lazy";
        image.addEventListener("error", () => {
          box.textContent = initials;
        }, { once: true });
        box.replaceChildren(image);
      }
    } catch {
      // Giữ nguyên initials nếu URL lỗi
    }
  }

  return box;
}

/**
 * Ghép các thành phần hồ sơ và hiển thị lên trang.
 * @param {object} lecturer Dữ liệu giảng viên.
 * @param {object[]} related Các chủ đề giảng viên hướng dẫn.
 * @returns {void}
 */
function renderProfile(lecturer, related) {
  document.title = lecturer.name + " | UIT Discovery";
  const title = document.getElementById("profile-title");
  title.textContent = lecturer.name;

  const card = element("article", "profile-card");
  card.append(createProfileHeader(lecturer, title), createBiography(lecturer));

  const links = createResearchLinks(lecturer.researchProfiles || []);
  const metrics = renderMetrics(lecturer.metrics || []);
  if (links) card.append(links);
  if (metrics) card.append(metrics);

  topicCurrentPage = 1;
  card.append(createRelatedTopics(related));

  document.getElementById("profile-content").replaceChildren(card);
}

/**
 * Tạo phần đầu trang hồ sơ (Header) với h1, avatar, đơn vị và email liên hệ.
 * @param {object} lecturer Dữ liệu giảng viên.
 * @param {HTMLHeadingElement} title Phần tử heading chính h1.
 * @returns {HTMLElement} Phần đầu hồ sơ.
 */
function createProfileHeader(lecturer, title) {
  const header = element("header", "profile-header");
  const info = element("div", "profile-header__info");
  info.append(title);

  if (lecturer.profile?.affiliation) {
    info.append(element("p", "profile-header__affiliation", lecturer.profile.affiliation));
  }

  const mail = element("a", "profile-header__email", lecturer.email);
  mail.href = "mailto:" + normalizeEmail(lecturer.email);
  info.append(mail);

  // Avatar sử dụng hàm xử lý viết tắt chuẩn tiếng Việt
  header.append(createLecturerAvatar(lecturer, "profile-header__avatar"), info);
  return header;
}

/**
 * Tạo phần giới thiệu bản thân và các hướng nghiên cứu.
 * @param {object} lecturer Dữ liệu giảng viên.
 * @returns {HTMLElement} Khối giới thiệu.
 */
function createBiography(lecturer) {
  const block = section("Giới thiệu");
  block.append(
    element(
      "p",
      "profile-section__text",
      lecturer.profile?.bio ||
        "Thông tin hồ sơ đang được bổ sung. Bạn có thể xem các chủ đề bên dưới và liên hệ giảng viên qua email.",
    ),
  );

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
 * Tạo khối danh sách liên kết hồ sơ nghiên cứu (Google Scholar, ORCID...).
 * @param {object[]} profiles Danh sách liên kết hồ sơ.
 * @returns {HTMLElement|null} Khối liên kết hoặc null nếu không có.
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
 * Tạo khối hiển thị chủ đề nghiên cứu kèm phân trang khi có nhiều hơn 10 chủ đề.
 * @param {object[]} related Danh sách toàn bộ chủ đề của giảng viên.
 * @returns {HTMLElement} Section chứa danh sách chủ đề và phân trang.
 */
function createRelatedTopics(related) {
  const block = section("Chủ đề nghiên cứu", "profile-topics-section");

  if (!related.length) {
    block.append(element("p", "profile-section__empty", "Chưa có chủ đề trong bộ dữ liệu hiện tại."));
    return block;
  }

  const total = related.length;
  const pageCount = Math.ceil(total / TOPIC_PAGE_SIZE);

  // Dòng tóm tắt số lượng chủ đề
  const summaryEl = element("p", "profile-topics-summary");
  block.append(summaryEl);

  // Danh sách chủ đề (ul)
  const listEl = element("ul", "related-topics-list");
  block.append(listEl);

  // Thanh phân trang (chỉ hiển thị khi total > 10)
  const navEl = element("nav", "profile-pagination");
  navEl.setAttribute("aria-label", "Phân trang chủ đề nghiên cứu");
  block.append(navEl);

  /**
   * Cập nhật danh sách chủ đề theo trang hiện tại.
   * @returns {void}
   */
  function updateTopicPage() {
    if (total > TOPIC_PAGE_SIZE) {
      const start = (topicCurrentPage - 1) * TOPIC_PAGE_SIZE;
      const end = Math.min(start + TOPIC_PAGE_SIZE, total);
      summaryEl.textContent = `Hiển thị ${start + 1}–${end} trong tổng số ${total} chủ đề (Trang ${topicCurrentPage}/${pageCount})`;
      summaryEl.hidden = false;

      const pageItems = related.slice(start, end);
      listEl.replaceChildren(
        ...pageItems.map((entry) => {
          const item = element("li", "related-topic-item");
          item.append(createProfileTopicRow(entry));
          return item;
        }),
      );

      renderTopicPagination(navEl, pageCount, handleTopicPageChange);
    } else {
      summaryEl.textContent = `Tổng cộng ${total} chủ đề nghiên cứu`;
      summaryEl.hidden = total <= 3;
      listEl.replaceChildren(
        ...related.map((entry) => {
          const item = element("li", "related-topic-item");
          item.append(createProfileTopicRow(entry));
          return item;
        }),
      );
      navEl.hidden = true;
    }
  }

  /**
   * Xử lý chuyển trang chủ đề.
   * @param {number} newPage Trang mới.
   * @returns {void}
   */
  function handleTopicPageChange(newPage) {
    topicCurrentPage = newPage;
    updateTopicPage();
    block.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  updateTopicPage();
  return block;
}

/**
 * Tạo hàng chủ đề nghiên cứu cho trang hồ sơ giảng viên:
 * Lược bỏ trường "Hướng dẫn: [Tên giảng viên]" (do đang ở trong hồ sơ của chính giảng viên đó),
 * giữ tên đề tài và nhãn nhóm nằm gọn gàng bên phải, không đặt thẻ tag bên dưới tên đề tài.
 * @param {object} entry Bản ghi chủ đề và nhóm nguồn.
 * @returns {HTMLElement} Phần tử hàng chủ đề đã được tối ưu.
 */
function createProfileTopicRow(entry) {
  const row = createTopicRow(entry, 3);
  const meta = row.querySelector(".topic-row__meta");
  meta?.remove();
  return row;
}

/**
 * Render thanh điều hướng phân trang cho danh sách chủ đề.
 * @param {HTMLElement} nav Container thanh phân trang.
 * @param {number} pageCount Tổng số trang.
 * @param {Function} onChange Callback khi chuyển trang.
 * @returns {void}
 */
function renderTopicPagination(nav, pageCount, onChange) {
  if (pageCount <= 1) {
    nav.hidden = true;
    nav.replaceChildren();
    return;
  }

  nav.hidden = false;
  const fragment = document.createDocumentFragment();

  // Nút "Trước"
  const prevBtn = createTopicPageBtn("Trước", topicCurrentPage - 1, topicCurrentPage === 1);
  fragment.append(prevBtn);

  // Các nút số trang
  for (let num = 1; num <= pageCount; num++) {
    fragment.append(createTopicPageBtn(String(num), num, false));
  }

  // Nút "Sau"
  const nextBtn = createTopicPageBtn("Sau", topicCurrentPage + 1, topicCurrentPage === pageCount);
  fragment.append(nextBtn);

  nav.replaceChildren(fragment);

  // Gắn sự kiện click
  nav.onclick = (e) => {
    const btn = e.target.closest("button[data-page]");
    if (!btn || btn.disabled) return;
    onChange(Number(btn.dataset.page));
  };

  function createTopicPageBtn(label, targetPage, disabled) {
    const btn = element("button", "profile-pagination__button", label);
    btn.type = "button";
    btn.dataset.page = String(targetPage);
    btn.disabled = disabled;
    if (/^\d+$/.test(label)) {
      btn.setAttribute("aria-label", "Trang " + targetPage);
      if (targetPage === topicCurrentPage) {
        btn.setAttribute("aria-current", "page");
      }
    }
    return btn;
  }
}

/**
 * Render khối số liệu chỉ số nghiên cứu (Citations, h-index, i10-index).
 * Giữ nguyên giá trị 0 có thật, không giả mạo số liệu khi thiếu.
 * @param {object[]} records Danh sách bản ghi chỉ số.
 * @returns {HTMLElement|null} Khối hiển thị chỉ số hoặc null nếu không có.
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
        const metric = element("div", "metric-card");
        metric.append(
          element("p", "metric-card__value", record[key]),
          element("p", "metric-card__label", label),
        );
        grid.append(metric);
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
