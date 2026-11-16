/** @file Theme chung: áp dụng trước CSS để tránh nháy theme khi chuyển trang. */
/** Khởi tạo lựa chọn theme và vòng đời DOM. @returns {void} */
(function initTheme() {
  const storageKey = "ie104.theme";
  let preference = readPreference();
  applyTheme();
  document.addEventListener("DOMContentLoaded", bindThemeButtons);
  window.addEventListener("storage", handleStorageChange);

  /** Đọc lựa chọn hợp lệ; storage bị chặn dùng giao diện sáng.
   * @returns {string|null} light/dark hoặc null khi chưa chọn.
   */
  function readPreference() {
    try {
      const value = localStorage.getItem(storageKey);
      return value === "light" || value === "dark" ? value : null;
    } catch {
      return null;
    }
  }
  /** Chọn theme và đồng bộ trạng thái nút. @returns {void} */
  function applyTheme() {
    const theme = preference || "light";
    document.documentElement.dataset.theme = theme;
    for (const button of document.querySelectorAll(".theme-toggle")) {
      button.hidden = false;
      button.setAttribute("aria-pressed", String(theme === "dark"));
      button.title = "Chuyển sang giao diện " + (theme === "dark" ? "sáng" : "tối");
      button.querySelector(".theme-toggle__icon").textContent = theme === "dark" ? "☾" : "☀";
      button.querySelector(".theme-toggle__text").textContent = theme === "dark" ? "Tối" : "Sáng";
    }
  }
  /** Gắn sự kiện sau khi HTML sẵn sàng. @returns {void} */
  function bindThemeButtons() {
    for (const button of document.querySelectorAll(".theme-toggle"))
      button.addEventListener("click", toggleTheme);
    applyTheme();
  }
  /** Đảo theme và lưu lựa chọn nếu trình duyệt cho phép. @returns {void} */
  function toggleTheme() {
    preference = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(storageKey, preference);
    } catch {
      /* Theme vẫn đổi trong trang khi storage bị chặn. */
    }
    applyTheme();
  }
  /** Đồng bộ lựa chọn từ tab khác. @param {StorageEvent} event Thay đổi storage. @returns {void} */
  function handleStorageChange(event) {
    if (event.key === storageKey || event.key === null) {
      preference = readPreference();
      applyTheme();
    }
  }
})();
