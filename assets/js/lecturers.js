/**
 * @file Quản lý hiển thị danh bạ giảng viên (TV2 Job 2 nâng cấp từ TV3).
 * Hỗ trợ tìm kiếm, lọc theo nhóm, phân trang tối đa 3 hàng (9 thẻ/trang)
 * và tối ưu nhận diện avatar viết tắt tiếng Việt chuẩn xác.
 */

import {
  loadResearch,
  loadLecturers,
  flattenTopics,
  normalizeEmail,
  searchText,
  lecturerUrl,
  element,
} from "./data.js";

/** Số lượng giảng viên tối đa trên 1 trang (3 hàng x 3 cột trên desktop) */
const PAGE_SIZE = 9;

let lecturers = [];
let topics = [];
let groups = [];
let currentPage = 1;

document.addEventListener("DOMContentLoaded", initLecturers);

/**
 * Khởi tạo dữ liệu và sự kiện cho trang danh bạ giảng viên.
 * @returns {Promise<void>}
 */
async function initLecturers() {
  try {
    const [research, people] = await Promise.all([loadResearch(), loadLecturers()]);
    lecturers = people;
    topics = flattenTopics(research);
    groups = research.groups.map(getGroup);

    // Điền các nhóm nghiên cứu vào dropdown filter
    const select = document.getElementById("lecturer-group");
    for (const group of groups) {
      const option = element("option", "", group.name);
      option.value = group.id;
      select.append(option);
    }

    // Gắn sự kiện cho form lọc và tìm kiếm
    const form = document.getElementById("lecturer-filter");
    form.addEventListener("submit", preventSubmit);
    form.addEventListener("input", handleFilterInput);
    form.addEventListener("change", handleFilterInput);
    form.addEventListener("reset", resetSearch);

    // Gắn sự kiện phân trang
    const pagination = document.getElementById("lecturers-pagination");
    pagination?.addEventListener("click", changePage);

    renderLecturers(true);
  } catch {
    document.getElementById("lecturers-status").textContent =
      "Không thể tải danh bạ. Hãy tải lại trang để thử lại.";
  }
}

/**
 * Lấy metadata nhóm từ nhóm nguồn.
 * @param {object} entry Nhóm nguồn.
 * @returns {object} Thông tin nhóm.
 */
function getGroup(entry) {
  return entry.group;
}

/**
 * Xử lý khi người dùng nhập tìm kiếm hoặc đổi filter nhóm (reset về trang 1).
 * @returns {void}
 */
function handleFilterInput() {
  renderLecturers(true);
}

/**
 * Ngăn chặn submit form làm tải lại trang.
 * @param {SubmitEvent} event Sự kiện submit.
 * @returns {void}
 */
function preventSubmit(event) {
  event.preventDefault();
  renderLecturers(true);
}

/**
 * Đặt lại tìm kiếm và làm mới danh sách về trang 1.
 * @returns {void}
 */
function resetSearch() {
  requestAnimationFrame(() => renderLecturers(true));
}

/**
 * Lấy danh sách các chủ đề nghiên cứu liên quan đến giảng viên qua email.
 * @param {object} lecturer Dữ liệu giảng viên.
 * @returns {object[]} Các chủ đề giảng viên hướng dẫn.
 */
function relatedTopics(lecturer) {
  return topics.filter(matchesEmail);

  /**
   * So khớp email chuẩn hóa.
   * @param {object} entry Chủ đề nghiên cứu.
   * @returns {boolean} True nếu trùng email.
   */
  function matchesEmail(entry) {
    return normalizeEmail(entry.topic.lecturer.email) === normalizeEmail(lecturer.email);
  }
}

/**
 * Rút trích 2 chữ cái viết tắt đại diện cho avatar giảng viên (tiếng Việt).
 * Xử lý triệt để việc loại bỏ học hàm (PGS, TS...), tổ chức trong ngoặc (ĐHQT, ĐHQG...),
 * tránh lỗi ký tự ngoặc đơn hoặc mất chữ cái.
 * @param {string} rawName Tên gốc của giảng viên.
 * @returns {string} 2 chữ cái viết hoa đại diện.
 */
export function getLecturerInitials(rawName) {
  if (!rawName) return "GV";
  // 1. Loại bỏ các phần chú thích đơn vị trong ngoặc ở cuối tên: (ĐHQT), (ĐHQG-HCM), (ĐH KTL)...
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
 * @returns {HTMLElement} Phần tử avatar.
 */
export function createLecturerAvatar(lecturer, className) {
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
      // Giữ nguyên initials nếu URL không hợp lệ
    }
  }

  return box;
}

/**
 * Lọc và render danh bạ giảng viên kết hợp phân trang (tối đa 9 giảng viên/trang).
 * @param {boolean} [resetPage=false] Có đặt lại về trang đầu hay không.
 * @returns {void}
 */
function renderLecturers(resetPage = false) {
  if (resetPage) {
    currentPage = 1;
  }

  const query = searchText(document.getElementById("lecturer-search").value);
  const group = document.getElementById("lecturer-group").value;

  // Lọc theo từ khóa tìm kiếm (hỗ trợ cả tìm theo tên và email) và nhóm đề tài
  const matches = lecturers.filter(matchesFilter);

  // Tính toán phân trang
  const total = matches.length;
  const pageCount = Math.ceil(total / PAGE_SIZE) || 1;
  if (currentPage > pageCount) {
    currentPage = 1;
  }

  const start = (currentPage - 1) * PAGE_SIZE;
  const pagedItems = matches.slice(start, start + PAGE_SIZE);

  // Render các thẻ giảng viên thuộc trang hiện tại
  document.getElementById("lecturers-list").replaceChildren(...pagedItems.map(createLecturerCard));

  // Cập nhật thông báo trạng thái
  const statusEl = document.getElementById("lecturers-status");
  if (!lecturers.length) {
    statusEl.textContent = "Chưa có dữ liệu giảng viên.";
  } else if (!total) {
    statusEl.textContent = "Không có giảng viên phù hợp với bộ lọc.";
  } else {
    const pageInfo = pageCount > 1 ? ` · Trang ${currentPage}/${pageCount}` : "";
    statusEl.textContent = `Hiển thị ${start + 1}–${Math.min(start + PAGE_SIZE, total)} trong ${total} giảng viên${pageInfo}`;
  }

  // Render bộ nút phân trang
  renderPagination(pageCount);

  /**
   * Bộ lọc tên, email và nhóm chủ đề liên quan.
   * @param {object} lecturer Giảng viên.
   * @returns {boolean} True nếu thỏa mãn điều kiện lọc.
   */
  function matchesFilter(lecturer) {
    const textMatches = searchText(lecturer.name + " " + lecturer.email).includes(query);
    const groupMatches = !group || relatedTopics(lecturer).some(inGroup);
    return textMatches && groupMatches;
  }

  /**
   * Kiểm tra chủ đề thuộc nhóm đang lọc.
   * @param {object} entry Chủ đề.
   * @returns {boolean} True nếu trùng mã nhóm.
   */
  function inGroup(entry) {
    return entry.group.id === group;
  }
}

/**
 * Render thanh điều hướng phân trang nếu có nhiều hơn 1 trang.
 * @param {number} pageCount Tổng số trang.
 * @returns {void}
 */
function renderPagination(pageCount) {
  const nav = document.getElementById("lecturers-pagination");
  if (!nav) return;

  if (pageCount <= 1) {
    nav.hidden = true;
    nav.replaceChildren();
    return;
  }

  nav.hidden = false;
  const fragment = document.createDocumentFragment();

  // Nút "Trước"
  fragment.append(createPageButton("Trước", currentPage - 1, currentPage === 1));

  // Các nút số trang
  for (let number = 1; number <= pageCount; number++) {
    fragment.append(createPageButton(String(number), number, false));
  }

  // Nút "Sau"
  fragment.append(createPageButton("Sau", currentPage + 1, currentPage === pageCount));

  nav.replaceChildren(fragment);
}

/**
 * Tạo một nút bấm trong thanh phân trang chuẩn WAI-ARIA.
 * @param {string} label Nhãn hiển thị của nút.
 * @param {number} targetPage Số trang đích.
 * @param {boolean} disabled Trạng thái vô hiệu hóa.
 * @returns {HTMLButtonElement} Phần tử nút bấm.
 */
function createPageButton(label, targetPage, disabled) {
  const button = element("button", "lecturers-pagination__button", label);
  button.type = "button";
  button.dataset.page = String(targetPage);
  button.disabled = disabled;

  if (/^\d+$/.test(label)) {
    button.setAttribute("aria-label", "Trang " + targetPage);
    if (targetPage === currentPage) {
      button.setAttribute("aria-current", "page");
    }
  }

  return button;
}

/**
 * Xử lý chuyển trang khi click vào nút phân trang.
 * @param {MouseEvent} event Sự kiện click.
 * @returns {void}
 */
function changePage(event) {
  const button = event.target.closest("button[data-page]");
  if (!button || button.disabled) return;

  currentPage = Number(button.dataset.page);
  renderLecturers(false);

  // Cuộn nhẹ lên đầu danh sách để thuận tiện quan sát
  const listEl = document.getElementById("lecturers-list");
  listEl?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Tạo thẻ hiển thị thông tin giảng viên (card).
 * Đã lược bỏ trường email theo yêu cầu để tránh rối mắt, giữ bố cục tinh gọn.
 * @param {object} lecturer Dữ liệu giảng viên.
 * @returns {HTMLElement} Thẻ article hoàn chỉnh.
 */
function createLecturerCard(lecturer) {
  const card = element("article", "lecturer-card");
  const header = element("div", "lecturer-card__header");
  const meta = element("div", "lecturer-card__meta");

  // Tên giảng viên (đã bỏ trường email để giao diện tinh gọn, không rối mắt)
  const heading = element("h2", "lecturer-card__name", lecturer.name);
  meta.append(heading);

  // Avatar sử dụng bộ nhận diện viết tắt tiếng Việt chuẩn
  header.append(createLecturerAvatar(lecturer, "lecturer-card__avatar"), meta);

  // Nhóm chủ đề nghiên cứu mà giảng viên phụ trách
  const related = relatedTopics(lecturer);
  const ids = new Set(related.map(getGroupId));
  const tags = element("div", "lecturer-card__tags");
  for (const group of groups) {
    if (ids.has(group.id)) {
      tags.append(element("span", "lecturer-tag lecturer-tag--" + group.id, group.name));
    }
  }

  // Nút liên kết tới trang hồ sơ chi tiết
  const link = element("a", "lecturer-card__profile-link", "Xem hồ sơ →");
  link.href = lecturerUrl(lecturer.email);
  link.setAttribute("aria-label", "Xem hồ sơ chi tiết của " + lecturer.name);

  // Chân thẻ gồm số lượng chủ đề và nút xem hồ sơ
  const footer = element("div", "lecturer-card__footer");
  footer.append(element("p", "lecturer-card__topic-count", related.length + " chủ đề nghiên cứu"), link);

  card.append(header, tags, footer);
  return card;
}

/**
 * Lấy mã ID nhóm từ bản ghi chủ đề.
 * @param {object} entry Bản ghi chủ đề.
 * @returns {string} ID nhóm.
 */
function getGroupId(entry) {
  return entry.group.id;
}
