/** @file Trang chủ: nạp thống kê tổng quan động từ JSON cho nhãn hành trình. */
import { loadResearch, loadLecturers, normalizeEmail } from "./data.js";

document.addEventListener("DOMContentLoaded", initHome);

/**
 * Khởi tạo nhãn thống kê động trên trang chủ mà không làm gián đoạn bố cục giới thiệu.
 * @returns {Promise<void>}
 */
async function initHome() {
  const statsEl = document.getElementById("home-stats");
  if (!statsEl) return;

  try {
    // Tải song song chủ đề và danh bạ giảng viên; lỗi tải danh bạ sẽ tự dự phòng từ dữ liệu chủ đề.
    const [research, lecturers] = await Promise.all([
      loadResearch(),
      loadLecturers().catch(() => null),
    ]);
    renderHomeStats(research.groups, lecturers);
  } catch {
    // Giữ ẩn nhãn thống kê nếu dữ liệu chưa tải được để bảo toàn bố cục trang chủ.
    statsEl.hidden = true;
  }
}

/**
 * Đếm số giảng viên duy nhất theo email chuẩn hóa, tự động dự phòng từ danh sách chủ đề khi thiếu danh bạ.
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
 * Hiển thị số liệu thống kê thực tế ở phần đầu khối hành trình khi có dữ liệu hợp lệ.
 * @param {object[]} researchGroups Danh sách nhóm nghiên cứu từ JSON.
 * @param {object[]|null} directoryLecturers Danh sách giảng viên hoặc null.
 * @returns {void}
 */
function renderHomeStats(researchGroups, directoryLecturers) {
  const statsEl = document.getElementById("home-stats");
  if (!statsEl || !Array.isArray(researchGroups) || !researchGroups.length) {
    if (statsEl) statsEl.hidden = true;
    return;
  }

  const groupCount = researchGroups.length;
  const topicCount = researchGroups.reduce(
    (sum, entry) => sum + (Array.isArray(entry.topics) ? entry.topics.length : 0),
    0,
  );
  const lecturerCount = countUniqueLecturers(researchGroups, directoryLecturers);

  statsEl.textContent = `${groupCount} nhóm chủ đề · ${topicCount} đề tài · ${lecturerCount} giảng viên`;
  statsEl.hidden = false;
}
