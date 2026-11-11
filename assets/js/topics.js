/** @file Khám phá chủ đề: giao diện TV1, nguồn JSON dùng chung. */
import { loadResearch, flattenTopics, searchText, topicUrl, lecturerUrl, element } from "./data.js";
const state = { entries: [], groups: [], selected: new Set(), query: "", sort: "source" };
const status = document.getElementById("results-status");
document.addEventListener("DOMContentLoaded", initTopics);
/** Khởi tạo dữ liệu và sự kiện. @returns {Promise<void>} */

async function initTopics() {
  try {
    const data = await loadResearch();
    state.entries = flattenTopics(data);
    state.groups = data.groups.map(getGroup);
    renderGroups();
    renderStats();
    bindFilters();
    renderTopics();
  } catch {
    status.textContent = "Không thể tải dữ liệu chủ đề. Hãy tải lại trang để thử lại.";
  }
}
/** Lấy metadata nhóm. @param {object} entry Nhóm nguồn. @returns {object} Metadata. */

function getGroup(entry) {
  return entry.group;
}
/** Tạo pills và checkbox từ các nhóm thực tế. @returns {void} */

function renderGroups() {
  const nav = document.getElementById("group-pills");
  const options = document.getElementById("group-options");
  nav.replaceChildren();
  options.replaceChildren();
  const all = element("button", "topics-domain-nav__pill", "Tất cả");
  all.type = "button";
  all.dataset.group = "";
  all.addEventListener("click", selectAll);
  nav.append(all);
  for (const group of state.groups) {
    const button = element("button", "topics-domain-nav__pill", group.name);
    button.type = "button";
    button.dataset.group = group.id;
    button.addEventListener("click", toggleGroup);
    nav.append(button);
    const label = element("label");
    const input = element("input");
    input.type = "checkbox";
    input.name = "group";
    input.value = group.id;
    label.append(input, document.createTextNode(group.name));
    options.append(label);
  }
}
/** Chọn tất cả. @returns {void} */

function selectAll() {
  state.selected.clear();
  renderTopics();
}
/** Bật/tắt một nhóm trong cùng trạng thái. @param {MouseEvent} event Click pill. @returns {void} */

function toggleGroup(event) {
  const id = event.currentTarget.dataset.group;
  state.selected.has(id) ? state.selected.delete(id) : state.selected.add(id);
  renderTopics();
}
/** Hiển thị thống kê thực, không có lượt xem hay ngày giả. @returns {void} */

function renderStats() {
  const stats = document.getElementById("data-stats");
  const lecturers = new Set(state.entries.map(getEmail));
  for (const [label, count] of [
    ["Nhóm chủ đề", state.groups.length],
    ["Chủ đề", state.entries.length],
    ["Giảng viên", lecturers.size],
  ]) {
    const row = element("div", "overview-stats__row");
    row.append(
      element("dt", "overview-stats__term", label),
      element("dd", "overview-stats__value", count),
    );
    stats.append(row);
  }
}
/** Lấy email thống kê. @param {object} entry Chủ đề. @returns {string} Email. */

function getEmail(entry) {
  return entry.topic.lecturer.email.trim().toLowerCase();
}
/** Gắn sự kiện bộ lọc và dialog native. @returns {void} */

function bindFilters() {
  document.getElementById("topic-search").addEventListener("input", updateSearch);
  document.getElementById("topic-sort").addEventListener("change", updateSort);
  document.getElementById("reset-filters").addEventListener("click", resetFilters);
  document.getElementById("open-groups").addEventListener("click", openGroups);
  document.getElementById("groups-dialog").addEventListener("close", applyGroups);
}
/** Tìm kiếm khi gõ. @param {InputEvent} event Input. @returns {void} */

function updateSearch(event) {
  state.query = searchText(event.target.value);
  renderTopics();
}
/** Đổi thứ tự. @param {Event} event Select. @returns {void} */

function updateSort(event) {
  state.sort = event.target.value;
  renderTopics();
}
/** Xóa đồng thời tất cả bộ lọc. @returns {void} */

function resetFilters() {
  state.query = "";
  state.sort = "source";
  state.selected.clear();
  document.getElementById("topic-search").value = "";
  document.getElementById("topic-sort").value = "source";
  renderTopics();
}
/** Mở dialog với bản nháp checkbox. @returns {void} */

function openGroups() {
  for (const input of document.querySelectorAll("#group-options input"))
    input.checked = state.selected.has(input.value);
  const dialog = document.getElementById("groups-dialog");
  dialog.returnValue = "cancel";
  dialog.showModal();
}
/** Áp dụng nếu người dùng xác nhận; Escape/Hủy không sửa bộ lọc. @returns {void} */

function applyGroups() {
  const dialog = document.getElementById("groups-dialog");
  if (dialog.returnValue === "apply") {
    state.selected = new Set(Array.from(dialog.querySelectorAll("input:checked"), getValue));
    renderTopics();
  }
  document.getElementById("open-groups").focus();
}
/** Lấy giá trị input. @param {HTMLInputElement} input Checkbox. @returns {string} Mã nhóm. */

function getValue(input) {
  return input.value;
}
/** Lọc theo OR nhóm và AND từ khóa. @param {object} entry Chủ đề. @returns {boolean} Có hiển thị. */

function matchesFilters(entry) {
  return (
    (!state.selected.size || state.selected.has(entry.group.id)) &&
    searchText(entry.topic.name + " " + entry.topic.lecturer.name).includes(state.query)
  );
}
/** So sánh tên tiếng Việt. @param {object} a Chủ đề A. @param {object} b Chủ đề B. @returns {number} Thứ tự. */

function compareTitles(a, b) {
  return a.topic.name.localeCompare(b.topic.name, "vi");
}
/** Render kết quả và trạng thái bộ lọc. @returns {void} */

function renderTopics() {
  const list = document.getElementById("topics-list");
  const entries = state.entries.filter(matchesFilters);
  if (state.sort === "title") entries.sort(compareTitles);
  list.replaceChildren(...entries.map(createTopicRow));
  status.textContent = !state.entries.length
    ? "Chưa có dữ liệu chủ đề."
    : entries.length
      ? entries.length + " / " + state.entries.length + " chủ đề"
      : "Không có kết quả phù hợp. Hãy thử xóa bộ lọc.";
  for (const pill of document.querySelectorAll("#group-pills button")) {
    const id = pill.dataset.group;
    pill.setAttribute("aria-pressed", String(id ? state.selected.has(id) : !state.selected.size));
  }
}
/** Tạo hàng chủ đề theo thiết kế TV1.
 * @param {{group: object, topic: object}} entry Chủ đề và metadata nhóm.
 * @returns {HTMLElement} Hàng chủ đề có link roadmap và hồ sơ giảng viên.
 */

function createTopicRow(entry) {
  const { group, topic } = entry;
  const row = element("article", "topic-row");
  const badge = element("span", "badge", group.name);
  const heading = element("h2", "topic-row__title");
  const link = element("a", "", topic.name);
  link.href = topicUrl(group, topic);
  heading.append(link);
  const meta = element("p", "topic-row__meta");
  meta.append(document.createTextNode("Hướng dẫn: "));
  const lecturer = element("a", "", topic.lecturer.name);
  lecturer.href = lecturerUrl(topic.lecturer.email);
  meta.append(lecturer);
  const action = element("a", "btn btn--outline topic-row__action", "Xem kiến thức nền →");
  action.href = link.href;
  action.setAttribute("aria-label", "Xem kiến thức nền: " + topic.name);
  row.append(badge, heading, meta, action);
  return row;
}
