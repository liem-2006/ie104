/** @file Trang Khám phá Chủ đề: tìm kiếm, lọc OR theo nhóm, sắp xếp A–Z và phân trang 12 mục. */
import {
  loadResearch,
  flattenTopics,
  searchText,
  normalizeEmail,
  element,
  createTopicRow,
} from "./data.js";

const pageSize = 12;
const state = { entries: [], groups: [], selected: new Set(), query: "", page: 1 };
const status = document.getElementById("results-status");

document.addEventListener("DOMContentLoaded", initTopics);

/**
 * Khởi tạo trang khám phá sau khi DOM sẵn sàng: nạp JSON, dựng bộ lọc và hiển thị danh sách đầu tiên.
 * @returns {Promise<void>} Không trả về giá trị; cập nhật DOM theo trạng thái tải dữ liệu.
 */
async function initTopics() {
  try {
    const data = await loadResearch();
    // Trải phẳng toàn bộ 37 chủ đề kèm thông tin nhóm để lọc và sắp xếp đồng nhất.
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

/**
 * Trích xuất metadata của một nhóm nghiên cứu từ bản ghi JSON nguồn.
 * @param {object} entry - Đối tượng nhóm nguồn trong research-data.json.
 * @returns {object} Đối tượng metadata chứa id và tên nhóm.
 */
function getGroup(entry) {
  return entry.group;
}

/**
 * Đếm số lượng chủ đề thực tế của từng nhóm từ danh sách chủ đề đã nạp.
 * @param {Array<object>} entries - Danh sách bản ghi chủ đề kèm nhóm nguồn.
 * @returns {Map<string, number>} Bản đồ ánh xạ mã nhóm tới số lượng chủ đề thật.
 */
function countTopicsByGroup(entries) {
  const counts = new Map();
  // Cộng dồn theo group.id để luôn phản ánh đúng dữ liệu thật từ JSON.
  for (const entry of entries) {
    const groupId = entry.group.id;
    counts.set(groupId, (counts.get(groupId) || 0) + 1);
  }
  return counts;
}

/**
 * Dựng hàng nút lọc nhóm kèm số lượng chủ đề thật; không chọn nhóm nào nghĩa là xem tất cả.
 * @returns {void}
 */
function renderGroups() {
  const counts = countTopicsByGroup(state.entries);
  const fragment = document.createDocumentFragment();
  // Nút mặc định "Tất cả (N)" giúp xóa nhanh lựa chọn nhóm đang bật.
  fragment.append(createGroupButton("", "Tất cả (" + state.entries.length + ")"));
  for (const group of state.groups) {
    const count = counts.get(group.id) || 0;
    fragment.append(createGroupButton(group.id, group.name + " (" + count + ")"));
  }
  document.getElementById("group-pills").replaceChildren(fragment);
}

/**
 * Tạo một nút lọc nhóm với thuộc tính data-group dùng cho trạng thái chọn OR.
 * @param {string} id - Mã nhóm (sec/data/nlp) hoặc chuỗi rỗng cho nút Tất cả.
 * @param {string} name - Nhãn hiển thị trên nút kèm số lượng chủ đề.
 * @returns {HTMLButtonElement} Phần tử button đã cấu hình sẵn.
 */
function createGroupButton(id, name) {
  const button = element("button", "topics-groups__button", name);
  button.type = "button";
  button.dataset.group = id;
  return button;
}

/**
 * Hiển thị dòng thống kê tổng quan thật từ dữ liệu JSON (số nhóm, chủ đề, giảng viên duy nhất).
 * @returns {void}
 */
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

/**
 * Lấy email đã chuẩn hóa của giảng viên hướng dẫn để đếm không trùng lặp.
 * @param {object} entry - Bản ghi chủ đề kèm nhóm nguồn.
 * @returns {string} Email đã chuẩn hóa chữ thường và alias.
 */
function getEmail(entry) {
  return normalizeEmail(entry.topic.lecturer.email);
}

/**
 * Gắn toàn bộ sự kiện điều khiển một lần bằng event delegation cho nhóm và phân trang.
 * @returns {void}
 */
function bindFilters() {
  document.getElementById("topic-search").addEventListener("input", updateSearch);
  document.getElementById("reset-filters").addEventListener("click", resetFilters);
  // Nút trong bảng rỗng dùng chung luồng reset để giữ nhất quán thao tác và focus.
  document
    .getElementById("topics-empty")
    .querySelector("[data-empty-reset]")
    .addEventListener("click", resetFilters);
  document.getElementById("group-pills").addEventListener("click", toggleGroup);
  document.getElementById("topic-pagination").addEventListener("click", changePage);
}

/**
 * Bật/tắt lựa chọn nhóm theo quy tắc OR và đưa phân trang về trang đầu.
 * @param {MouseEvent} event - Sự kiện click trên vùng chứa nút nhóm.
 * @returns {void}
 */
function toggleGroup(event) {
  const button = event.target.closest("button[data-group]");
  if (!button) return;
  const id = button.dataset.group;
  // Bấm "Tất cả" sẽ bỏ hết nhóm đang chọn; bấm từng nhóm sẽ bật/tắt độc lập (OR).
  if (!id) state.selected.clear();
  else if (state.selected.has(id)) state.selected.delete(id);
  else state.selected.add(id);
  state.page = 1;
  renderTopics();
}

/**
 * Cập nhật từ khóa tìm kiếm đã chuẩn hóa không dấu và quay về trang đầu.
 * @param {InputEvent} event - Sự kiện nhập liệu tại ô tìm kiếm.
 * @returns {void}
 */
function updateSearch(event) {
  state.query = searchText(event.target.value);
  state.page = 1;
  renderTopics();
}

/**
 * Khôi phục toàn bộ bộ lọc về mặc định và trả focus về ô tìm kiếm đang hiển thị.
 * @returns {void}
 */
function resetFilters() {
  state.query = "";
  state.page = 1;
  state.selected.clear();
  document.getElementById("topic-search").value = "";
  // Nút Xóa bộ lọc sẽ ẩn sau renderTopics(); trả focus về ô tìm kiếm để không mất vị trí bàn phím.
  document.getElementById("topic-search").focus({ preventScroll: true });
  renderTopics();
}

/**
 * Kiểm tra chủ đề có thỏa bộ lọc AND giữa truy vấn tìm kiếm và tập nhóm đã chọn (OR) hay không.
 * @param {object} entry - Bản ghi chủ đề kèm nhóm nguồn.
 * @returns {boolean} True nếu chủ đề khớp cả nhóm lẫn từ khóa tìm kiếm.
 */
function matchesFilters(entry) {
  // Chỉ ghép tên đề tài và tên giảng viên để bảo toàn phạm vi tìm kiếm đã quy định.
  return (
    (!state.selected.size || state.selected.has(entry.group.id)) &&
    searchText(entry.topic.name + " " + entry.topic.lecturer.name).includes(state.query)
  );
}

/**
 * So sánh tên hai chủ đề theo bảng chữ cái tiếng Việt (A–Z).
 * @param {object} first - Bản ghi chủ đề thứ nhất.
 * @param {object} second - Bản ghi chủ đề thứ hai.
 * @returns {number} Giá trị âm/dương/0 theo thứ tự localeCompare("vi").
 */
function compareTitles(first, second) {
  return first.topic.name.localeCompare(second.topic.name, "vi");
}

/**
 * Lọc toàn bộ dữ liệu trước rồi mới sắp xếp A–Z để phân trang luôn nhất quán trên toàn tập.
 * @returns {Array<object>} Mảng chủ đề khớp bộ lọc đã sắp xếp theo tên.
 */
function getFilteredTopics() {
  const entries = state.entries.filter(matchesFilters);
  entries.sort(compareTitles);
  return entries;
}

/**
 * Điều phối render danh sách chủ đề của trang hiện tại, trạng thái kết quả, nút lọc và phân trang.
 * @returns {void}
 */
function renderTopics() {
  const entries = getFilteredTopics();
  const pageCount = Math.ceil(entries.length / pageSize);
  // Giới hạn state.page trong khoảng hợp lệ sau khi tập kết quả thay đổi.
  state.page = Math.max(1, Math.min(state.page, pageCount || 1));
  const start = (state.page - 1) * pageSize;
  const fragment = document.createDocumentFragment();
  for (const entry of entries.slice(start, start + pageSize))
    fragment.append(createTopicRow(entry));
  document.getElementById("topics-list").replaceChildren(fragment);
  status.textContent = buildStatus(entries.length, start);
  renderEmptyState(entries.length);
  renderFilterState();
  renderPagination(pageCount);
}

/**
 * Tạo chuỗi thông báo số lượng kết quả đang hiển thị theo định dạng chuẩn.
 * @param {number} total - Tổng số chủ đề khớp bộ lọc.
 * @param {number} start - Chỉ số bắt đầu (0-based) của trang hiện tại.
 * @returns {string} Thông báo trạng thái dành cho #results-status.
 */
function buildStatus(total, start) {
  if (!state.entries.length) return "Chưa có dữ liệu chủ đề.";
  if (!total) return "Không có kết quả phù hợp. Hãy thử xóa bộ lọc.";
  return (
    start +
    1 +
    "–" +
    Math.min(start + pageSize, total) +
    " trong " +
    total +
    " chủ đề"
  );
}

/**
 * Bật/tắt khung thông báo rỗng khi có dữ liệu gốc nhưng không chủ đề nào khớp bộ lọc.
 * @param {number} total - Số chủ đề khớp bộ lọc hiện tại.
 * @returns {void}
 */
function renderEmptyState(total) {
  // Chỉ coi là "không khớp bộ lọc" khi dữ liệu gốc đã tải thành công.
  const isEmpty = !total && state.entries.length > 0;
  document.getElementById("topics-empty").hidden = !isEmpty;
}

/**
 * Kiểm tra người dùng có đang nhập từ khóa hoặc chọn ít nhất một nhóm lọc hay không.
 * @returns {boolean} True nếu bộ lọc đang khác trạng thái mặc định.
 */
function hasCustomFilter() {
  return Boolean(state.query) || state.selected.size > 0;
}

/**
 * Đồng bộ thuộc tính aria-pressed trên các nút nhóm và ẩn/hiện nút Xóa bộ lọc hợp lý.
 * @returns {void}
 */
function renderFilterState() {
  for (const button of document.querySelectorAll("#group-pills button")) {
    const id = button.dataset.group;
    button.setAttribute("aria-pressed", String(id ? state.selected.has(id) : !state.selected.size));
  }
  // Ẩn nút Xóa bộ lọc ở khối tìm kiếm khi bảng rỗng đang hiện vì bảng rỗng đã có nút riêng tại chỗ.
  const emptyVisible = !document.getElementById("topics-empty").hidden;
  document.getElementById("reset-filters").hidden =
    emptyVisible || !hasCustomFilter();
}

/**
 * Tạo thanh phân trang và tự động ẩn khi tổng kết quả tối đa một trang (<= 12 chủ đề).
 * @param {number} pageCount - Tổng số trang của tập kết quả hiện tại.
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

/**
 * Tạo một nút điều hướng phân trang kèm nhãn truy cập và đánh dấu trang hiện tại.
 * @param {string} label - Văn bản hiển thị trên nút ("Trước", số trang, hoặc "Sau").
 * @param {number} number - Số trang mục tiêu khi kích hoạt nút.
 * @param {boolean} disabled - Trạng thái vô hiệu hóa khi đang ở trang đầu hoặc cuối.
 * @returns {HTMLButtonElement} Phần tử nút phân trang hoàn chỉnh.
 */
function createPageButton(label, number, disabled) {
  const button = element("button", "topics-pagination__button", label);
  button.type = "button";
  button.dataset.page = String(number);
  button.disabled = disabled;
  // Gắn aria-label tường minh cho các nút số trang và aria-current cho trang đang mở.
  if (/^\d+$/.test(label)) {
    button.setAttribute("aria-label", "Trang " + number);
    if (number === state.page) button.setAttribute("aria-current", "page");
  }
  return button;
}

/**
 * Chuyển sang trang mới khi bấm nút phân trang, sau đó đưa focus và cuộn về tiêu đề kết quả.
 * @param {MouseEvent} event - Sự kiện click trên thanh phân trang (hỗ trợ cả bàn phím).
 * @returns {void}
 */
function changePage(event) {
  const button = event.target.closest("button[data-page]");
  if (!button || button.disabled) return;
  state.page = Number(button.dataset.page);
  renderTopics();
  // Đưa focus tới #results-heading để người dùng bàn phím/screen reader tiếp tục từ đầu danh sách mới.
  const heading = document.getElementById("results-heading");
  heading.focus({ preventScroll: true });
  heading.scrollIntoView({ block: "start" });
}
