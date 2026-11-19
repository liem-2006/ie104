/** @file Trang Khám phá Chủ đề: tìm kiếm, lọc OR theo nhóm, sắp xếp A–Z và phân trang 12 mục. */
import {
  loadResearch,
  flattenTopics,
  searchText,
  normalizeEmail,
  element,
  createTopicRow,
  createPaginationNav,
} from "./data.js";

const pageSize = 12;
const MAX_COLLAPSED_GROUPS = 6;
const state = {
  entries: [],
  groups: [],
  selected: new Set(),
  query: "",
  page: 1,
  groupsExpanded: false,
};
const status = document.getElementById("results-status");

document.addEventListener("DOMContentLoaded", initTopics);

/**
 * Khởi tạo trang khám phá sau khi DOM sẵn sàng: nạp JSON, khôi phục ?group=&q=&page= từ URL,
 * dựng bộ lọc và hiển thị danh sách (C8/UX-06: đồng bộ URL với trạng thái lọc/phân trang).
 * @returns {Promise<void>} Không trả về giá trị; cập nhật DOM theo trạng thái tải dữ liệu.
 */
async function initTopics() {
  try {
    const data = await loadResearch();
    // Trải phẳng toàn bộ chủ đề kèm thông tin nhóm để lọc và sắp xếp đồng nhất.
    state.entries = flattenTopics(data);
    state.groups = data.groups.map(getGroup);
    restoreUrlState();
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
 * @param {object} entry - Đối tượng nhóm nguồn trong dữ liệu nghiên cứu.
 * @returns {object} Đối tượng metadata chứa id và tên nhóm.
 */
function getGroup(entry) {
  return entry.group;
}

/**
 * C8 (UX-06): khôi phục trạng thái trang (nhóm, từ khóa, phân trang) từ chuỗi query
 * ?group=&q=&page= để reload/Back/Forward và link trực tiếp giữ đúng vị trí.
 * Chỉ áp dụng dữ liệu hợp lệ (mã nhóm tồn tại trong JSON, số trang >= 1) để tránh trạng thái giả.
 * @returns {void}
 */
function restoreUrlState() {
  const params = new URLSearchParams(location.search);

  // Nhóm: tham số dạng danh sách phân tách dấu phẩy (tuỳ chọn nhiều nhóm), chỉ nhận mã hợp lệ.
  const groupParam = params.get("group");
  if (groupParam) {
    for (const id of groupParam.split(",")) {
      const groupId = id.trim();
      if (groupId && state.groups.some((group) => group.id === groupId)) {
        state.selected.add(groupId);
      }
    }
  }

  // Từ khóa: khôi phục giá trị gốc vào ô tìm kiếm, state.query dùng bản chuẩn hóa không dấu.
  const queryParam = params.get("q");
  if (queryParam) {
    document.getElementById("topic-search").value = queryParam;
    state.query = searchText(queryParam);
  }

  // Chỉ nhận toàn bộ chuỗi số nguyên dương, không nhận tiền tố hoặc số thập phân.
  const pageValue = params.get("page") || "";
  const pageParam = /^[1-9]\d*$/.test(pageValue) ? Number(pageValue) : NaN;
  if (Number.isSafeInteger(pageParam) && pageParam >= 1) {
    state.page = pageParam; // renderTopics sẽ kẹp lại về khoảng hợp lệ sau khi lọc.
  }
}

/**
 * C8 (UX-06): ghi trạng thái lọc/phân trang hiện tại vào query ?group=&q=&page= bằng
 * history.replaceState (không tạo mục lịch sử mới). Gọi ở cuối renderTopics() để URL luôn
 * khớp giao diện; thay thế cơ chế xóa riêng lẻ trước đó (một cơ chế duy nhất, không rời rạc).
 * @returns {void}
 */
function syncUrl() {
  // Chỉ thay khóa thuộc bộ lọc; giữ tham số của tính năng khác.
  const params = new URLSearchParams(location.search);
  params.delete("group");
  params.delete("q");
  params.delete("page");

  // Nhóm: viết theo thứ tự dữ liệu nguồn để URL ổn định; bỏ qua khi không chọn nhóm nào.
  const selectedIds = state.groups
    .filter((group) => state.selected.has(group.id))
    .map((group) => group.id);
  if (selectedIds.length) params.set("group", selectedIds.join(","));

  // Chỉ ghi giá trị khác mặc định để URL ngắn gọn khi không có bộ lọc.
  const queryValue = document.getElementById("topic-search").value;
  if (queryValue) params.set("q", queryValue);
  if (state.page > 1) params.set("page", String(state.page));

  const search = params.toString() ? "?" + params.toString() : "";
  const target = location.pathname + search + location.hash;
  // Chỉ thay đổi khi URL thật sự khác hiện tại để tránh ghi thừa.
  if (target !== location.pathname + location.search + location.hash) {
    history.replaceState(history.state, "", target);
  }
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
 * Xác định tập nút nhóm cần hiển thị theo ngưỡng thu gọn và các nhóm đang được chọn.
 * @returns {{visible: Array<object>, hiddenCount: number}} Danh sách nhóm hiển thị và số nhóm còn ẩn.
 */
function getVisibleGroups() {
  if (state.groups.length <= MAX_COLLAPSED_GROUPS || state.groupsExpanded) {
    return { visible: state.groups, hiddenCount: 0 };
  }
  // Giữ 6 nhóm đầu và các nhóm đang được chọn ở vị trí thứ 7 trở đi khi danh sách thu gọn.
  const visible = state.groups.filter(
    (group, index) => index < MAX_COLLAPSED_GROUPS || state.selected.has(group.id),
  );
  return { visible, hiddenCount: state.groups.length - visible.length };
}

/**
 * Tạo nút mở rộng hoặc thu gọn danh sách nhóm khi số nhóm vượt quá ngưỡng hiển thị mặc định.
 * @param {number} hiddenCount - Số lượng nhóm hiện đang được ẩn.
 * @returns {HTMLButtonElement} Phần tử nút có thuộc tính aria-expanded.
 */
function createGroupsToggleButton(hiddenCount) {
  const label = state.groupsExpanded ? "Thu gọn nhóm" : "+" + hiddenCount + " nhóm khác";
  const button = element("button", "topics-groups__button topics-groups__more", label);
  button.type = "button";
  button.setAttribute("aria-expanded", String(state.groupsExpanded));
  return button;
}

/**
 * Dựng hàng nút lọc nhóm kèm số lượng chủ đề thật; tự động co gọn khi có nhiều nhóm.
 * @returns {void}
 */
function renderGroups() {
  const counts = countTopicsByGroup(state.entries);
  const { visible, hiddenCount } = getVisibleGroups();
  const fragment = document.createDocumentFragment();
  // Nút mặc định "Tất cả (N)" giúp xóa nhanh lựa chọn nhóm đang bật.
  fragment.append(createGroupButton("", "Tất cả (" + state.entries.length + ")"));
  for (const group of visible) {
    const count = counts.get(group.id) || 0;
    fragment.append(createGroupButton(group.id, group.name + " (" + count + ")"));
  }
  // Chỉ thêm nút mở rộng/thu gọn khi tổng nhóm vượt ngưỡng và còn nhóm ẩn hoặc đang mở rộng.
  if (state.groups.length > MAX_COLLAPSED_GROUPS && (state.groupsExpanded || hiddenCount > 0)) {
    fragment.append(createGroupsToggleButton(hiddenCount));
  }
  document.getElementById("group-pills").replaceChildren(fragment);
}

/**
 * Tạo một nút lọc nhóm với thuộc tính data-group dùng cho trạng thái chọn OR.
 * @param {string} id - Mã nhóm hoặc chuỗi rỗng cho nút Tất cả.
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
  document.getElementById("group-pills").addEventListener("click", handleGroupAction);
  document.getElementById("topic-pagination").addEventListener("click", changePage);
}

/**
 * Phân luồng sự kiện click trong vùng lọc nhóm: mở rộng/thu gọn danh sách hoặc chọn nhóm.
 * @param {MouseEvent} event - Sự kiện click trên vùng chứa nút nhóm.
 * @returns {void}
 */
function handleGroupAction(event) {
  if (event.target.closest(".topics-groups__more")) {
    toggleGroupsExpanded();
    return;
  }
  const button = event.target.closest("button[data-group]");
  if (button) toggleGroup(button);
}

/**
 * Đảo trạng thái mở rộng/thu gọn nhóm và giữ focus trên nút điều khiển tương ứng.
 * @returns {void}
 */
function toggleGroupsExpanded() {
  state.groupsExpanded = !state.groupsExpanded;
  renderGroups();
  renderFilterState();
  document.querySelector("#group-pills .topics-groups__more")?.focus({ preventScroll: true });
}

/**
 * Bật/tắt lựa chọn nhóm theo quy tắc OR và đưa phân trang về trang đầu.
 * @param {HTMLButtonElement} button - Nút nhóm vừa được bấm.
 * @returns {void}
 */
function toggleGroup(button) {
  const id = button.dataset.group;
  // Bấm "Tất cả" sẽ bỏ hết nhóm đang chọn; đồng bộ URL do syncUrl() ở cuối renderTopics().
  if (!id) {
    state.selected.clear();
  } else if (state.selected.has(id)) {
    state.selected.delete(id);
  } else {
    state.selected.add(id);
  }
  // C8 (UX-06): URL (group/q/page) được syncUrl() ở cuối renderTopics() làm sạch tự động —
  // không cần xóa riêng lẻ, tránh hai cơ chế query rời rạc.
  state.page = 1;
  // Khi đang thu gọn nhiều nhóm, dựng lại danh sách nút để ẩn/hiện đúng các nhóm ngoài top 6.
  if (state.groups.length > MAX_COLLAPSED_GROUPS && !state.groupsExpanded) {
    renderGroups();
    const targetId = id || "";
    const buttons = [...document.querySelectorAll("#group-pills button[data-group]")];
    const target = buttons.find((item) => item.dataset.group === targetId);
    const fallback = buttons.find((item) => item.dataset.group === "");
    (target || fallback)?.focus({ preventScroll: true });
  }
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
 * Khôi phục toàn bộ bộ lọc về mặc định, xóa query ?group= nếu có và trả focus về ô tìm kiếm.
 * @returns {void}
 */
function resetFilters() {
  state.query = "";
  state.page = 1;
  state.selected.clear();
  // C8 (UX-06): không cần xóa riêng ?group= — renderTopics() -> syncUrl() sẽ dọn toàn bộ query
  // khi trạng thái về mặc định (group rỗng, q rỗng, page 1).
  document.getElementById("topic-search").value = "";
  // Thu gọn lại các nhóm phụ vừa bỏ chọn khi danh sách vượt ngưỡng hiển thị mặc định.
  if (state.groups.length > MAX_COLLAPSED_GROUPS && !state.groupsExpanded) {
    renderGroups();
  }
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
  createPaginationNav(document.getElementById("topic-pagination"), state.page, pageCount, "topics-pagination__button");
  // C8 (UX-06): đồng bộ ?group=&q=&page= với trạng thái vừa render (một cơ chế duy nhất).
  syncUrl();
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
  for (const button of document.querySelectorAll("#group-pills button[data-group]")) {
    const id = button.dataset.group;
    button.setAttribute("aria-pressed", String(id ? state.selected.has(id) : !state.selected.size));
  }
  // Ẩn nút Xóa bộ lọc ở khối tìm kiếm khi bảng rỗng đang hiện vì bảng rỗng đã có nút riêng tại chỗ.
  const emptyVisible = !document.getElementById("topics-empty").hidden;
  document.getElementById("reset-filters").hidden =
    emptyVisible || !hasCustomFilter();
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
