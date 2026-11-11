/**
 * @file topic-detail.js
 * @description Trực quan hóa Lộ trình nghiên cứu dạng Sơ đồ tư duy (Interactive Mind Map)
 * Chuẩn NotebookLM:
 * - Khởi đầu hiển thị gọn (Chủ đề & Trụ cột).
 * - Bấm vào node cha để xổ ra các node con kế cận, tiếp tục lần lượt tới node lá.
 * - Vẽ đường cong Bezier và mũi tên chỉ rõ hướng phân nhánh.
 * - Tự động tính độ rộng cột động, chống đè chữ 100%.
 * - 100% Vanilla JS chuẩn môn học IE104.
 */

'use strict';

/**
 * Cấu hình thông số Mind Map
 */
const CONFIG = {
  DATA_URL: '../../data/research-data.json',
  DEFAULT_TOPIC_NAME: 'Phát hiện tấn công mạng bằng học sâu',
  DEFAULT_LECTURER_EMAIL: 'camnt@uit.edu.vn',

  // Khoảng cách hình học thoáng đãng, chống đè 100%
  MIN_COL_GAP: 85,       // Khoảng cách an toàn giữa các cột (tăng để đường cong thoáng)
  NODE_MARGIN_Y: 28,     // Khoảng cách đệm giữa 2 hàng nhánh (tăng để chống đè dọc)
  START_X: 45,           // Tọa độ bắt đầu của Root
  MIN_ZOOM: 0.35,
  MAX_ZOOM: 2.2,
  ZOOM_STEP: 0.2
};

/**
 * Trạng thái toàn cục của ứng dụng
 */
const state = {
  researchData: null,
  currentTopic: null,
  currentGroup: null,
  rootNode: null,
  selectedNode: null,

  // Canvas Pan & Zoom
  panX: 40,
  panY: 80,
  scale: 1,
  isDragging: false,
  dragStartX: 0,
  dragStartY: 0,
  activeView: 'mindmap'
};

document.addEventListener('DOMContentLoaded', () => {
  initTopicDetailPage();
});

/**
 * Khởi tạo toàn bộ trang chi tiết
 */
async function initTopicDetailPage() {
  try {
    // 1. Tải dữ liệu JSON
    state.researchData = await fetchResearchData(CONFIG.DATA_URL);
    if (!state.researchData || !state.researchData.groups) {
      throw new Error('Dữ liệu JSON không đúng định dạng.');
    }

    // 2. Tìm chủ đề từ URL query params
    const params = parseUrlParams();
    const found = findTopic(state.researchData, params);

    if (!found || !found.topic) {
      renderTopicNotFound(params.topicName || 'Không tìm thấy');
      return;
    }

    state.currentTopic = found.topic;
    state.currentGroup = found.group;

    // 3. Render Header, meta và thanh chọn nhanh
    renderHeaderInfo(state.currentTopic, state.currentGroup);
    renderQuickTopicSwitcher(state.researchData, state.currentTopic);

    // 4. Xây dựng cây phân cấp (mặc định các nhánh con cháu thu gọn để mở từng bước)
    buildMindMapTree(state.currentTopic);
    initCanvasViewport();
    initToolbarControls();
    initDrawerEvents();

    // 5. Render Sơ đồ tư duy & Danh sách thẻ
    renderMindMap();
    renderCardsView(state.currentTopic);

    // 6. Căn giữa khung nhìn ban đầu
    setTimeout(() => {
      fitToScreen();
    }, 150);

  } catch (err) {
    console.error('[TopicDetail] Lỗi:', err);
    renderErrorMessage('Không thể tải dữ liệu chủ đề. Vui lòng thử lại sau.');
  }
}

/**
 * Tải file JSON nghiên cứu
 */
async function fetchResearchData(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} tại ${url}`);
  return await res.json();
}

/**
 * Đọc tham số URL
 */
function parseUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    topicName: params.get('topic') || params.get('name'),
    lecturerName: params.get('lecturer'),
    email: params.get('email')
  };
}

/**
 * Tìm kiếm chủ đề trong cơ sở dữ liệu
 */
function findTopic(data, query) {
  const clean = (s) => (s ? s.trim().toLowerCase() : '');
  const searchName = clean(query.topicName);
  const searchEmail = clean(query.email);
  const searchLecturer = clean(query.lecturerName);

  let fallback = null;

  for (const g of data.groups) {
    for (const t of g.topics) {
      const tName = clean(t.name);
      const tEmail = clean(t.lecturer ? t.lecturer.email : '');
      const tLecturer = clean(t.lecturer ? t.lecturer.name : '');

      if (tName === clean(CONFIG.DEFAULT_TOPIC_NAME) && tEmail === clean(CONFIG.DEFAULT_LECTURER_EMAIL)) {
        fallback = { topic: t, group: g.group };
      }

      if (searchName && searchEmail && tName === searchName && tEmail === searchEmail) {
        return { topic: t, group: g.group };
      }
      if (searchName && searchLecturer && tName === searchName && tLecturer === searchLecturer) {
        return { topic: t, group: g.group };
      }
      if (searchName && tName === searchName) {
        return { topic: t, group: g.group };
      }
    }
  }

  if (fallback) return fallback;
  if (data.groups.length > 0 && data.groups[0].topics.length > 0) {
    return { topic: data.groups[0].topics[0], group: data.groups[0].group };
  }
  return null;
}

/**
 * Render thông tin header đề tài
 */
function renderHeaderInfo(topic, group) {
  document.title = `${topic.name} | Chi tiết chủ đề - IE104`;

  const elBreadcrumb = document.getElementById('breadcrumb-current');
  if (elBreadcrumb) elBreadcrumb.textContent = topic.name;

  const elGroupBadge = document.getElementById('topic-group-badge');
  if (elGroupBadge) elGroupBadge.textContent = `Lĩnh vực: ${group.name || 'An toàn thông tin'}`;

  const elTitle = document.getElementById('topic-title');
  if (elTitle) elTitle.textContent = topic.name;

  const elLecturer = document.getElementById('topic-lecturer-link');
  if (elLecturer && topic.lecturer) {
    elLecturer.textContent = `${topic.lecturer.name} →`;
    elLecturer.href = `../../lecturers/detail/index.html?email=${encodeURIComponent(topic.lecturer.email)}`;
  }

  const elEmail = document.getElementById('topic-email-link');
  if (elEmail && topic.lecturer) {
    elEmail.textContent = topic.lecturer.email;
    elEmail.href = `mailto:${topic.lecturer.email}`;
  }

  const elIntro = document.getElementById('topic-intro-text');
  if (elIntro) {
    elIntro.textContent = `Nghiên cứu định hướng chuyên sâu về đề tài "${topic.name}", được hướng dẫn bởi ${topic.lecturer ? topic.lecturer.name : 'Giảng viên'}. Bạn có thể nhấp trực tiếp vào từng node để mở dần lộ trình các kiến thức nền tảng tương ứng.`;
  }

  const elActionLecturer = document.getElementById('btn-action-lecturer');
  if (elActionLecturer && topic.lecturer) {
    elActionLecturer.href = `../../lecturers/detail/index.html?email=${encodeURIComponent(topic.lecturer.email)}`;
  }
}

/**
 * Thanh chọn nhanh giữa 37 chủ đề
 */
function renderQuickTopicSwitcher(data, currentTopic) {
  const container = document.getElementById('topic-switcher-container');
  if (!container) return;

  container.innerHTML = '';

  const label = document.createElement('label');
  label.setAttribute('for', 'topic-select-dropdown');
  label.className = 'topic-switcher__label';
  label.textContent = '🚀 Chọn nhanh chủ đề nghiên cứu:';

  const select = document.createElement('select');
  select.id = 'topic-select-dropdown';
  select.className = 'topic-switcher__select';

  data.groups.forEach(g => {
    const optgroup = document.createElement('optgroup');
    optgroup.label = `[${g.group.name}]`;

    g.topics.forEach(t => {
      const opt = document.createElement('option');
      opt.value = `?topic=${encodeURIComponent(t.name)}&lecturer=${encodeURIComponent(t.lecturer.name)}&email=${encodeURIComponent(t.lecturer.email)}`;
      opt.textContent = `${t.name} — ${t.lecturer.name}`;

      if (t.name === currentTopic.name && t.lecturer.email === currentTopic.lecturer.email) {
        opt.selected = true;
      }
      optgroup.appendChild(opt);
    });

    select.appendChild(optgroup);
  });

  select.addEventListener('change', (e) => {
    if (e.target.value) {
      window.location.search = e.target.value;
    }
  });

  container.appendChild(label);
  container.appendChild(select);
}

/* ==========================================================================
   MIND MAP ENGINE - NOTEBOOK LM STYLE
   ========================================================================== */

/**
 * Xây dựng cây đối tượng Mind Map:
 * - Root mở sẵn (collapsed = false) để người dùng thấy ngay các Trụ cột chính.
 * - Tất cả các nút con từ Trụ cột trở đi khởi đầu đều THU GỌN (collapsed = true)
 *   để người dùng bấm vào node cha thì mới xổ ra node con kế cận!
 */
function buildMindMapTree(topic) {
  let nodeIdCounter = 1;

  state.rootNode = {
    id: 'node_root',
    name: topic.name,
    depth: 0,
    isRoot: true,
    collapsed: false, // Root luôn mở để hiện các Trụ cột
    outcome: `Mục tiêu tổng quát của đề tài nghiên cứu "${topic.name}".`,
    subjects: ['Đề tài Nghiên cứu Khoa học'],
    children: []
  };

  function convertKeyword(kw, depth, parentNode) {
    const node = {
      id: `node_${nodeIdCounter++}`,
      name: kw.name,
      depth: depth,
      isRoot: false,
      outcome: kw.outcome || 'Hiểu rõ khái niệm và phương pháp triển khai.',
      subjects: Array.isArray(kw.subjects) ? kw.subjects : [],
      collapsed: true, // MẶC ĐỊNH THU GỌN: Nhấn vào mới xổ ra con kế cận!
      parent: parentNode,
      children: []
    };

    if (Array.isArray(kw.children) && kw.children.length > 0) {
      kw.children.forEach(childKw => {
        node.children.push(convertKeyword(childKw, depth + 1, node));
      });
    }

    return node;
  }

  if (Array.isArray(topic.keywords)) {
    topic.keywords.forEach(kw => {
      state.rootNode.children.push(convertKeyword(kw, 1, state.rootNode));
    });
  }
}

/**
 * Thu thập danh sách các node đang hiển thị và liên kết cha-con
 */
function getVisibleNodesAndLinks() {
  const visibleNodes = [];
  const links = [];

  function traverse(node) {
    visibleNodes.push(node);
    if (!node.collapsed && node.children && node.children.length > 0) {
      node.children.forEach(child => {
        links.push({ parent: node, child: child });
        traverse(child);
      });
    }
  }

  traverse(state.rootNode);
  return { visibleNodes, links };
}

/**
 * Render toàn bộ Mind Map với mũi tên và vị trí chống đè 100% chuẩn NotebookLM
 */
function renderMindMap() {
  const nodesLayer = document.getElementById('mindmap-nodes');
  const svgLayer = document.getElementById('mindmap-svg');
  if (!nodesLayer || !svgLayer) return;

  nodesLayer.innerHTML = '';
  
  // Giữ lại defs và xóa các đường link cũ
  let linksGroup = document.getElementById('mindmap-links-group');
  if (!linksGroup) {
    linksGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    linksGroup.id = 'mindmap-links-group';
    svgLayer.appendChild(linksGroup);
  }
  linksGroup.innerHTML = '';

  // Đảm bảo defs chứa đầu mũi tên luôn sẵn sàng
  ensureSvgDefs(svgLayer);

  const { visibleNodes, links } = getVisibleNodesAndLinks();

  // 1. Render tất cả các node vào DOM trước để lấy kích thước thật của chữ sau khi wrap
  visibleNodes.forEach(node => {
    const el = createNodeDomElement(node);
    nodesLayer.appendChild(el);
    node.domElement = el;
  });

  // 2. Chờ DOM tính toán kích thước thực tế
  requestAnimationFrame(() => {
    // Đo kích thước từng node thực tế
    visibleNodes.forEach(node => {
      const el = node.domElement;
      if (el) {
        node.width = el.offsetWidth || 180;
        node.height = el.offsetHeight || 42;
      } else {
        node.width = 180;
        node.height = 42;
      }
    });

    // 3. Tính toán vị trí X theo độ rộng động của từng cột (Dynamic Column X)
    const depthMaxRight = {};
    const maxDepth = Math.max(...visibleNodes.map(n => n.depth));

    // Khởi tạo cột 0 (Root)
    state.rootNode.x = CONFIG.START_X;
    depthMaxRight[0] = state.rootNode.x + state.rootNode.width;

    for (let d = 1; d <= maxDepth; d++) {
      const prevRight = depthMaxRight[d - 1] || 250;
      const colX = prevRight + CONFIG.MIN_COL_GAP;
      
      let colMaxRight = colX;
      visibleNodes.filter(n => n.depth === d).forEach(n => {
        n.x = colX;
        colMaxRight = Math.max(colMaxRight, n.x + n.width);
      });

      depthMaxRight[d] = colMaxRight;
    }

    // 4. Tính toán vị trí Y theo cây phân cấp chống chồng lấn 100%
    const GAP_Y = CONFIG.NODE_MARGIN_Y;

    // Bước 4.1: Tính khoảng không gian chiều dọc (span) cần thiết cho từng cây con
    function computeSubtreeSpan(node) {
      if (!node.children || node.children.length === 0 || node.collapsed) {
        node.span = node.height + GAP_Y;
        return node.span;
      }
      let childrenSpan = 0;
      node.children.forEach(c => {
        childrenSpan += computeSubtreeSpan(c);
      });
      // Khoảng không gian của cây con ít nhất phải bằng chiều cao của chính node cha + đệm
      node.span = Math.max(childrenSpan, node.height + GAP_Y);
      return node.span;
    }
    computeSubtreeSpan(state.rootNode);

    // Bước 4.2: Gán tọa độ Y theo phân bổ không gian span
    function assignY(node, startY) {
      if (!node.children || node.children.length === 0 || node.collapsed) {
        node.y = startY + node.span / 2;
      } else {
        let curY = startY;
        node.children.forEach(c => {
          assignY(c, curY);
          curY += c.span;
        });
        const firstChild = node.children[0];
        const lastChild = node.children[node.children.length - 1];
        node.y = (firstChild.y + lastChild.y) / 2;
      }
    }
    assignY(state.rootNode, 45);

    // Bước 4.3: Quét kiểm tra va chạm trên từng cột (Depth) và đẩy dồn nhánh dưới nếu có chạm
    for (let d = 0; d <= maxDepth; d++) {
      const colNodes = visibleNodes.filter(n => n.depth === d).sort((a, b) => a.y - b.y);
      for (let i = 1; i < colNodes.length; i++) {
        const prev = colNodes[i - 1];
        const curr = colNodes[i];
        const prevBottom = prev.y + prev.height / 2;
        const currTop = curr.y - curr.height / 2;
        const overlap = prevBottom + GAP_Y - currTop;
        if (overlap > 0) {
          function shiftSubtree(n, dy) {
            n.y += dy;
            if (!n.collapsed && n.children) {
              n.children.forEach(c => shiftSubtree(c, dy));
            }
          }
          shiftSubtree(curr, overlap);
        }
      }
    }

    // Bước 4.4: Căn giữa lại các node cha theo trung điểm các con
    function reCenterParents(node) {
      if (node.children && node.children.length > 0 && !node.collapsed) {
        node.children.forEach(c => reCenterParents(c));
        const firstChild = node.children[0];
        const lastChild = node.children[node.children.length - 1];
        node.y = (firstChild.y + lastChild.y) / 2;
      }
    }
    reCenterParents(state.rootNode);

    // 5. Cập nhật vị trí tuyệt đối cho từng phần tử Node DOM
    visibleNodes.forEach(node => {
      const el = node.domElement;
      if (!el) return;
      el.style.left = `${node.x}px`;
      el.style.top = `${node.y - node.height / 2}px`;
    });

    // 6. Cập nhật kích thước SVG Canvas
    const maxY = Math.max(...visibleNodes.map(n => n.y + n.height / 2));
    const totalSvgWidth = (depthMaxRight[maxDepth] || 600) + 160;
    const totalSvgHeight = Math.max(maxY + 100, 560);
    svgLayer.setAttribute('width', totalSvgWidth);
    svgLayer.setAttribute('height', totalSvgHeight);
    svgLayer.style.width = `${totalSvgWidth}px`;
    svgLayer.style.height = `${totalSvgHeight}px`;
    svgLayer.style.maxWidth = 'none';
    svgLayer.style.maxHeight = 'none';

    // 7. Vẽ các đường cong Bezier và gắn đầu MŨI TÊN (Marker)
    links.forEach(link => {
      const p = link.parent;
      const c = link.child;
      if (!p || !c) return;

      // Điểm bắt đầu: mép phải giữa node cha
      const startX = p.x + p.width;
      const startY = p.y;

      // Điểm kết thúc: mép trái giữa node con (chạm nhẹ vào mép thẻ)
      const endX = c.x - 2;
      const endY = c.y;

      // Điểm uốn cong Bezier mượt mà kiểu NotebookLM
      const dx = endX - startX;
      const cx1 = startX + dx * 0.46;
      const cx2 = endX - dx * 0.46;

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M ${startX} ${startY} C ${cx1} ${startY}, ${cx2} ${endY}, ${endX} ${endY}`);
      path.setAttribute('class', 'mindmap-curve');
      path.setAttribute('marker-end', 'url(#mindmap-arrow)');
      path.setAttribute('data-parent', p.id);
      path.setAttribute('data-child', c.id);

      linksGroup.appendChild(path);
    });
  });
}

/**
 * Đảm bảo SVG có chứa định nghĩa đầu mũi tên (Marker)
 */
function ensureSvgDefs(svgLayer) {
  let defs = svgLayer.querySelector('defs');
  if (!defs) {
    defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    svgLayer.insertBefore(defs, svgLayer.firstChild);
  }

  let marker = svgLayer.querySelector('#mindmap-arrow');
  if (!marker) {
    marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    marker.setAttribute('id', 'mindmap-arrow');
    marker.setAttribute('viewBox', '0 0 10 10');
    marker.setAttribute('refX', '8');
    marker.setAttribute('refY', '5');
    marker.setAttribute('markerWidth', '8');
    marker.setAttribute('markerHeight', '8');
    marker.setAttribute('orient', 'auto');

    const arrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    arrowPath.setAttribute('d', 'M 0 1.5 L 8 5 L 0 8.5 z');
    arrowPath.setAttribute('fill', '#3b82f6');

    marker.appendChild(arrowPath);
    defs.appendChild(marker);
  }
}

/**
 * Tạo phần tử DOM dạng viên thuốc (Pill) cho từng Node
 */
function createNodeDomElement(node) {
  const el = document.createElement('div');
  el.className = 'mindmap-node';
  el.id = node.id;
  el.tabIndex = 0;

  // Gắn class phân cấp màu sắc
  if (node.isRoot) {
    el.classList.add('mindmap-node--root');
  } else if (node.depth === 1) {
    el.classList.add('mindmap-node--pillar');
  } else if (!node.children || node.children.length === 0) {
    el.classList.add('mindmap-node--leaf');
  } else {
    el.classList.add('mindmap-node--intermediate');
  }

  if (state.selectedNode && state.selectedNode.id === node.id) {
    el.classList.add('mindmap-node--selected');
  }

  // Tên node
  const textSpan = document.createElement('span');
  textSpan.className = 'mindmap-node__text';
  textSpan.textContent = node.name;
  el.appendChild(textSpan);

  // Nếu có con -> Thêm nút tròn chỉ thị và số lượng con (+ / -)
  const hasChildren = node.children && node.children.length > 0;
  if (hasChildren) {
    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'mindmap-node__toggle';
    toggleBtn.title = node.collapsed ? `Mở rộng ${node.children.length} nhánh con kế cận (+)` : 'Thu gọn các nhánh con (−)';
    // Khi đang thu gọn: hiện icon mở rộng (+); khi đã mở: hiện icon thu gọn (−)
    toggleBtn.innerHTML = node.collapsed ? `+` : `&minus;`;

    // CHỈ KHI USER CLICK VÀO DẤU (+) HOẶC (-) MỚI THU GỌN / MỞ RỘNG ROADMAP
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleNode(node);
    });

    el.appendChild(toggleBtn);
  }

  // KHI USER CLICK VÀO THẺ: CHỈ HIỆN THÔNG TIN CHI TIẾT TRONG DRAWER, KHÔNG ĐỔI TRẠNG THÁI MỞ/ĐÓNG
  el.addEventListener('click', () => {
    selectNode(node);
  });

  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectNode(node);
    }
  });

  return el;
}

/**
 * Đảo trạng thái mở/thu gọn của node và re-render Mind Map
 */
function toggleNode(node) {
  node.collapsed = !node.collapsed;
  renderMindMap();
}

/**
 * Chọn node và hiển thị thông tin vào Drawer trượt ra từ bên phải
 */
function selectNode(node) {
  state.selectedNode = node;

  document.querySelectorAll('.mindmap-node').forEach(el => {
    el.classList.remove('mindmap-node--selected');
  });
  if (node.domElement) {
    node.domElement.classList.add('mindmap-node--selected');
  }

  const drawer = document.getElementById('mindmap-drawer');
  const drawerTitle = document.getElementById('drawer-title');
  const drawerBadge = document.getElementById('drawer-badge');
  const drawerOutcome = document.getElementById('drawer-outcome');
  const drawerSubjects = document.getElementById('drawer-subjects');
  const drawerSubjectsSection = document.getElementById('drawer-subjects-section');
  const drawerPrereqs = document.getElementById('drawer-prereqs');
  const drawerPrereqsSection = document.getElementById('drawer-prereqs-section');

  if (!drawer) return;

  drawerTitle.textContent = node.name;
  drawerOutcome.textContent = node.outcome || 'Hiểu rõ khái niệm và phương pháp triển khai.';

  if (node.isRoot) {
    drawerBadge.className = 'badge badge--primary';
    drawerBadge.textContent = '🎯 MỤC TIÊU ĐỀ TÀI';
  } else if (node.depth === 1) {
    drawerBadge.className = 'badge badge--primary';
    drawerBadge.textContent = '🏛️ TRỤ CỘT ĐỀ TÀI';
  } else if (!node.children || node.children.length === 0) {
    drawerBadge.className = 'badge badge--success';
    drawerBadge.textContent = '🌱 NỀN TẢNG TIÊN QUYẾT (XUẤT PHÁT)';
  } else {
    drawerBadge.className = 'badge badge--purple';
    drawerBadge.textContent = '🔷 KIẾN THỨC CƠ SỞ';
  }

  if (Array.isArray(node.subjects) && node.subjects.length > 0) {
    drawerSubjectsSection.style.display = 'block';
    drawerSubjects.innerHTML = node.subjects.map(s => `<span class="badge badge--warning">${escapeHtml(s)}</span>`).join(' ');
  } else {
    drawerSubjectsSection.style.display = 'none';
  }

  if (Array.isArray(node.children) && node.children.length > 0) {
    drawerPrereqsSection.style.display = 'block';
    drawerPrereqs.innerHTML = node.children.map(c => `<li><strong>${escapeHtml(c.name)}</strong>: ${escapeHtml(c.outcome)}</li>`).join('');
  } else {
    drawerPrereqsSection.style.display = 'none';
  }

  drawer.hidden = false;
  drawer.classList.add('mindmap-drawer--open');
}

/**
 * Đóng Drawer
 */
function initDrawerEvents() {
  const closeBtn = document.getElementById('drawer-close');
  const drawer = document.getElementById('mindmap-drawer');
  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('mindmap-drawer--open');
      drawer.hidden = true;
      if (state.selectedNode && state.selectedNode.domElement) {
        state.selectedNode.domElement.classList.remove('mindmap-node--selected');
      }
      state.selectedNode = null;
    });
  }
}

/* ==========================================================================
   CANVAS PAN & ZOOM CONTROLLER
   ========================================================================== */

function initCanvasViewport() {
  const viewport = document.getElementById('mindmap-viewport');
  const stage = document.getElementById('mindmap-stage');
  if (!viewport || !stage) return;

  viewport.addEventListener('mousedown', (e) => {
    if (e.target.closest('.mindmap-node') || e.target.closest('.mindmap-drawer')) return;

    state.isDragging = true;
    state.dragStartX = e.clientX - state.panX;
    state.dragStartY = e.clientY - state.panY;
    viewport.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', (e) => {
    if (!state.isDragging) return;
    state.panX = e.clientX - state.dragStartX;
    state.panY = e.clientY - state.dragStartY;
    applyTransform();
  });

  window.addEventListener('mouseup', () => {
    if (state.isDragging) {
      state.isDragging = false;
      viewport.style.cursor = 'grab';
    }
  });

  viewport.addEventListener('wheel', (e) => {
    e.preventDefault();
    // Giảm độ nhạy cuộn chuột / trackpad: chỉ thay đổi ~3.5% mỗi nấc cuộn để thao tác mượt mà
    const delta = Math.sign(e.deltaY);
    const zoomFactor = delta < 0 ? 1.035 : 0.965;
    const newScale = Math.min(Math.max(state.scale * zoomFactor, CONFIG.MIN_ZOOM), CONFIG.MAX_ZOOM);

    const rect = viewport.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    state.panX = mouseX - (mouseX - state.panX) * (newScale / state.scale);
    state.panY = mouseY - (mouseY - state.panY) * (newScale / state.scale);
    state.scale = newScale;

    applyTransform();
  }, { passive: false });
}

function applyTransform() {
  const stage = document.getElementById('mindmap-stage');
  if (stage) {
    stage.style.transform = `translate(${state.panX}px, ${state.panY}px) scale(${state.scale})`;
  }
}

/**
 * Tự động căn vừa khung nhìn
 */
function fitToScreen() {
  const viewport = document.getElementById('mindmap-viewport');
  const svg = document.getElementById('mindmap-svg');
  if (!viewport || !svg) return;

  const vpWidth = viewport.clientWidth;
  const vpHeight = viewport.clientHeight;
  const contentWidth = parseFloat(svg.getAttribute('width')) || 650;
  const contentHeight = parseFloat(svg.getAttribute('height')) || 400;

  const scaleX = (vpWidth - 80) / contentWidth;
  const scaleY = (vpHeight - 80) / contentHeight;
  const fitScale = Math.min(Math.min(scaleX, scaleY), 1.0);

  state.scale = Math.min(Math.max(fitScale, 0.75), 1.0);
  state.panX = 60;
  state.panY = Math.max((vpHeight - contentHeight * state.scale) / 2, 40);

  applyTransform();
}

/**
 * Khởi tạo các nút công cụ Toolbar
 */
function initToolbarControls() {
  const btnZoomIn = document.getElementById('btn-zoom-in');
  if (btnZoomIn) {
    btnZoomIn.addEventListener('click', () => {
      state.scale = Math.min(state.scale + CONFIG.ZOOM_STEP, CONFIG.MAX_ZOOM);
      applyTransform();
    });
  }

  const btnZoomOut = document.getElementById('btn-zoom-out');
  if (btnZoomOut) {
    btnZoomOut.addEventListener('click', () => {
      state.scale = Math.max(state.scale - CONFIG.ZOOM_STEP, CONFIG.MIN_ZOOM);
      applyTransform();
    });
  }

  const btnZoomReset = document.getElementById('btn-zoom-reset');
  if (btnZoomReset) {
    btnZoomReset.addEventListener('click', fitToScreen);
  }

  const btnFullscreen = document.getElementById('btn-fullscreen');
  const component = document.querySelector('.mindmap-component');
  if (btnFullscreen && component) {
    btnFullscreen.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        component.requestFullscreen().catch(err => console.log(err));
      } else {
        document.exitFullscreen().catch(err => console.log(err));
      }
    });
  }

  const btnViewMindmap = document.getElementById('btn-view-mindmap');
  const btnViewCards = document.getElementById('btn-view-cards');
  const viewportMindmap = document.getElementById('mindmap-viewport');
  const viewportCards = document.getElementById('cards-viewport');
  const controls = document.getElementById('mindmap-controls');

  if (btnViewMindmap && btnViewCards) {
    btnViewMindmap.addEventListener('click', () => {
      btnViewMindmap.classList.add('mindmap-view-btn--active');
      btnViewMindmap.setAttribute('aria-selected', 'true');
      btnViewCards.classList.remove('mindmap-view-btn--active');
      btnViewCards.setAttribute('aria-selected', 'false');

      viewportMindmap.hidden = false;
      viewportCards.hidden = true;
      if (controls) controls.style.display = 'flex';
      fitToScreen();
    });

    btnViewCards.addEventListener('click', () => {
      btnViewCards.classList.add('mindmap-view-btn--active');
      btnViewCards.setAttribute('aria-selected', 'true');
      btnViewMindmap.classList.remove('mindmap-view-btn--active');
      btnViewMindmap.setAttribute('aria-selected', 'false');

      viewportMindmap.hidden = true;
      viewportCards.hidden = false;
      if (controls) controls.style.display = 'none';
    });
  }
}

/* ==========================================================================
   CARDS VIEW (Chế độ danh sách thẻ phân cấp tối ưu di động)
   ========================================================================== */

function renderCardsView(topic) {
  const container = document.getElementById('roadmap-pillars-grid');
  if (!container) return;

  container.innerHTML = '';
  if (!topic.keywords || topic.keywords.length === 0) return;

  topic.keywords.forEach((kw, index) => {
    const card = document.createElement('div');
    card.className = 'roadmap-pillar';

    const label = document.createElement('div');
    label.className = 'roadmap-pillar__label';
    label.textContent = `Trụ cột ${index + 1}: ${kw.name}`;
    card.appendChild(label);

    const tree = document.createElement('div');
    tree.className = 'roadmap-tree';

    const nodeEl = createCardNodeRecursive(kw, 0);
    tree.appendChild(nodeEl);

    card.appendChild(tree);
    container.appendChild(card);
  });
}

function createCardNodeRecursive(kw, depth) {
  const details = document.createElement('details');
  details.className = 'roadmap-node';
  details.open = true;

  const isPillar = depth === 0;
  const isLeaf = !kw.children || kw.children.length === 0;

  if (isPillar) details.classList.add('roadmap-node--pillar');
  else if (isLeaf) details.classList.add('roadmap-node--leaf');
  else details.classList.add('roadmap-node--intermediate');

  const summary = document.createElement('summary');
  summary.className = 'roadmap-node__summary';

  const badge = document.createElement('span');
  badge.className = 'roadmap-node__badge badge';
  if (isPillar) {
    badge.classList.add('badge--primary');
    badge.textContent = '🏛️ TRỤ CỘT ĐỀ TÀI';
  } else if (isLeaf) {
    badge.classList.add('badge--success');
    badge.textContent = '🌱 NỀN TẢNG TIÊN QUYẾT';
  } else {
    badge.classList.add('badge--purple');
    badge.textContent = '🔷 KIẾN THỨC CƠ SỞ';
  }

  const h = document.createElement(`h${Math.min(3 + depth, 6)}`);
  h.className = 'roadmap-node__name';
  h.textContent = kw.name;

  const icon = document.createElement('span');
  icon.className = 'roadmap-node__toggle-icon';
  icon.setAttribute('aria-hidden', 'true');

  summary.appendChild(badge);
  summary.appendChild(h);
  summary.appendChild(icon);
  details.appendChild(summary);

  const content = document.createElement('div');
  content.className = 'roadmap-node__content';

  const p = document.createElement('p');
  p.className = 'roadmap-node__outcome';
  p.innerHTML = `<strong>Mục tiêu:</strong> ${escapeHtml(kw.outcome || '')}`;
  content.appendChild(p);

  if (Array.isArray(kw.subjects) && kw.subjects.length > 0) {
    const subDiv = document.createElement('div');
    subDiv.className = 'roadmap-node__subjects';
    subDiv.innerHTML = `<span class="roadmap-node__subjects-label">📚 Môn học:</span> ` +
      kw.subjects.map(s => `<span class="badge badge--warning">${escapeHtml(s)}</span>`).join(' ');
    content.appendChild(subDiv);
  }

  if (kw.children && kw.children.length > 0) {
    const branch = document.createElement('div');
    branch.className = 'roadmap-branch';
    branch.innerHTML = `<div class="roadmap-branch__connector"><span class="roadmap-branch__arrow">&uarr;</span> Tiên quyết cần học trước:</div>`;
    kw.children.forEach(c => branch.appendChild(createCardNodeRecursive(c, depth + 1)));
    content.appendChild(branch);
  }

  details.appendChild(content);
  return details;
}

function renderTopicNotFound(query) {
  const main = document.getElementById('main-content');
  if (main) {
    main.innerHTML = `
      <div class="container" style="padding: 4rem 1rem; text-align: center;">
        <h1 style="font-size: 2rem; margin-bottom: 1rem;">Không tìm thấy chủ đề</h1>
        <p style="color: var(--color-muted); margin-bottom: 2rem;">Chủ đề "${escapeHtml(query)}" không có trong cơ sở dữ liệu.</p>
        <a href="../index.html" class="btn btn--primary">&larr; Quay lại danh sách khám phá</a>
      </div>
    `;
  }
}

function renderErrorMessage(msg) {
  const main = document.getElementById('main-content');
  if (main) {
    main.innerHTML = `
      <div class="container" style="padding: 4rem 1rem; text-align: center;">
        <h2 style="color: #ef4444; margin-bottom: 1rem;">Đã xảy ra lỗi</h2>
        <p style="color: var(--color-muted); margin-bottom: 2rem;">${escapeHtml(msg)}</p>
        <a href="../index.html" class="btn btn--primary">&larr; Quay lại danh sách khám phá</a>
      </div>
    `;
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
