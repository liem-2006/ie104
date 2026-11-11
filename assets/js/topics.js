/** @file Khám phá: tìm/lọc/sắp xếp toàn bộ dữ liệu trước khi chia trang. */
import {
  loadResearch,
  flattenTopics,
  searchText,
  normalizeEmail,
  element,
  createTopicRow,
} from "./data.js";
const pageSize = 12;
const state = { entries: [], groups: [], selected: new Set(), query: "", sort: "source", page: 1 };
const status = document.getElementById("results-status");
document.addEventListener("DOMContentLoaded", initTopics);
/** Nạp dữ liệu và gắn sự kiện sau khi DOM sẵn sàng. @returns {Promise<void>} */
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
    document.getElementById("data-stats").textContent = "Chưa tải được thống kê.";
  }
}
/** Lấy metadata nhóm. @param {object} entry Nhóm nguồn. @returns {object} Metadata nhóm. */
function getGroup(entry) {
  return entry.group;
}
/** Tạo nút chọn nhóm; không có lựa chọn nghĩa là tất cả. @returns {void} */
function renderGroups() {
  const fragment = document.createDocumentFragment();
  fragment.append(createGroupButton("", "Tất cả"));
  for (const group of state.groups) fragment.append(createGroupButton(group.id, group.name));
  document.getElementById("group-pills").replaceChildren(fragment);
}
/** Tạo nút lọc với trạng thái truy cập độc lập.
 * @param {string} id Mã nhóm, rỗng là tất cả.
 * @param {string} name Tên nút.
 * @returns {HTMLButtonElement} Nút chọn nhóm.
 */
function createGroupButton(id, name) {
  const button = element("button", "topics-groups__button", name);
  button.type = "button";
  button.dataset.group = id;
  return button;
}
/** Tóm tắt số liệu thật của JSON. @returns {void} */
function renderStats() {
  const lecturers = new Set(state.entries.map(getEmail));
  document.getElementById("data-stats").textContent =
    state.groups.length +
    " nhóm · " +
    state.entries.length +
    " chủ đề · " +
    lecturers.size +
    " giảng viên";
}
/** Chuẩn hóa khóa email khi đếm người hướng dẫn. @param {object} entry Chủ đề. @returns {string} Email. */
function getEmail(entry) {
  return normalizeEmail(entry.topic.lecturer.email);
}
/** Gắn mỗi sự kiện một lần, dùng delegation cho nút sinh từ dữ liệu. @returns {void} */
function bindFilters() {
  document.getElementById("topic-search").addEventListener("input", updateSearch);
  document.getElementById("topic-sort").addEventListener("change", updateSort);
  document.getElementById("reset-filters").addEventListener("click", resetFilters);
  document.getElementById("group-pills").addEventListener("click", toggleGroup);
  document.getElementById("topic-pagination").addEventListener("click", changePage);
}
/** Áp dụng OR giữa các nhóm; mỗi thay đổi đưa về trang đầu.
 * @param {MouseEvent} event Click nút nhóm.
 * @returns {void}
 */
function toggleGroup(event) {
  const button = event.target.closest("button[data-group]");
  if (!button) return;
  const id = button.dataset.group;
  if (!id) state.selected.clear();
  else if (state.selected.has(id)) state.selected.delete(id);
  else state.selected.add(id);
  state.page = 1;
  renderTopics();
}
/** Tìm tên đề tài hoặc giảng viên không phân biệt dấu/hoa thường.
 * @param {InputEvent} event Thay đổi ô tìm kiếm.
 * @returns {void}
 */
function updateSearch(event) {
  state.query = searchText(event.target.value);
  state.page = 1;
  renderTopics();
}
/** Đổi thứ tự toàn bộ kết quả rồi quay về trang đầu.
 * @param {Event} event Thay đổi select.
 * @returns {void}
 */
function updateSort(event) {
  state.sort = event.target.value;
  state.page = 1;
  renderTopics();
}
/** Trả tìm kiếm, nhóm, thứ tự và trang về mặc định. @returns {void} */
function resetFilters() {
  state.query = "";
  state.sort = "source";
  state.page = 1;
  state.selected.clear();
  document.getElementById("topic-search").value = "";
  document.getElementById("topic-sort").value = "source";
  // Nút reset sẽ ẩn sau render; trả focus về một điều khiển còn hiển thị.
  document.getElementById("topic-search").focus({ preventScroll: true });
  renderTopics();
}
/** Kiểm tra AND giữa truy vấn và tập nhóm được chọn.
 * @param {object} entry Chủ đề kèm nhóm.
 * @returns {boolean} Chủ đề có thỏa bộ lọc hay không.
 */
function matchesFilters(entry) {
  return (
    (!state.selected.size || state.selected.has(entry.group.id)) &&
    searchText(entry.topic.name + " " + entry.topic.lecturer.name).includes(state.query)
  );
}
/** So sánh tên theo tiếng Việt. @param {object} first Chủ đề A. @param {object} second Chủ đề B. @returns {number} Thứ tự A so với B. */
function compareTitles(first, second) {
  return first.topic.name.localeCompare(second.topic.name, "vi");
}
/** Lọc và sắp xếp trước khi lấy dữ liệu của một trang. @returns {object[]} Toàn bộ kết quả đã sắp xếp. */
function getFilteredTopics() {
  const entries = state.entries.filter(matchesFilters);
  if (state.sort === "title") entries.sort(compareTitles);
  return entries;
}
/** Điều phối danh sách, trạng thái lọc và thanh phân trang. @returns {void} */
function renderTopics() {
  const entries = getFilteredTopics();
  const pageCount = Math.ceil(entries.length / pageSize);
  state.page = Math.max(1, Math.min(state.page, pageCount || 1));
  const start = (state.page - 1) * pageSize;
  const fragment = document.createDocumentFragment();
  for (const entry of entries.slice(start, start + pageSize))
    fragment.append(createTopicRow(entry));
  document.getElementById("topics-list").replaceChildren(fragment);
  status.textContent = !state.entries.length
    ? "Chưa có dữ liệu chủ đề."
    : !entries.length
      ? "Không có kết quả phù hợp. Hãy thử xóa bộ lọc."
      : start +
        1 +
        "–" +
        Math.min(start + pageSize, entries.length) +
        " trong " +
        entries.length +
        " chủ đề";
  renderFilterState();
  renderPagination(pageCount);
}
/** Đồng bộ nút nhóm và chỉ hiện reset khi có lựa chọn khác mặc định. @returns {void} */
function renderFilterState() {
  for (const button of document.querySelectorAll("#group-pills button")) {
    const id = button.dataset.group;
    button.setAttribute("aria-pressed", String(id ? state.selected.has(id) : !state.selected.size));
  }
  document.getElementById("reset-filters").hidden =
    !state.query && !state.selected.size && state.sort === "source";
}
/** Tạo bộ điều hướng chỉ khi kết quả có nhiều hơn một trang.
 * @param {number} pageCount Số trang của tập kết quả đã lọc.
 * @returns {void}
 */
function renderPagination(pageCount) {
  const nav = document.getElementById("topic-pagination");
  nav.hidden = pageCount <= 1;
  const fragment = document.createDocumentFragment();
  if (pageCount > 1) {
    fragment.append(createPageButton("Trước", state.page - 1, state.page === 1));
    for (let number = 1; number <= pageCount; number++)
      fragment.append(createPageButton(String(number), number, false));
    fragment.append(createPageButton("Sau", state.page + 1, state.page === pageCount));
  }
  nav.replaceChildren(fragment);
}
/** Tạo nút trang, giữ cả nhãn hiển thị và trạng thái trang hiện tại.
 * @param {string} label Nhãn nút.
 * @param {number} number Trang cần chuyển tới.
 * @param {boolean} disabled Nút đã ở đầu/cuối danh sách.
 * @returns {HTMLButtonElement} Nút phân trang.
 */
function createPageButton(label, number, disabled) {
  const button = element("button", "topics-pagination__button", label);
  button.type = "button";
  button.dataset.page = String(number);
  button.disabled = disabled;
  if (/^\d+$/.test(label)) {
    button.setAttribute("aria-label", "Trang " + number);
    if (number === state.page) button.setAttribute("aria-current", "page");
  }
  return button;
}
/** Đổi trang và đưa người dùng tới đầu kết quả bằng cả focus và cuộn.
 * @param {MouseEvent} event Click nút phân trang (bao gồm kích hoạt bằng bàn phím).
 * @returns {void}
 */
function changePage(event) {
  const button = event.target.closest("button[data-page]");
  if (!button || button.disabled) return;
  state.page = Number(button.dataset.page);
  renderTopics();
  const heading = document.getElementById("results-heading");
  heading.focus({ preventScroll: true });
  heading.scrollIntoView({ block: "start" });
}
