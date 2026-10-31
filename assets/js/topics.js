/**
 * @file topics.js
 * @description Logic tải danh sách chủ đề và lọc/tìm kiếm cho trang Khám phá (TV1)
 * Kết nối luồng sang trang chi tiết (TV2).
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initTopicsPage();
});

let allTopics = [];

async function initTopicsPage() {
  const container = document.getElementById('topics-grid');
  const countEl = document.getElementById('topics-count');
  const searchInput = document.getElementById('topics-search-input');
  const groupSelect = document.getElementById('topics-group-select');
  const emptyState = document.getElementById('topics-empty-state');

  try {
    const res = await fetch('../data/research-data.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    // Làm phẳng danh sách 37 chủ đề kèm thông tin nhóm
    allTopics = [];
    data.groups.forEach(g => {
      g.topics.forEach(t => {
        allTopics.push({
          ...t,
          groupId: g.group.id,
          groupName: g.group.name
        });
      });
    });

    renderTopics(allTopics);

    // Xử lý sự kiện tìm kiếm và lọc
    function handleFilter() {
      const keyword = (searchInput.value || '').trim().toLowerCase();
      const selectedGroup = groupSelect.value;

      const filtered = allTopics.filter(item => {
        const matchGroup = !selectedGroup || item.groupId === selectedGroup;
        const matchText = !keyword || 
          item.name.toLowerCase().includes(keyword) ||
          item.lecturer.name.toLowerCase().includes(keyword) ||
          (item.keywords && item.keywords.some(k => k.name.toLowerCase().includes(keyword)));
        return matchGroup && matchText;
      });

      renderTopics(filtered);
    }

    if (searchInput) searchInput.addEventListener('input', handleFilter);
    if (groupSelect) groupSelect.addEventListener('change', handleFilter);

  } catch (err) {
    console.error('[Topics] Lỗi tải dữ liệu:', err);
    if (container) {
      container.innerHTML = '<p class="error-msg">Không thể tải danh sách chủ đề. Vui lòng thử lại sau.</p>';
    }
  }

  function renderTopics(list) {
    if (!container) return;
    container.innerHTML = '';

    if (countEl) {
      countEl.textContent = `${list.length} chủ đề`;
    }

    if (list.length === 0) {
      if (emptyState) emptyState.hidden = false;
      return;
    }

    if (emptyState) emptyState.hidden = true;

    list.forEach(t => {
      const card = document.createElement('article');
      card.className = 'topic-card';

      // Tạo đường dẫn sang trang chi tiết của TV2 kèm tham số URL
      const detailUrl = `./detail/index.html?topic=${encodeURIComponent(t.name)}&lecturer=${encodeURIComponent(t.lecturer.name)}&email=${encodeURIComponent(t.lecturer.email)}`;

      // Badge nhóm
      let badgeClass = 'badge--primary';
      if (t.groupId === 'data') badgeClass = 'badge--warning';
      if (t.groupId === 'nlp') badgeClass = 'badge--purple';

      // Trụ cột keywords preview
      const kwPreview = (t.keywords || []).map(k => `<span class="topic-card__keyword-pill">${escapeHtml(k.name)}</span>`).join('');

      card.innerHTML = `
        <div class="topic-card__header">
          <span class="badge ${badgeClass}">${escapeHtml(t.groupName)}</span>
        </div>
        <h2 class="topic-card__title">
          <a href="${detailUrl}">${escapeHtml(t.name)}</a>
        </h2>
        <div class="topic-card__lecturer">
          <span class="topic-card__lecturer-icon">👨‍🏫</span>
          <div>
            <strong>${escapeHtml(t.lecturer.name)}</strong>
            <div class="topic-card__email">${escapeHtml(t.lecturer.email)}</div>
          </div>
        </div>
        <div class="topic-card__keywords">
          <div class="topic-card__keywords-title">Trụ cột kiến thức:</div>
          <div class="topic-card__pills">${kwPreview}</div>
        </div>
        <div class="topic-card__footer">
          <a href="${detailUrl}" class="btn btn--primary topic-card__btn">
            Xem lộ trình chi tiết &rarr;
          </a>
        </div>
      `;

      container.appendChild(card);
    });
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

