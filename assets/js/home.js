/** @file Trang chủ: tải dữ liệu động để hiển thị thống kê tổng quan và danh sách nhóm chủ đề. */
import {
  loadResearch,
  loadLecturers,
  normalizeEmail,
  resolveGroupTone,
  topicsGroupUrl,
  element,
} from "./data.js";

/** Số nhóm chủ đề hiển thị ban đầu trước khi mở rộng toàn bộ. */
const INITIAL_GROUP_LIMIT = 6;

const state = {
  groups: [],
  showAllGroups: false,
};

document.addEventListener("DOMContentLoaded", initHome);

/**
 * Khởi tạo dữ liệu trang chủ và gắn sự kiện mở rộng danh sách nhóm khi DOM sẵn sàng.
 * @returns {Promise<void>}
 */
async function initHome() {
  const statsEl = document.getElementById("home-stats");
  const statusEl = document.getElementById("home-domains-status");
  const toggleBtn = document.getElementById("home-domains-toggle");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", toggleDomainList);
  }

  try {
    // Danh bạ giảng viên dùng để đếm tổng số giảng viên; lỗi tải danh bạ không làm hỏng phần chủ đề.
    const [research, lecturers] = await Promise.all([
      loadResearch(),
      loadLecturers().catch(() => null),
    ]);
    state.groups = research.groups;
    renderHomeStats(state.groups, lecturers);
    renderDomainList();
  } catch {
    if (statsEl) {
      statsEl.textContent = "Không thể tải thống kê danh mục.";
    }
    if (statusEl) {
      statusEl.hidden = false;
      statusEl.textContent = "Không thể tải danh sách nhóm chủ đề. Hãy tải lại trang để thử lại.";
    }
    document.getElementById("home-domains-list")?.setAttribute("hidden", "");
    document.getElementById("home-domains-actions")?.setAttribute("hidden", "");
  }
}

/**
 * Đếm số giảng viên duy nhất theo email chuẩn hóa, tự động dự phòng từ danh sách chủ đề nếu thiếu danh bạ.
 * @param {object[]} researchGroups Danh sách nhóm và chủ đề nghiên cứu.
 * @param {object[]|null} directoryLecturers Danh sách giảng viên từ danh bạ hoặc null khi tải lỗi.
 * @returns {number} Số giảng viên duy nhất.
 */
function countUniqueLecturers(researchGroups, directoryLecturers) {
  const emails = new Set();

  if (Array.isArray(directoryLecturers) && directoryLecturers.length > 0) {
    for (const lecturer of directoryLecturers) {
      const email = normalizeEmail(lecturer?.email);
      if (email) emails.add(email);
    }
    if (emails.size > 0) return emails.size;
  }

  // Fallback từ email giảng viên gắn trên từng đề tài khi danh bạ trống hoặc không nạp được.
  for (const entry of researchGroups) {
    for (const topic of entry.topics || []) {
      const email = normalizeEmail(topic?.lecturer?.email);
      if (email) emails.add(email);
    }
  }
  return emails.size;
}

/**
 * Hiển thị số liệu thống kê thực tế ở phần đầu trang và nhãn đếm số nhóm.
 * @param {object[]} researchGroups Danh sách nhóm nghiên cứu từ JSON.
 * @param {object[]|null} directoryLecturers Danh sách giảng viên hoặc null.
 * @returns {void}
 */
function renderHomeStats(researchGroups, directoryLecturers) {
  const groupCount = researchGroups.length;
  const topicCount = researchGroups.reduce(
    (sum, entry) => sum + (Array.isArray(entry.topics) ? entry.topics.length : 0),
    0,
  );
  const lecturerCount = countUniqueLecturers(researchGroups, directoryLecturers);

  const statsEl = document.getElementById("home-stats");
  if (statsEl) {
    statsEl.textContent = `${groupCount} nhóm chủ đề · ${topicCount} đề tài · ${lecturerCount} giảng viên`;
  }

  const countEl = document.getElementById("home-domains-count");
  if (countEl) {
    countEl.textContent = `${groupCount} nhóm`;
  }
}

/**
 * Tổng hợp mô tả ngắn cho thẻ nhóm hoàn toàn từ dữ liệu JSON thật.
 * @param {object} entry Bản ghi nhóm kèm danh sách chủ đề của nhóm.
 * @returns {string} Chuỗi mô tả ngắn gọn không phụ thuộc văn bản viết cứng.
 */
function summarizeGroupFocus(entry) {
  const customDescription = String(entry?.group?.description || "").trim();
  if (customDescription) return customDescription;

  const topics = Array.isArray(entry?.topics) ? entry.topics : [];
  if (!topics.length) return "Chưa có đề tài trong nhóm này.";

  // Gom tối đa 3 trụ cột kiến thức gốc tiêu biểu, loại trùng theo chữ thường.
  const pillars = [];
  const seenPillars = new Set();
  for (const topic of topics) {
    for (const keyword of topic?.keywords || []) {
      const name = String(keyword?.name || "").trim();
      const key = name.toLowerCase();
      if (!name || seenPillars.has(key)) continue;
      seenPillars.add(key);
      pillars.push(name);
      if (pillars.length === 3) break;
    }
    if (pillars.length === 3) break;
  }

  if (pillars.length > 0) {
    return "Trọng tâm: " + pillars.join(" · ");
  }

  // Nếu chủ đề chưa có cây keyword thì tóm tắt theo số giảng viên hướng dẫn trong nhóm.
  const lecturerEmails = new Set();
  for (const topic of topics) {
    const email = normalizeEmail(topic?.lecturer?.email);
    if (email) lecturerEmails.add(email);
  }
  return lecturerEmails.size > 0
    ? `${lecturerEmails.size} giảng viên hướng dẫn`
    : `${topics.length} đề tài nghiên cứu`;
}

/**
 * Tạo một phần tử thẻ nhóm chủ đề an toàn qua DOM API.
 * @param {object} entry Bản ghi nhóm gồm group và mảng topics.
 * @param {number} index Vị trí gốc của nhóm trong dữ liệu để chọn sắc độ ổn định.
 * @returns {HTMLLIElement} Thẻ danh sách chứa thông tin nhóm và liên kết lọc sẵn.
 */
function createDomainCard(entry, index) {
  const item = element("li");
  const card = element("article", "home__domain-card");
  const head = element("div", "home__domain-head");

  const title = element("h3", "home__domain-title", entry.group.name);
  const topicCount = Array.isArray(entry.topics) ? entry.topics.length : 0;
  const badge = element("span", "badge", `${topicCount} chủ đề`);
  badge.dataset.domainTone = resolveGroupTone(entry.group.id, index);
  head.append(title, badge);

  const desc = element("p", "home__domain-desc", summarizeGroupFocus(entry));

  const link = element("a", "home__domain-link", "Xem chủ đề ");
  link.href = topicsGroupUrl(entry.group.id);
  link.setAttribute("aria-label", `Xem chủ đề nhóm ${entry.group.name}`);
  const arrow = element("span", "", "→");
  arrow.setAttribute("aria-hidden", "true");
  link.append(arrow);

  card.append(head, desc, link);
  item.append(card);
  return item;
}

/**
 * Render lưới thẻ nhóm theo trạng thái rút gọn/mở rộng và xử lý trường hợp dữ liệu rỗng.
 * @returns {void}
 */
function renderDomainList() {
  const statusEl = document.getElementById("home-domains-status");
  const listEl = document.getElementById("home-domains-list");
  const actionsEl = document.getElementById("home-domains-actions");
  const toggleBtn = document.getElementById("home-domains-toggle");
  if (!statusEl || !listEl || !actionsEl || !toggleBtn) return;

  if (!state.groups.length) {
    statusEl.hidden = false;
    statusEl.textContent = "Chưa có nhóm chủ đề nào trong dữ liệu hiện tại.";
    listEl.hidden = true;
    listEl.replaceChildren();
    actionsEl.hidden = true;
    return;
  }

  statusEl.hidden = true;
  listEl.hidden = false;

  // Khi có nhiều hơn INITIAL_GROUP_LIMIT nhóm thì chỉ hiện phần đầu trước khi người dùng mở rộng.
  const visibleGroups = state.showAllGroups
    ? state.groups
    : state.groups.slice(0, INITIAL_GROUP_LIMIT);
  const fragment = document.createDocumentFragment();

  visibleGroups.forEach((entry, index) => {
    fragment.append(createDomainCard(entry, index));
  });
  listEl.replaceChildren(fragment);

  const hasOverflow = state.groups.length > INITIAL_GROUP_LIMIT;
  actionsEl.hidden = !hasOverflow;
  if (hasOverflow) {
    toggleBtn.textContent = state.showAllGroups
      ? "Thu gọn danh sách nhóm"
      : `Xem tất cả ${state.groups.length} nhóm chủ đề`;
    toggleBtn.setAttribute("aria-expanded", String(state.showAllGroups));
  }
}

/**
 * Chuyển đổi trạng thái hiển thị toàn bộ hoặc 6 nhóm chủ đề đầu tiên.
 * @returns {void}
 */
function toggleDomainList() {
  state.showAllGroups = !state.showAllGroups;
  renderDomainList();
}
