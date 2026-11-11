/** @file Hồ sơ theo email; các phần tùy chọn chỉ dựng khi có dữ liệu. */
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
} from "./data.js";
document.addEventListener("DOMContentLoaded", initProfile);
/** Nạp hồ sơ đúng email và giải phóng trạng thái tải trong cả nhánh lỗi.
 * @returns {Promise<void>}
 */
async function initProfile() {
  const main = document.getElementById("main-content");
  try {
    const [research, lecturers] = await Promise.all([loadResearch(), loadLecturers()]);
    const email = normalizeEmail(new URLSearchParams(location.search).get("email"));
    const lecturer = lecturers.find(matchesEmail);
    if (!email || !lecturer) {
      renderPageMessage(
        main,
        "Không tìm thấy giảng viên",
        "Email trên đường dẫn không có trong danh bạ.",
        "../index.html",
      );
      return;
    }
    renderProfile(lecturer, flattenTopics(research).filter(matchesTopic));
    /** Đối chiếu khóa người trong danh bạ. @param {object} person Giảng viên. @returns {boolean} Khớp email. */
    function matchesEmail(person) {
      return normalizeEmail(person.email) === email;
    }
    /** Đối chiếu người hướng dẫn trong chủ đề. @param {object} entry Chủ đề. @returns {boolean} Khớp email. */
    function matchesTopic(entry) {
      return normalizeEmail(entry.topic.lecturer.email) === email;
    }
  } catch {
    renderPageMessage(
      main,
      "Không thể tải hồ sơ",
      "Hãy tải lại trang để thử lại.",
      "../index.html",
    );
  } finally {
    main.removeAttribute("aria-busy");
    document.getElementById("profile-load-status")?.remove();
  }
}
/** Tạo section có heading cấp 2. @param {string} title Tiêu đề. @returns {HTMLElement} Section rỗng. */
function section(title) {
  const block = element("section", "profile-section");
  block.append(element("h2", "profile-section__title", title));
  return block;
}
/** Ghép các thành phần hồ sơ, giữ thứ tự và không tạo khối số liệu giả.
 * @param {object} lecturer Giảng viên đã tìm thấy.
 * @param {object[]} related Các chủ đề của giảng viên.
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
  card.append(createRelatedTopics(related));
  document.getElementById("profile-content").replaceChildren(card);
}
/** Tạo phần đầu với một h1, avatar, đơn vị nếu có và email.
 * @param {object} lecturer Dữ liệu người hướng dẫn.
 * @param {HTMLHeadingElement} title Heading chính đang có trong trang.
 * @returns {HTMLElement} Phần đầu hồ sơ.
 */
function createProfileHeader(lecturer, title) {
  const header = element("header", "profile-header");
  const info = element("div", "profile-header__info");
  info.append(title);
  if (lecturer.profile?.affiliation)
    info.append(element("p", "profile-header__affiliation", lecturer.profile.affiliation));
  const mail = element("a", "profile-header__email", lecturer.email);
  mail.href = "mailto:" + normalizeEmail(lecturer.email);
  info.append(mail);
  header.append(avatar(lecturer, "profile-header__avatar"), info);
  return header;
}
/** Dựng giới thiệu và nguồn; khi thiếu chỉ dùng một ghi chú ngắn.
 * @param {object} lecturer Giảng viên và profile tùy chọn.
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
    for (const area of lecturer.profile.researchAreas) list.append(element("li", "", area));
    block.append(list);
  }
  const source = externalLink("Nguồn thông tin", lecturer.profile?.sourceUrl);
  if (source) {
    const note = element("p", "profile-source-note");
    note.append(source);
    if (lecturer.profile.checkedAt) note.append(" · Ngày ghi nhận: " + lecturer.profile.checkedAt);
    block.append(note);
  }
  return block;
}
/** Chỉ dựng section liên kết khi có ít nhất một URL an toàn.
 * @param {object[]} profiles Các hồ sơ nghiên cứu nguồn.
 * @returns {HTMLElement|null} Section liên kết hoặc null khi không có.
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
/** Dựng chủ đề liên quan bằng cùng component hàng của trang khám phá.
 * @param {object[]} related Chủ đề kèm metadata nhóm.
 * @returns {HTMLElement} Section danh sách và nhóm thực tế.
 */
function createRelatedTopics(related) {
  const block = section("Chủ đề nghiên cứu");
  const tags = element("div", "profile-tags");
  const seen = new Set();
  for (const entry of related) {
    if (!seen.has(entry.group.id)) {
      tags.append(
        element("span", "lecturer-tag lecturer-tag--" + entry.group.id, entry.group.name),
      );
      seen.add(entry.group.id);
    }
  }
  if (tags.children.length) block.append(tags);
  if (!related.length) {
    block.append(element("p", "", "Chưa có chủ đề trong bộ dữ liệu hiện tại."));
    return block;
  }
  const list = element("ul", "related-topics-list");
  for (const entry of related) {
    const item = element("li", "related-topic-item");
    item.append(createTopicRow(entry, 3));
    list.append(item);
  }
  block.append(list);
  return block;
}
/** Render chỉ số có nguồn/ngày; không biến dữ liệu thiếu thành 0. @param {object[]} records Bản ghi chỉ số. @returns {HTMLElement|null} Khối số liệu. */

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
