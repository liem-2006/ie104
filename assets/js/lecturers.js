/**
 * @file Quản lý hiển thị danh bạ giảng viên (TV2 Chặng 2B).
 * Hỗ trợ tìm kiếm không dấu theo tên/email, lọc theo nhóm chủ đề,
 * sắp xếp A–Z theo tên riêng tiếng Việt, trạng thái rỗng và phân trang 9 thẻ/trang.
 */

import {
  loadResearch,
  loadLecturers,
  flattenTopics,
  normalizeEmail,
  searchText,
  lecturerUrl,
  element,
  avatar,
  createPaginationNav,
  createGroupTags,
} from "./data.js";

/** Số lượng giảng viên tối đa trên 1 trang (3 hàng x 3 cột trên desktop). */
const PAGE_SIZE = 9;

let lecturers = [];
let topics = [];
let groups = [];
let currentPage = 1;

document.addEventListener("DOMContentLoaded", initLecturers);

/**
 * Khởi tạo dữ liệu, sắp xếp A–Z, áp dụng nhóm từ URL (nếu có) và gắn sự kiện trang danh bạ.
 * @returns {Promise<void>} Promise hoàn tất khởi tạo trang.
 */
async function initLecturers() {
  try {
    const [research, people] = await Promise.all([loadResearch(), loadLecturers()]);
    // Sắp xếp danh bạ theo tên riêng tiếng Việt A–Z trước khi lọc và phân trang.
    lecturers = [...people].sort(compareLecturersByName);
    topics = flattenTopics(research);
    groups = research.groups.map(getGroup);

    const groupSelect = document.getElementById("lecturer-group");
    populateGroupOptions(groupSelect, groups);

    // Nếu URL mang ?group=<id> hợp lệ thì chọn sẵn nhóm trước lần render đầu.
    const initialGroup = resolveInitialGroup(groups);
    if (groupSelect && initialGroup) {
      groupSelect.value = initialGroup;
    }

    bindFilterEvents();
    renderLecturers(true);
  } catch {
    document.getElementById("lecturers-status").textContent =
      "Không thể tải danh bạ. Hãy tải lại trang để thử lại.";
  }
}

/**
 * Đọc tham số ?group trên URL nếu khớp với một nhóm hợp lệ trong dữ liệu.
 * @param {object[]} groupList - Danh sách nhóm nghiên cứu đã nạp.
 * @returns {string} Mã nhóm hợp lệ hoặc chuỗi rỗng nếu không có hoặc không khớp.
 */
function resolveInitialGroup(groupList) {
  const groupParam = new URLSearchParams(location.search).get("group");
  if (!groupParam) return "";
  return groupList.some((group) => group.id === groupParam) ? groupParam : "";
}

/**
 * Điền các nhóm nghiên cứu vào thẻ select lọc nhóm.
 * @param {HTMLSelectElement|null} selectEl - Phần tử select nhóm chủ đề.
 * @param {object[]} groupList - Danh sách nhóm nghiên cứu từ JSON.
 * @returns {void} Không trả về giá trị.
 */
function populateGroupOptions(selectEl, groupList) {
  if (!selectEl) return;
  for (const group of groupList) {
    const option = element("option", "", group.name);
    option.value = group.id;
    selectEl.append(option);
  }
}

/**
 * Gắn các sự kiện tương tác cho form lọc, nút đặt lại ở trạng thái rỗng và phân trang.
 * @returns {void} Không trả về giá trị.
 */
function bindFilterEvents() {
  const form = document.getElementById("lecturer-filter");
  form?.addEventListener("submit", preventSubmit);
  form?.addEventListener("input", handleFilterInput);
  form?.addEventListener("change", handleFilterInput);
  form?.addEventListener("reset", handleFormReset);

  const emptyResetButton = document
    .getElementById("lecturers-empty")
    ?.querySelector("[data-empty-reset]");
  emptyResetButton?.addEventListener("click", handleEmptyReset);

  const pagination = document.getElementById("lecturers-pagination");
  pagination?.addEventListener("click", changePage);
}

/**
 * Lấy metadata nhóm từ mục nhóm nguồn.
 * @param {object} entry - Bản ghi nhóm từ dữ liệu nghiên cứu.
 * @returns {object} Thông tin nhóm gồm id và name.
 */
function getGroup(entry) {
  return entry.group;
}

/**
 * Xử lý khi người dùng nhập từ khóa hoặc đổi nhóm lọc (đưa về trang 1).
 * @returns {void} Không trả về giá trị.
 */
function handleFilterInput() {
  renderLecturers(true);
}

/**
 * Ngăn chặn submit form mặc định làm tải lại trang và giữ lọc tức thời.
 * @param {SubmitEvent} event - Sự kiện submit của form tìm kiếm.
 * @returns {void} Không trả về giá trị.
 */
function preventSubmit(event) {
  event.preventDefault();
  renderLecturers(true);
}

/**
 * Xử lý sự kiện reset gốc của form và cập nhật lại giao diện sau khi giá trị đã xóa.
 * @returns {void} Không trả về giá trị.
 */
function handleFormReset() {
  // Đợi trình duyệt hoàn tất thao tác reset native của các control trước khi render.
  requestAnimationFrame(applyResetState);
}

/**
 * Xử lý nút "Xóa bộ lọc" trong khối trạng thái rỗng.
 * @returns {void} Không trả về giá trị.
 */
function handleEmptyReset() {
  const searchInput = document.getElementById("lecturer-search");
  const groupSelect = document.getElementById("lecturer-group");
  if (searchInput) searchInput.value = "";
  if (groupSelect) groupSelect.value = "";
  applyResetState();
}

/**
 * Đặt lại bộ lọc về trang 1, xóa query URL nếu có, render lại danh bạ và trả focus về ô tìm kiếm.
 * @returns {void} Không trả về giá trị.
 */
function applyResetState() {
  if (location.search) {
    history.replaceState(null, "", location.pathname);
  }
  renderLecturers(true);
  document.getElementById("lecturer-search")?.focus({ preventScroll: true });
}

/**
 * Loại bỏ học hàm/học vị ở đầu và chú thích đơn vị trong ngoặc ở cuối tên giảng viên.
 * @param {string} rawName - Tên đầy đủ gốc trong dữ liệu JSON.
 * @returns {string} Chuỗi họ tên đã làm sạch để tách tên riêng.
 */
function extractSortableName(rawName) {
  const withoutOrg = String(rawName || "").replace(/\s*\([^)]*\)\s*$/g, "").trim();
  return withoutOrg
    .replace(/^(PGS\.?\s*TS\.?|GS\.?\s*TS\.?|PGS\.?|GS\.?|TS\.?|ThS\.?|Th\.S\.?|CN\.?)\s+/i, "")
    .trim();
}

/**
 * So sánh hai giảng viên theo tên riêng tiếng Việt (A–Z); trùng tên chính thì so họ tên đầy đủ.
 * @param {object} first - Giảng viên thứ nhất.
 * @param {object} second - Giảng viên thứ hai.
 * @returns {number} Giá trị âm, 0 hoặc dương theo thứ tự bảng chữ cái tiếng Việt.
 */
function compareLecturersByName(first, second) {
  const firstFull = extractSortableName(first?.name);
  const secondFull = extractSortableName(second?.name);
  const firstParts = firstFull.split(/\s+/).filter(Boolean);
  const secondParts = secondFull.split(/\s+/).filter(Boolean);
  const firstGiven = firstParts[firstParts.length - 1] || firstFull;
  const secondGiven = secondParts[secondParts.length - 1] || secondFull;

  // So sánh từ cuối tên riêng theo chuẩn tiếng Việt.
  const givenCompare = firstGiven.localeCompare(secondGiven, "vi");
  if (givenCompare !== 0) return givenCompare;

  // Nếu trùng tên riêng thì đối chiếu toàn bộ họ tên đầy đủ đã bỏ học hàm/đơn vị.
  return firstFull.localeCompare(secondFull, "vi");
}

/**
 * Kiểm tra email giảng viên trong chủ đề có khớp với giảng viên cần tra cứu hay không.
 * @param {object} entry - Bản ghi chủ đề kèm nhóm.
 * @param {string} targetEmail - Email giảng viên đã chuẩn hóa.
 * @returns {boolean} True nếu chủ đề thuộc giảng viên này.
 */
function matchesLecturerTopic(entry, targetEmail) {
  return normalizeEmail(entry.topic.lecturer.email) === targetEmail;
}

/**
 * Lấy danh sách các chủ đề nghiên cứu liên quan đến giảng viên qua email đã chuẩn hóa.
 * @param {object} lecturer - Dữ liệu giảng viên.
 * @returns {object[]} Danh sách chủ đề giảng viên hướng dẫn.
 */
function relatedTopics(lecturer) {
  const targetEmail = normalizeEmail(lecturer.email);
  return topics.filter((entry) => matchesLecturerTopic(entry, targetEmail));
}

/**
 * Kiểm tra chủ đề có thuộc mã nhóm đang chọn hay không.
 * @param {object} entry - Bản ghi chủ đề kèm nhóm.
 * @param {string} groupId - Mã nhóm cần lọc.
 * @returns {boolean} True nếu chủ đề thuộc nhóm đang lọc.
 */
function isTopicInGroup(entry, groupId) {
  return entry.group.id === groupId;
}

/**
 * Kiểm tra một giảng viên có thỏa mãn điều kiện từ khóa tìm kiếm và nhóm chủ đề hay không.
 * @param {object} lecturer - Dữ liệu giảng viên.
 * @param {string} query - Chuỗi tìm kiếm đã chuẩn hóa không dấu, chữ thường.
 * @param {string} groupId - Mã nhóm đang lọc (rỗng nếu chọn tất cả).
 * @returns {boolean} True nếu giảng viên thỏa mãn bộ lọc.
 */
function matchesLecturerFilter(lecturer, query, groupId) {
  const textMatches = searchText(lecturer.name + " " + lecturer.email).includes(query);
  const groupMatches = !groupId || relatedTopics(lecturer).some((entry) => isTopicInGroup(entry, groupId));
  return textMatches && groupMatches;
}

/**
 * Lọc và sắp xếp danh sách giảng viên theo bộ lọc hiện tại trước khi phân trang.
 * @param {string} query - Chuỗi tìm kiếm đã chuẩn hóa.
 * @param {string} groupId - Mã nhóm đang lọc.
 * @returns {object[]} Mảng giảng viên khớp bộ lọc đã được sắp xếp A–Z.
 */
function getFilteredLecturers(query, groupId) {
  return lecturers
    .filter((lecturer) => matchesLecturerFilter(lecturer, query, groupId))
    .sort(compareLecturersByName);
}

/**
 * Kiểm tra người dùng có đang áp dụng bộ lọc tìm kiếm hoặc nhóm hay không.
 * @param {string} query - Chuỗi tìm kiếm đã chuẩn hóa.
 * @param {string} groupId - Mã nhóm đang chọn.
 * @returns {boolean} True nếu có bộ lọc khác mặc định.
 */
function hasCustomFilter(query, groupId) {
  return Boolean(query) || Boolean(groupId);
}

/**
 * Tạo chuỗi thông báo số lượng giảng viên đang hiển thị.
 * @param {number} total - Tổng số giảng viên khớp bộ lọc.
 * @param {number} start - Chỉ số phần tử đầu trang hiện tại.
 * @param {number} pageCount - Tổng số trang.
 * @returns {string} Chuỗi trạng thái hiển thị cho người dùng và screen reader.
 */
function buildLecturersStatus(total, start, pageCount) {
  if (!lecturers.length) return "Chưa có dữ liệu giảng viên.";
  if (!total) return "Không có giảng viên phù hợp với bộ lọc.";
  const pageInfo = pageCount > 1 ? ` · Trang ${currentPage}/${pageCount}` : "";
  return `Hiển thị ${start + 1}–${Math.min(start + PAGE_SIZE, total)} trong ${total} giảng viên${pageInfo}`;
}

/**
 * Bật hoặc tắt khối thông báo trạng thái rỗng khi không có giảng viên khớp bộ lọc.
 * @param {number} total - Tổng số giảng viên khớp bộ lọc.
 * @returns {boolean} True nếu đang hiển thị trạng thái rỗng.
 */
function renderEmptyState(total) {
  const emptyBox = document.getElementById("lecturers-empty");
  if (!emptyBox) return false;
  // Chỉ coi là không khớp bộ lọc khi dữ liệu gốc đã tải thành công (> 0).
  const isEmpty = !total && lecturers.length > 0;
  emptyBox.hidden = !isEmpty;
  return isEmpty;
}

/**
 * Đồng bộ trạng thái ẩn/hiện của nút "Xóa bộ lọc" trên thanh tìm kiếm.
 * @param {boolean} hasFilter - Người dùng có đang lọc hay không.
 * @param {boolean} isEmptyVisible - Khối empty state có đang hiển thị hay không.
 * @returns {void} Không trả về giá trị.
 */
function renderFilterState(hasFilter, isEmptyVisible) {
  const resetButton = document.getElementById("lecturers-reset");
  if (!resetButton) return;
  // Ẩn nút reset trên form khi chưa lọc gì hoặc khi empty state đã có nút reset tại chỗ.
  resetButton.hidden = isEmptyVisible || !hasFilter;
}

/**
 * Lọc, phân trang (9 thẻ/trang) và render toàn bộ giao diện danh bạ giảng viên.
 * @param {boolean} [resetPage=false] - Có đặt lại về trang đầu tiên hay không.
 * @returns {void} Không trả về giá trị.
 */
function renderLecturers(resetPage = false) {
  if (resetPage) {
    currentPage = 1;
  }

  const query = searchText(document.getElementById("lecturer-search").value);
  const groupId = document.getElementById("lecturer-group").value;
  const matches = getFilteredLecturers(query, groupId);

  const total = matches.length;
  const pageCount = Math.ceil(total / PAGE_SIZE) || 1;
  if (currentPage > pageCount) {
    currentPage = 1;
  }

  const start = (currentPage - 1) * PAGE_SIZE;
  const pagedItems = matches.slice(start, start + PAGE_SIZE);

  document.getElementById("lecturers-list").replaceChildren(...pagedItems.map(createLecturerCard));
  document.getElementById("lecturers-status").textContent = buildLecturersStatus(
    total,
    start,
    pageCount,
  );

  const isEmptyVisible = renderEmptyState(total);
  renderFilterState(hasCustomFilter(query, groupId), isEmptyVisible);
  createPaginationNav(
    document.getElementById("lecturers-pagination"),
    currentPage,
    pageCount,
    "lecturers-pagination__button",
  );
}

/**
 * Xử lý chuyển trang khi người dùng bấm vào thanh phân trang và đặt focus về heading danh sách.
 * @param {MouseEvent} event - Sự kiện click trên thanh phân trang.
 * @returns {void} Không trả về giá trị.
 */
function changePage(event) {
  const button = event.target.closest("button[data-page]");
  if (!button || button.disabled) return;

  currentPage = Number(button.dataset.page);
  renderLecturers(false);

  // Focus vào heading ẩn thay vì live region để tránh screen reader đọc lặp nội dung trạng thái.
  const heading = document.getElementById("lecturers-results-heading");
  const listEl = document.getElementById("lecturers-list");
  heading?.focus({ preventScroll: true });
  listEl?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Tạo thẻ thông tin giảng viên (card) gồm avatar, tên, email, nhóm chủ đề và link hồ sơ.
 * @param {object} lecturer - Dữ liệu giảng viên.
 * @returns {HTMLElement} Thẻ article hoàn chỉnh.
 */
function createLecturerCard(lecturer) {
  const card = element("article", "lecturer-card");
  const header = element("div", "lecturer-card__header");
  const meta = element("div", "lecturer-card__meta");

  // Tên và email giảng viên giữ nguyên để phục vụ tra cứu nhanh trên thẻ.
  const heading = element("h2", "lecturer-card__name", lecturer.name);
  const email = element("a", "lecturer-card__email", lecturer.email);
  email.href = "mailto:" + normalizeEmail(lecturer.email);
  meta.append(heading, email);

  header.append(avatar(lecturer, "lecturer-card__avatar"), meta);

  const related = relatedTopics(lecturer);
  const ids = new Set(related.map(getGroupId));
  const tags = createGroupTags(groups, ids, "lecturer-card__tags");

  const link = element("a", "lecturer-card__profile-link", "Xem hồ sơ →");
  link.href = lecturerUrl(lecturer.email);
  link.setAttribute("aria-label", "Xem hồ sơ chi tiết của " + lecturer.name);

  const footer = element("div", "lecturer-card__footer");
  footer.append(element("p", "lecturer-card__topic-count", related.length + " chủ đề"), link);

  card.append(header, tags, footer);
  return card;
}

/**
 * Lấy mã ID nhóm từ bản ghi chủ đề.
 * @param {object} entry - Bản ghi chủ đề kèm nhóm.
 * @returns {string} Mã nhóm nghiên cứu.
 */
function getGroupId(entry) {
  return entry.group.id;
}
