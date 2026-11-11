/** @file Danh bạ TV3 sử dụng JSON và giao diện chung TV1. */
import {
  loadResearch,
  loadLecturers,
  flattenTopics,
  normalizeEmail,
  searchText,
  lecturerUrl,
  element,
  avatar,
} from "./data.js";
let lecturers = [];
let topics = [];
let groups = [];
document.addEventListener("DOMContentLoaded", initLecturers);
/** Khởi tạo danh bạ. @returns {Promise<void>} */

async function initLecturers() {
  try {
    const [research, people] = await Promise.all([loadResearch(), loadLecturers()]);
    lecturers = people;
    topics = flattenTopics(research);
    groups = research.groups.map(getGroup);
    const select = document.getElementById("lecturer-group");
    for (const group of groups) {
      const option = element("option", "", group.name);
      option.value = group.id;
      select.append(option);
    }
    const form = document.getElementById("lecturer-filter");
    form.addEventListener("submit", preventSubmit);
    form.addEventListener("input", renderLecturers);
    form.addEventListener("change", renderLecturers);
    form.addEventListener("reset", resetSearch);
    renderLecturers();
  } catch {
    document.getElementById("lecturers-status").textContent =
      "Không thể tải danh bạ. Hãy tải lại trang để thử lại.";
  }
}
/** Metadata nhóm. @param {object} entry Nhóm nguồn. @returns {object} Nhóm. */

function getGroup(entry) {
  return entry.group;
}
/** Ngăn submit điều hướng. @param {SubmitEvent} event Submit. @returns {void} */

function preventSubmit(event) {
  event.preventDefault();
}
/** Chờ reset native trước render. @returns {void} */

function resetSearch() {
  requestAnimationFrame(renderLecturers);
}
/** Lấy chủ đề theo email. @param {object} lecturer Giảng viên. @returns {object[]} Các chủ đề. */

function relatedTopics(lecturer) {
  return topics.filter(
    matchesEmail,
  ); /** So email chuẩn hóa. @param {object} entry Chủ đề. @returns {boolean} Khớp. */
  function matchesEmail(entry) {
    return normalizeEmail(entry.topic.lecturer.email) === normalizeEmail(lecturer.email);
  }
}
/** Lọc và render danh bạ. @returns {void} */

function renderLecturers() {
  const query = searchText(document.getElementById("lecturer-search").value);
  const group = document.getElementById("lecturer-group").value;
  const matches = lecturers.filter(matchesFilter);
  document.getElementById("lecturers-list").replaceChildren(...matches.map(createLecturerCard));
  document.getElementById("lecturers-status").textContent = !lecturers.length
    ? "Chưa có dữ liệu giảng viên."
    : matches.length
      ? matches.length + " / " + lecturers.length + " giảng viên"
      : "Không có giảng viên phù hợp."; /** Lọc tên/email và nhóm liên quan. @param {object} lecturer Giảng viên. @returns {boolean} Khớp. */
  function matchesFilter(lecturer) {
    return (
      searchText(lecturer.name + " " + lecturer.email).includes(query) &&
      (!group || relatedTopics(lecturer).some(inGroup))
    );
  } /** Kiểm tra nhóm. @param {object} entry Chủ đề. @returns {boolean} Khớp nhóm. */
  function inGroup(entry) {
    return entry.group.id === group;
  }
}
/** Card theo bố cục TV3, dùng token TV1. @param {object} lecturer Giảng viên. @returns {HTMLElement} Card. */

function createLecturerCard(lecturer) {
  const card = element("article", "lecturer-card");
  const header = element("div", "lecturer-card__header");
  const meta = element("div", "lecturer-card__meta");
  const heading = element("h2", "lecturer-card__name", lecturer.name);
  const mail = element("a", "lecturer-card__email-link", lecturer.email);
  mail.href = "mailto:" + normalizeEmail(lecturer.email);
  meta.append(heading, mail);
  header.append(avatar(lecturer, "lecturer-card__avatar"), meta);
  const related = relatedTopics(lecturer);
  const ids = new Set(related.map(getGroupId));
  const tags = element("div", "lecturer-card__tags");
  for (const group of groups) {
    if (ids.has(group.id))
      tags.append(element("span", "lecturer-tag lecturer-tag--" + group.id, group.name));
  }
  const link = element("a", "btn btn--outline", "Xem hồ sơ");
  link.href = lecturerUrl(lecturer.email);
  link.setAttribute("aria-label", "Xem hồ sơ " + lecturer.name);
  card.append(
    header,
    tags,
    element("p", "lecturer-card__topic-count", related.length + " chủ đề"),
    link,
  );
  return card;
}
/** Mã nhóm từ context. @param {object} entry Chủ đề. @returns {string} ID nhóm. */

function getGroupId(entry) {
  return entry.group.id;
}
