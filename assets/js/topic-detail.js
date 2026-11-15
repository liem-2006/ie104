import {
  loadResearch,
  readTopicQuery,
  findTopic as findDataTopic,
  topicUrl,
  lecturerUrl,
  element,
  renderPageMessage,
} from "./data.js";
/**
 * @file topic-detail.js
 * @description Trực quan hóa Lộ trình nghiên cứu dạng Sơ đồ tư duy (Interactive Mind Map)
 * - Khởi đầu hiển thị gọn (Chủ đề & Trụ cột).
 * - Bấm vào node cha để xổ ra các node con kế cận, tiếp tục lần lượt tới node lá.
 * - Vẽ đường cong Bezier và mũi tên chỉ rõ hướng phân nhánh.
 * - Tự động tính độ rộng cột động, tránh chồng chữ.
 * -  Vanilla JS chuẩn môn học IE104.
 */

/**
 * @typedef {object} Keyword
 * @property {string} name Tên kiến thức.
 * @property {string} outcome Đầu ra kiến thức kỳ vọng.
 * @property {string[]} [subjects] Môn học gợi ý.
 * @property {Keyword[]} [children] Kiến thức tiên quyết của keyword này.
 */
/**
 * @typedef {object} MapNode
 * @property {string} id Khóa runtime trong một cây, không ghi vào JSON.
 * @property {string} name Tên node.
 * @property {string} outcome Đầu ra kỳ vọng.
 * @property {string[]} subjects Môn học gợi ý.
 * @property {number} depth Độ sâu, gốc bằng 0.
 * @property {boolean} isRoot Có phải chủ đề gốc hay không.
 * @property {boolean} collapsed Trạng thái thu gọn các tiên quyết.
 * @property {MapNode[]} children Các tiên quyết con.
 * @property {MapNode} [parent] Node cần học sau node này.
 * @property {HTMLElement} [domElement] Thẻ biểu diễn node.
 * @property {number} [width] Chiều rộng đã đo.
 * @property {number} [height] Chiều cao đã đo.
 * @property {number} [x] Tọa độ mép trái.
 * @property {number} [y] Tọa độ tâm dọc.
 * @property {number} [span] Chiều cao dành cho cây con.
 */
/**
 * @typedef {object} MapLink
 * @property {MapNode} parent Kiến thức đích.
 * @property {MapNode} child Tiên quyết cần học trước đích.
 */

/**
 * Cấu hình thông số Mind Map
 */
const CONFIG = {
  // Khoảng cách hình học thoáng đãng, chống đè
  MIN_COL_GAP: 85, // Khoảng cách an toàn giữa các cột (tăng để đường cong thoáng)
  NODE_MARGIN_Y: 28, // Khoảng cách đệm giữa 2 hàng nhánh (tăng để chống đè dọc)
  START_X: 45, // Tọa độ bắt đầu của Root
  MIN_ZOOM: 0.02,
  MAX_ZOOM: 2.2,
  ZOOM_STEP: 0.2,
  DRAG_THRESHOLD: 6, // Ngưỡng dịch chuyển (px) để phân biệt chạm (tap) và kéo (pan)
};

/** Đường dẫn SVG cho hai trạng thái của nút Toàn màn hình */
const FULLSCREEN_ICONS = {
  ENTER: "M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z",
  EXIT: "M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z",
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
  activePointerId: null,
  pointerStartX: 0,
  pointerStartY: 0,
  dragOriginPanX: 0,
  dragOriginPanY: 0,
  dragThresholdMet: false,
  dragDirection: null,
  suppressClickUntil: 0,
  dragStartX: 0,
  dragStartY: 0,
  activeView: "mindmap",
  mapFrame: 0,
  renderVersion: 0,
  fitAfterRender: false,
  centerAfterRender: false,
  toggleFocusId: "",
  nodeBounds: null,
  canvasInitialized: false,
  initialScrollDone: false,
  userHasScrolled: false,
  isBackForward: false,
  lastViewportWidth: 0,
};

window.__topicDetailDebug = {
  state,
  trackInitialScrollIntent,
  scrollRoadmapIntoFirstScreen,
  cleanupInitialScrollListeners,
};

document.addEventListener("DOMContentLoaded", initTopicDetailPage);

/** Ghi nhận thao tác cuộn thủ công hoặc điều hướng lịch sử để không tự động cuộn đè.
 * @returns {void}
 */
function trackInitialScrollIntent() {
  const navEntry = performance.getEntriesByType?.("navigation")?.[0];
  if (navEntry && navEntry.type === "back_forward") {
    state.isBackForward = true;
    cleanupInitialScrollListeners();
    return;
  }

  window.addEventListener("wheel", onUserScrollIntent, { passive: true });
  window.addEventListener("touchmove", onUserScrollIntent, { passive: true });
  window.addEventListener("keydown", onUserKeydownIntent, { passive: true });
  window.addEventListener(
    "popstate",
    () => {
      state.isBackForward = true;
      cleanupInitialScrollListeners();
    },
    { once: true },
  );
}

/** Xử lý sự kiện cuộn bánh xe hoặc cử chỉ vuốt để đánh dấu ý định cuộn của người dùng.
 * @returns {void}
 */
function onUserScrollIntent() {
  state.userHasScrolled = true;
  cleanupInitialScrollListeners();
}

/** Xử lý phím bấm: chỉ đánh dấu khi nhận các phím cuộn trang (Arrow, Page, Home, End, Space).
 * Không gỡ listener khi gặp phím khác (như Tab, Shift) để đảm bảo không bỏ sót ý định cuộn.
 * @param {KeyboardEvent} e Sự kiện phím.
 * @returns {void}
 */
function onUserKeydownIntent(e) {
  const scrollKeys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"];
  const isSpace = e.key === " " || e.key === "Spacebar";
  const target = e.target;
  const isEditable =
    target &&
    (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

  if (scrollKeys.includes(e.key) || (isSpace && !isEditable)) {
    state.userHasScrolled = true;
    cleanupInitialScrollListeners();
  }
}

/** Dọn dẹp các listener theo dõi ý định cuộn ban đầu để tránh tích lũy.
 * @returns {void}
 */
function cleanupInitialScrollListeners() {
  window.removeEventListener("wheel", onUserScrollIntent);
  window.removeEventListener("touchmove", onUserScrollIntent);
  window.removeEventListener("keydown", onUserKeydownIntent);
}

/** Khởi tạo toàn bộ trang chi tiết
 * @returns {Promise<void>} Hoàn tất khởi tạo hoặc hiển thị lỗi.
 */

async function initTopicDetailPage() {
  state.lastViewportWidth = window.innerWidth;
  trackInitialScrollIntent();
  try {
    state.researchData = await loadResearch();
    const found = findDataTopic(state.researchData, readTopicQuery());
    if (!found) {
      renderTopicNotFound();
      return;
    }
    state.currentTopic = found.topic;
    state.currentGroup = found.group;
    renderHeaderInfo(found.topic, found.group);
    renderQuickTopicSwitcher(state.researchData, found.topic);
    buildMindMapTree(found.topic);
    initCanvasViewport();
    initToolbarControls();
    initDrawerEvents();
    renderCardsView(found.topic);
    // Mặc định mở chế độ Sơ đồ trên cả mobile và desktop theo yêu cầu mới
    setView("mindmap");
    renderMindMap(true);
  } catch (err) {
    console.error("Lỗi khởi tạo chi tiết chủ đề:", err);
    renderErrorMessage("Không thể tải dữ liệu chủ đề. Hãy tải lại trang để thử lại.");
  } finally {
    // Công bố nội dung theo một lần cập nhật, tránh xê dịch các placeholder khi JSON tới.
    document.getElementById("main-content").removeAttribute("aria-busy");
    document.getElementById("topic-load-status")?.remove();
  }
}

/** Hiển thị tiêu đề và liên kết giảng viên đúng chủ đề.
 * @param {object} topic Chủ đề nguồn.
 * @param {object} group Nhóm chủ đề.
 * @returns {void} Không trả về giá trị.
 */

function renderHeaderInfo(topic, group) {
  document.title = `${topic.name} | Chi tiết chủ đề - IE104`;

  const elBreadcrumb = document.getElementById("breadcrumb-current");
  if (elBreadcrumb) elBreadcrumb.textContent = topic.name;

  const elGroupBadge = document.getElementById("topic-group-badge");
  if (elGroupBadge) elGroupBadge.textContent = group.name;

  const elTitle = document.getElementById("topic-title");
  if (elTitle) elTitle.textContent = topic.name;

  const elLecturer = document.getElementById("topic-lecturer-link");
  if (elLecturer && topic.lecturer) {
    elLecturer.textContent = topic.lecturer.name;
    elLecturer.href = lecturerUrl(topic.lecturer.email);
  }

  const elEmail = document.getElementById("topic-email-link");
  if (elEmail && topic.lecturer) {
    elEmail.textContent = topic.lecturer.email;
    elEmail.href = `mailto:${topic.lecturer.email}`;
  }

  const elActionLecturer = document.getElementById("btn-action-lecturer");
  if (elActionLecturer && topic.lecturer) {
    elActionLecturer.href = lecturerUrl(topic.lecturer.email);
  }
}

/** Dựng bộ chọn chủ đề với URL đầy đủ.
 * @param {object} data Dữ liệu nghiên cứu gồm danh sách nhóm.
 * @param {object} currentTopic Chủ đề hiện tại để chọn đúng option.
 * @returns {void} Không trả về giá trị.
 */

function renderQuickTopicSwitcher(data, currentTopic) {
  const container = document.getElementById("topic-switcher-container");
  if (!container) return;

  container.replaceChildren();

  const label = document.createElement("label");
  label.setAttribute("for", "topic-select-dropdown");
  label.className = "topic-switcher__label";
  label.textContent = "Chuyển chủ đề";

  const select = document.createElement("select");
  select.id = "topic-select-dropdown";
  select.className = "topic-switcher__select";

  const fragment = document.createDocumentFragment();
  for (const entry of data.groups) {
    const optgroup = document.createElement("optgroup");
    optgroup.label = "[" + entry.group.name + "]";
    for (const topic of entry.topics) {
      const option = document.createElement("option");
      option.value = topicUrl(entry.group, topic);
      option.textContent = topic.name + " — " + topic.lecturer.name;
      option.selected =
        entry.group.id === state.currentGroup.id &&
        topic.name === currentTopic.name &&
        topic.lecturer.email === currentTopic.lecturer.email;
      optgroup.appendChild(option);
    }
    fragment.appendChild(optgroup);
  }
  select.appendChild(fragment);
  select.addEventListener("change", navigateToSelectedTopic);

  container.appendChild(label);
  container.appendChild(select);
}

/** Điều hướng bằng URL đầy đủ của option, reset trạng thái cây qua trang mới.
 * @param {Event} event Sự kiện thay đổi bộ chọn chủ đề.
 * @returns {void}
 */
function navigateToSelectedTopic(event) {
  if (event.target.value) window.location.assign(event.target.value);
}

/* ==========================================================================
   BỘ DỰNG CÂY TIÊN QUYẾT
   ========================================================================== */

/** Khởi tạo trạng thái cây, mở gốc và thu gọn các nhánh.
 * @param {object} topic Chủ đề nguồn.
 * @returns {void} Không trả về giá trị.
 */

function buildMindMapTree(topic) {
  let nodeIdCounter = 1;

  state.rootNode = {
    id: "node_root",
    name: topic.name,
    depth: 0,
    isRoot: true,
    collapsed: false, // Root luôn mở để hiện các Trụ cột
    outcome: `Mục tiêu tổng quát của đề tài nghiên cứu "${topic.name}".`,
    subjects: [],
    children: [],
  };

  /** Chuyển keyword nguồn thành node tương tác, giữ nguyên children.
   * @param {Keyword} kw Keyword nguồn.
   * @param {number} depth Độ sâu trong cây.
   * @param {MapNode} parentNode Node cần học sau keyword này.
   * @returns {MapNode} Node runtime có trạng thái mở/thu và liên kết cha.
   */
  function convertKeyword(kw, depth, parentNode) {
    const node = {
      id: `node_${nodeIdCounter++}`,
      name: kw.name,
      depth: depth,
      isRoot: false,
      outcome: kw.outcome || "",
      subjects: Array.isArray(kw.subjects) ? kw.subjects : [],
      collapsed: true, // MẶC ĐỊNH THU GỌN: Nhấn vào mới xổ ra con kế cận!
      parent: parentNode,
      children: [],
    };

    for (const child of kw.children || []) {
      node.children.push(convertKeyword(child, depth + 1, node));
    }

    return node;
  }

  for (const keyword of topic.keywords || []) {
    state.rootNode.children.push(convertKeyword(keyword, 1, state.rootNode));
  }
}

/** Thu thập các node đang mở và các đường nối.
 * @returns {{visibleNodes: MapNode[], links: MapLink[]}} Node và đường nối đang hiển thị.
 */

function getVisibleNodesAndLinks() {
  const visibleNodes = [];
  const links = [];

  /** Duyệt cây đang mở để thu thập node và liên kết.
   * @param {object} node Node kiến thức.
   * @returns {void} Không trả về giá trị.
   */
  function traverse(node) {
    visibleNodes.push(node);
    if (!node.collapsed && node.children && node.children.length > 0) {
      for (const child of node.children) {
        links.push({ parent: node, child });
        traverse(child);
      }
    }
  }

  traverse(state.rootNode);
  return { visibleNodes, links };
}

/** Gộp yêu cầu vẽ trong cùng khung hình; yêu cầu mới thay thế lượt cũ.
 * @param {boolean} [fit=false] Căn vừa sau khi đã biết kích thước SVG mới.
 * @param {string} [focusId=""] Khóa node cần trả focus sau khi dựng lại DOM.
 * @returns {void}
 */
function renderMindMap(fit = false, focusId = "") {
  state.fitAfterRender ||= fit;
  if (focusId) state.toggleFocusId = focusId;
  state.renderVersion++;
  cancelAnimationFrame(state.mapFrame);
  state.mapFrame = requestAnimationFrame(buildMapFrame);
}

/** Dựng DOM ở khung hình đầu, dành khung tiếp theo cho đọc kích thước.
 * @returns {void}
 */
function buildMapFrame() {
  const nodesLayer = document.getElementById("mindmap-nodes");
  const svgLayer = document.getElementById("mindmap-svg");
  if (!nodesLayer || !svgLayer || !state.rootNode) return;
  const version = state.renderVersion;
  const { visibleNodes, links } = getVisibleNodesAndLinks();
  mountMapNodes(nodesLayer, visibleNodes);
  const linksGroup = prepareLinksLayer(svgLayer);
  state.mapFrame = requestAnimationFrame(finishMapLayout);

  /** Chỉ hoàn thành lượt vẽ mới nhất, sau khi DOM có kích thước thật.
   * @returns {void}
   */
  function finishMapLayout() {
    if (version !== state.renderVersion) return;
    state.mapFrame = 0;
    measureMapNodes(visibleNodes);
    const columns = groupNodesByDepth(visibleNodes);
    const rightEdges = positionMapColumns(columns);
    positionMapRows(columns);
    applyNodePositions(visibleNodes);
    resizeMapCanvas(svgLayer, visibleNodes, rightEdges);
    drawMapLinks(linksGroup, links);
    finishMapInteraction();
  }
}

/** Khôi phục góc nhìn, căn giữa hoặc fit, trả focus và cuộn màn hình đầu sau khi bố cục xong.
 * @returns {void}
 */
function finishMapInteraction() {
  if (state.activeView === "mindmap") {
    if (state.fitAfterRender) {
      fitToScreen();
    } else if (state.centerAfterRender) {
      centerMapKeepScale();
    }
  }
  if (state.toggleFocusId && state.activeView === "mindmap") {
    document
      .getElementById(state.toggleFocusId)
      ?.querySelector("button")
      ?.focus({ preventScroll: true });
  }
  state.fitAfterRender = false;
  state.centerAfterRender = false;
  state.toggleFocusId = "";
  if (!state.initialScrollDone) {
    state.initialScrollDone = true;
    scrollRoadmapIntoFirstScreen();
  }
}

/** Đưa khung sơ đồ lộ trình vào chính giữa màn hình đầu tiên một lần duy nhất khi mở chủ đề.
 * @returns {void}
 */
function scrollRoadmapIntoFirstScreen() {
  cleanupInitialScrollListeners();
  if (state.userHasScrolled || state.isBackForward) return;
  const component = document.querySelector(".mindmap-component");
  if (!component) return;
  const header = document.querySelector(".site-header");
  const headerPos = header ? getComputedStyle(header).position : "static";
  const headerHeight =
    header && (headerPos === "sticky" || headerPos === "fixed")
      ? header.getBoundingClientRect().height
      : 0;
  const rect = component.getBoundingClientRect();
  const availableHeight = Math.max(1, window.innerHeight - headerHeight);
  // Tính vị trí cuộn sao cho khung .mindmap-component nằm chính giữa viewport khả dụng (tương đương block: "center");
  // nếu màn hình quá thấp (rect.height > availableHeight), ưu tiên thấy trọn thanh công cụ và vùng canvas phía trên.
  const targetTopInViewport =
    rect.height <= availableHeight
      ? headerHeight + (availableHeight - rect.height) / 2
      : headerHeight + 8;
  const targetScrollY = Math.max(0, window.scrollY + rect.top - targetTopInViewport);
  window.scrollTo(0, Math.round(targetScrollY));
}

/** Gắn node vào DOM theo một lô để trình duyệt chỉ cập nhật container một lần.
 * @param {HTMLElement} layer Lớp chứa các node.
 * @param {MapNode[]} nodes Node đang hiển thị theo thứ tự duyệt cây.
 * @returns {void}
 */
function mountMapNodes(layer, nodes) {
  const fragment = document.createDocumentFragment();
  for (const node of nodes) {
    node.domElement = createNodeDomElement(node);
    fragment.appendChild(node.domElement);
  }
  layer.replaceChildren(fragment);
}

/** Lấy lớp đường nối và giữ định nghĩa đầu mũi tên qua mỗi lần vẽ.
 * @param {SVGSVGElement} svg Lớp SVG của sơ đồ.
 * @returns {SVGGElement} Lớp đường nối đã được xóa nội dung cũ.
 */
function prepareLinksLayer(svg) {
  let group = document.getElementById("mindmap-links-group");
  if (!group) {
    group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.id = "mindmap-links-group";
    svg.appendChild(group);
  }
  group.replaceChildren();
  ensureSvgDefs(svg);
  return group;
}

/** Chỉ đọc kích thước ở bước này; không ghi style xen giữa các phép đo.
 * @param {MapNode[]} nodes Node đã có trong DOM.
 * @returns {void}
 */
function measureMapNodes(nodes) {
  for (const node of nodes) {
    node.width = node.domElement.offsetWidth || 180;
    node.height = node.domElement.offsetHeight || 42;
  }
}

/** Lập chỉ mục cột một lần, dùng lại cho cả tọa độ ngang và chống va chạm.
 * @param {MapNode[]} nodes Node đang hiển thị.
 * @returns {MapNode[][]} Mỗi phần tử là các node ở cùng độ sâu.
 */
function groupNodesByDepth(nodes) {
  const columns = [];
  for (const node of nodes) {
    if (!columns[node.depth]) columns[node.depth] = [];
    columns[node.depth].push(node);
  }
  return columns;
}

/** Đặt cột sau cách mép phải cột trước một khoảng an toàn.
 * @param {MapNode[][]} columns Các cột theo độ sâu.
 * @returns {number[]} Mép phải lớn nhất của từng cột.
 */
function positionMapColumns(columns) {
  const rightEdges = [];
  state.rootNode.x = CONFIG.START_X;
  rightEdges[0] = state.rootNode.x + state.rootNode.width;
  for (let depth = 1; depth < columns.length; depth++) {
    const x = (rightEdges[depth - 1] || 250) + CONFIG.MIN_COL_GAP;
    let right = x;
    for (const node of columns[depth]) {
      node.x = x;
      right = Math.max(right, x + node.width);
    }
    rightEdges[depth] = right;
  }
  return rightEdges;
}

/** Điều phối phân bố dọc, dịch nhánh va chạm rồi căn giữa node cha.
 * @param {MapNode[][]} columns Các cột của cây đang hiển thị.
 * @returns {void}
 */
function positionMapRows(columns) {
  computeSubtreeSpan(state.rootNode);
  assignNodeRows(state.rootNode, 45);
  resolveColumnOverlaps(columns);
  centerParentNodes(state.rootNode);
}

/** Tính chiều cao cây con, đủ chứa cả các nhánh và chính node cha.
 * @param {MapNode} node Gốc cây con.
 * @returns {number} Chiều cao cần thiết, gồm khoảng đệm giữa các node.
 */
function computeSubtreeSpan(node) {
  let childrenSpan = 0;
  if (!node.collapsed) {
    for (const child of node.children) childrenSpan += computeSubtreeSpan(child);
  }
  node.span = Math.max(childrenSpan, node.height + CONFIG.NODE_MARGIN_Y);
  return node.span;
}

/** Phân bổ nhánh theo chiều cao đã đo, căn cha giữa con đầu và con cuối.
 * @param {MapNode} node Node cần đặt vị trí.
 * @param {number} startY Mép trên của vùng dành cho cây con.
 * @returns {void}
 */
function assignNodeRows(node, startY) {
  if (node.collapsed || node.children.length === 0) {
    node.y = startY + node.span / 2;
    return;
  }
  let nextY = startY;
  for (const child of node.children) {
    assignNodeRows(child, nextY);
    nextY += child.span;
  }
  node.y = (node.children[0].y + node.children[node.children.length - 1].y) / 2;
}

/** Dịch cả nhánh dưới khi hai node ở cùng cột không đủ khoảng trống.
 * @param {MapNode[][]} columns Các node được nhóm theo độ sâu.
 * @returns {void}
 */
function resolveColumnOverlaps(columns) {
  for (const column of columns) {
    const ordered = [...column].sort(compareNodeRows);
    for (let index = 1; index < ordered.length; index++) {
      const previous = ordered[index - 1];
      const current = ordered[index];
      const overlap =
        previous.y + previous.height / 2 + CONFIG.NODE_MARGIN_Y - (current.y - current.height / 2);
      if (overlap > 0) shiftSubtree(current, overlap);
    }
  }
}

/** So sánh vị trí dọc để quét va chạm từ trên xuống dưới.
 * @param {MapNode} first Node thứ nhất.
 * @param {MapNode} second Node thứ hai.
 * @returns {number} Hiệu tọa độ Y.
 */
function compareNodeRows(first, second) {
  return first.y - second.y;
}

/** Dịch node và các hậu duệ đang hiển thị cùng một khoảng dọc.
 * @param {MapNode} node Gốc nhánh cần dịch.
 * @param {number} offset Khoảng dịch xuống dưới theo pixel.
 * @returns {void}
 */
function shiftSubtree(node, offset) {
  node.y += offset;
  if (!node.collapsed) {
    for (const child of node.children) shiftSubtree(child, offset);
  }
}

/** Căn lại node cha sau khi các nhánh con đã được dịch chống va chạm.
 * @param {MapNode} node Node cần căn giữa theo hậu duệ.
 * @returns {void}
 */
function centerParentNodes(node) {
  if (node.collapsed || node.children.length === 0) return;
  for (const child of node.children) centerParentNodes(child);
  node.y = (node.children[0].y + node.children[node.children.length - 1].y) / 2;
}

/** Ghi toàn bộ tọa độ sau khi đã kết thúc các phép đọc kích thước.
 * @param {MapNode[]} nodes Node đã tính x/y.
 * @returns {void}
 */
function applyNodePositions(nodes) {
  for (const node of nodes) {
    node.domElement.style.left = node.x + "px";
    node.domElement.style.top = node.y - node.height / 2 + "px";
  }
}

/** Đặt vùng SVG đủ chứa mép phải và đáy của mọi node.
 * @param {SVGSVGElement} svg Canvas cần thay đổi kích thước.
 * @param {MapNode[]} nodes Node đang hiển thị.
 * @param {number[]} rightEdges Mép phải của từng cột.
 * @returns {void}
 */
function resizeMapCanvas(svg, nodes, rightEdges) {
  state.nodeBounds = getMapBounds(nodes);
  let bottom = 0;
  for (const node of nodes) bottom = Math.max(bottom, node.y + node.height / 2);
  const width = (rightEdges[rightEdges.length - 1] || 600) + 160;
  const height = Math.max(bottom + 100, 560);
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  svg.style.width = width + "px";
  svg.style.height = height + "px";
  svg.style.maxWidth = "none";
  svg.style.maxHeight = "none";
}

/** Tạo các đường nối trong một lô; marker-start chỉ từ con về cha.
 * @param {SVGGElement} group Lớp nhận đường nối.
 * @param {MapLink[]} links Quan hệ nội bộ của cây hiện tại.
 * @returns {void}
 */
function drawMapLinks(group, links) {
  const fragment = document.createDocumentFragment();
  for (const link of links) fragment.appendChild(createMapLink(link));
  group.replaceChildren(fragment);
}

/** Tạo đường Bezier từ cạnh phải cha đến cạnh trái con, mũi tên ở phía cha.
 * @param {MapLink} link Cặp node cha và tiên quyết con.
 * @returns {SVGPathElement} Đường cong chưa gắn vào DOM.
 */
function createMapLink(link) {
  const parent = link.parent;
  const child = link.child;
  const startX = parent.x + parent.width;
  const endX = child.x - 2;
  const distance = endX - startX;
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    `M ${startX} ${parent.y} C ${startX + distance * 0.46} ${parent.y}, ${endX - distance * 0.46} ${child.y}, ${endX} ${child.y}`,
  );
  path.setAttribute("class", "mindmap-curve");
  path.setAttribute("marker-start", "url(#mindmap-arrow)");
  path.setAttribute("data-parent", parent.id);
  path.setAttribute("data-child", child.id);
  return path;
}

/** Tạo đầu mũi tên hướng từ tiên quyết về kiến thức đích.
 * @param {SVGElement} svgLayer Lớp SVG.
 * @returns {void} Không trả về giá trị.
 */

function ensureSvgDefs(svgLayer) {
  let defs = svgLayer.querySelector("defs");
  if (!defs) {
    defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    svgLayer.insertBefore(defs, svgLayer.firstChild);
  }

  let marker = svgLayer.querySelector("#mindmap-arrow");
  if (!marker) {
    marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
    marker.setAttribute("id", "mindmap-arrow");
    marker.setAttribute("viewBox", "0 0 10 10");
    marker.setAttribute("refX", "8");
    marker.setAttribute("refY", "5");
    marker.setAttribute("markerWidth", "8");
    marker.setAttribute("markerHeight", "8");
    marker.setAttribute("orient", "auto-start-reverse");

    const arrowPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    arrowPath.setAttribute("d", "M 0 1.5 L 8 5 L 0 8.5 z");
    arrowPath.setAttribute("fill", "currentColor");

    marker.appendChild(arrowPath);
    defs.appendChild(marker);
  }
}

/** Dựng node tương tác và nút mở kiến thức tiên quyết.
 * @param {object} node Node kiến thức.
 * @returns {HTMLDivElement} Thẻ node có nút mở/thu tiên quyết.
 */

function createNodeDomElement(node) {
  const el = document.createElement("div");
  el.className = "mindmap-node";
  el.setAttribute("role", "group");
  el.setAttribute("aria-label", node.name + " — Enter để xem kiến thức");
  el.id = node.id;
  el.tabIndex = 0;

  // Gắn class phân cấp màu sắc
  if (node.isRoot) {
    el.classList.add("mindmap-node--root");
  } else if (node.depth === 1) {
    el.classList.add("mindmap-node--pillar");
  } else if (!node.children || node.children.length === 0) {
    el.classList.add("mindmap-node--leaf");
  } else {
    el.classList.add("mindmap-node--intermediate");
  }

  if (state.selectedNode && state.selectedNode.id === node.id) {
    el.classList.add("mindmap-node--selected");
  }

  // Tên node
  const textSpan = document.createElement("span");
  textSpan.className = "mindmap-node__text";
  textSpan.textContent = node.name;
  el.appendChild(textSpan);

  // Nếu có con -> Thêm nút tròn chỉ thị và số lượng con (+ / -)
  const hasChildren = node.children && node.children.length > 0;
  if (hasChildren) {
    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.className = "mindmap-node__toggle";
    toggleBtn.title = node.collapsed
      ? `Mở rộng ${node.children.length} nhánh con kế cận (+)`
      : "Thu gọn các nhánh con (−)";
    // Khi đang thu gọn: hiện icon mở rộng (+); khi đã mở: hiện icon thu gọn (−)
    toggleBtn.textContent = node.collapsed ? "+" : "−";
    toggleBtn.setAttribute("aria-expanded", String(!node.collapsed));
    toggleBtn.setAttribute(
      "aria-label",
      (node.collapsed ? "Mở" : "Thu") + " kiến thức tiên quyết của " + node.name,
    );

    // CHỈ KHI USER CLICK VÀO DẤU (+) HOẶC (-) MỚI THU GỌN / MỞ RỘNG ROADMAP
    toggleBtn.addEventListener(
      "click",
      /** Đảo trạng thái nhánh, không kích hoạt sự kiện mở panel ở node cha.
       * @param {MouseEvent} e Click nút mở/thu nhánh.
       * @returns {void}
       */
      (e) => {
        e.stopPropagation();
        toggleNode(node);
      },
    );

    el.appendChild(toggleBtn);
  }

  // KHI USER CLICK VÀO THẺ: CHỈ HIỆN THÔNG TIN CHI TIẾT TRONG DRAWER, KHÔNG ĐỔI TRẠNG THÁI MỞ/ĐÓNG
  el.addEventListener(
    "click",
    /** Mở panel đầu ra kiến thức khi chạm/click thẻ node (bỏ qua nếu vừa kết thúc thao tác kéo).
     * @returns {void}
     */
    () => {
      if (performance.now() < state.suppressClickUntil) return;
      selectNode(node);
    },
  );

  el.addEventListener(
    "keydown",
    /** Mở thông tin node bằng Enter/Space khi focus ở chính thẻ node.
     * @param {KeyboardEvent} e Phím trên thẻ node.
     * @returns {void}
     */
    (e) => {
      if (e.target === el && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        selectNode(node);
      }
    },
  );

  return el;
}

/** Đảo trạng thái mở/thu gọn của node và re-render Mind Map.
 * Khi mở nhánh (+), tự động căn giữa cây đang hiển thị và tuyệt đối giữ nguyên mức zoom (scale).
 * @param {MapNode} node Node kiến thức.
 * @returns {void} Không trả về giá trị.
 */

function toggleNode(node) {
  const isExpanding = node.collapsed;
  node.collapsed = !node.collapsed;
  // Tuyệt đối không kích hoạt fitToScreen khi mở/thu nhánh để giữ nguyên state.scale hiện tại
  state.fitAfterRender = false;
  state.centerAfterRender = isExpanding;
  renderMindMap(false, node.id);
}

/** Hiển thị đầu ra và môn học của keyword trong panel.
 * @param {object} node Node kiến thức.
 * @returns {void} Không trả về giá trị.
 */

function selectNode(node) {
  highlightSelectedNode(node);
  renderDrawerContent(node);
  openDrawer();
}

/** Chỉ đánh dấu node được chọn, bỏ đánh dấu cũ mà không dựng lại cây.
 * @param {MapNode} node Node cần xem đầu ra.
 * @returns {void}
 */
function highlightSelectedNode(node) {
  state.selectedNode = node;
  for (const selected of document.querySelectorAll(".mindmap-node--selected")) {
    selected.classList.remove("mindmap-node--selected");
  }
  node.domElement?.classList.add("mindmap-node--selected");
}

/** Điền dữ liệu keyword vào panel, ẩn môn học/tiên quyết khi không có.
 * @param {MapNode} node Node đang được xem.
 * @returns {void}
 */
function renderDrawerContent(node) {
  document.getElementById("drawer-title").textContent = node.name;
  document.getElementById("drawer-outcome").textContent =
    node.outcome || "Chưa bổ sung đầu ra kiến thức.";
  renderDrawerBadge(node);
  const subjectsSection = document.getElementById("drawer-subjects-section");
  const prerequisitesSection = document.getElementById("drawer-prereqs-section");
  subjectsSection.hidden = node.subjects.length === 0;
  prerequisitesSection.hidden = node.children.length === 0;
  document
    .getElementById("drawer-subjects")
    .replaceChildren(...node.subjects.map(createSubjectBadge));
  document
    .getElementById("drawer-prereqs")
    .replaceChildren(...node.children.map(createPrerequisite));
}

/** Gán nhãn cấp kiến thức đúng với vị trí node trong cây hiện tại.
 * @param {MapNode} node Node cần gán nhãn.
 * @returns {void}
 */
function renderDrawerBadge(node) {
  const badge = document.getElementById("drawer-badge");
  const isLeaf = node.children.length === 0;
  const variant = node.isRoot || node.depth === 1 ? "primary" : isLeaf ? "success" : "purple";
  badge.className = "badge badge--" + variant;
  badge.textContent = node.isRoot
    ? "Chủ đề nghiên cứu"
    : node.depth === 1
      ? "Kiến thức cốt lõi"
      : isLeaf
        ? "Nền tảng tiên quyết"
        : "Kiến thức cơ sở";
}

/** Mở dialog native và ghi nhận điểm trả focus khi người dùng đóng.
 * @returns {void}
 */
function openDrawer() {
  const drawer = document.getElementById("mindmap-drawer");
  state.drawerTrigger = document.activeElement;
  drawer.hidden = false;
  if (!drawer.open) drawer.showModal();
  drawer.classList.add("mindmap-drawer--open");
  document.getElementById("drawer-close").focus();
}

/** Gắn sự kiện đóng panel bằng nút và bàn phím.
 * @returns {void}
 */
function initDrawerEvents() {
  document.getElementById("drawer-close").addEventListener("click", closeDrawer);
  document.addEventListener("keydown", handleDrawerKey);
}
/** Đóng panel và khôi phục focus. @returns {void} */

function closeDrawer() {
  const drawer = document.getElementById("mindmap-drawer");
  drawer.close();
  drawer.hidden = true;
  drawer.classList.remove("mindmap-drawer--open");
  state.selectedNode?.domElement?.classList.remove("mindmap-node--selected");
  state.selectedNode = null;
  if (state.drawerTrigger?.isConnected) state.drawerTrigger.focus();
}
/** Escape đóng panel, Tab giữ focus trong panel. @param {KeyboardEvent} event Phím. @returns {void} */

function handleDrawerKey(event) {
  const drawer = document.getElementById("mindmap-drawer");
  if (drawer.hidden) return;
  if (event.key === "Escape") {
    event.preventDefault();
    closeDrawer();
  }
  if (event.key === "Tab") {
    event.preventDefault();
    document.getElementById("drawer-close").focus();
  }
}
/** Tạo badge môn học bằng DOM. @param {string} subject Môn học. @returns {HTMLElement} Badge. */

function createSubjectBadge(subject) {
  return element("span", "badge badge--warning", subject);
}
/** Tạo mô tả tiên quyết bằng DOM. @param {object} node Keyword. @returns {HTMLElement} Li. */

function createPrerequisite(node) {
  return element("li", "", node.name + (node.outcome ? ": " + node.outcome : ""));
}

/** Tự động căn vừa khung nhìn (thay đổi cả scale và pan, chừa đệm 40px mỗi cạnh).
 * @returns {void} Không trả về giá trị.
 */

function fitToScreen() {
  const viewport = document.getElementById("mindmap-viewport");
  const bounds = state.nodeBounds;
  if (!viewport || !bounds || !viewport.clientWidth || !viewport.clientHeight) return;
  const width = viewport.clientWidth;
  const height = viewport.clientHeight;
  // Chừa 40px ở mỗi cạnh, không tính vùng SVG trống vào tỷ lệ fit.
  state.scale = Math.max(
    CONFIG.MIN_ZOOM,
    Math.min((width - 80) / bounds.width, (height - 80) / bounds.height, 1),
  );
  state.panX = (width - bounds.width * state.scale) / 2 - bounds.left * state.scale;
  state.panY = (height - bounds.height * state.scale) / 2 - bounds.top * state.scale;
  applyTransform();
}

/** Căn giữa bounding box của toàn bộ node đang hiển thị về tâm viewport mà không thay đổi scale.
 * @returns {void}
 */
function centerMapKeepScale() {
  const viewport = document.getElementById("mindmap-viewport");
  const bounds = state.nodeBounds;
  if (!viewport || !bounds || !viewport.clientWidth || !viewport.clientHeight) return;
  // Tính tâm hình học của toàn bộ các node đang hiển thị trong không gian tọa độ sơ đồ
  const boundsCenterX = bounds.left + bounds.width / 2;
  const boundsCenterY = bounds.top + bounds.height / 2;
  // Dịch panX và panY để đưa tâm cây về đúng tâm viewport ở mức state.scale hiện tại
  state.panX = viewport.clientWidth / 2 - boundsCenterX * state.scale;
  state.panY = viewport.clientHeight / 2 - boundsCenterY * state.scale;
  applyTransform();
}

/** Phóng to hoặc thu nhỏ sơ đồ quanh một điểm neo cố định trong khung nhìn.
 * @param {number} targetScale Mức tỷ lệ mới trước khi giới hạn.
 * @param {number} anchorX Tọa độ ngang của điểm neo trong viewport (px).
 * @param {number} anchorY Tọa độ dọc của điểm neo trong viewport (px).
 * @returns {void}
 */
function zoomAtPoint(targetScale, anchorX, anchorY) {
  const newScale = Math.min(Math.max(targetScale, CONFIG.MIN_ZOOM), CONFIG.MAX_ZOOM);
  if (newScale === state.scale) return;
  // Quy đổi điểm neo từ tọa độ viewport sang tọa độ thế giới: worldPoint = (a - p) / s
  const worldX = (anchorX - state.panX) / state.scale;
  const worldY = (anchorY - state.panY) / state.scale;
  // Tính lại pan sao cho worldPoint đứng yên dưới điểm neo sau khi đổi sang newScale: newPan = a - worldPoint * newScale
  state.panX = anchorX - worldX * newScale;
  state.panY = anchorY - worldY * newScale;
  state.scale = newScale;
  applyTransform();
}

/** Tính bounding box thật của các node sau khi bố trí.
 * @param {MapNode[]} nodes Node đang hiển thị và đã được đo.
 * @returns {{left:number,top:number,width:number,height:number}} Vùng chứa tất cả node.
 */
function getMapBounds(nodes) {
  let left = Infinity,
    top = Infinity,
    right = -Infinity,
    bottom = -Infinity;
  for (const node of nodes) {
    left = Math.min(left, node.x);
    top = Math.min(top, node.y - node.height / 2);
    right = Math.max(right, node.x + node.width);
    bottom = Math.max(bottom, node.y + node.height / 2);
  }
  return { left, top, width: Math.max(1, right - left), height: Math.max(1, bottom - top) };
}

/** Khởi tạo các nút công cụ Toolbar
 * @returns {void} Không trả về giá trị.
 */

function initToolbarControls() {
  document.getElementById("btn-zoom-in").addEventListener("click", zoomIn);
  document.getElementById("btn-zoom-out").addEventListener("click", zoomOut);
  document.getElementById("btn-zoom-reset").addEventListener("click", fitToScreen);
  document.getElementById("btn-view-mindmap").addEventListener("click", showMap);
  document.getElementById("btn-view-cards").addEventListener("click", showCards);
  const full = document.getElementById("btn-fullscreen");
  if (!document.fullscreenEnabled) {
    full.hidden = true;
  } else {
    full.addEventListener("click", toggleFullscreen);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    syncFullscreenButtonState();
  }
  window.addEventListener("resize", resizeMap);
}

/** Phóng to quanh tâm khung nhìn sơ đồ. @returns {void} */
function zoomIn() {
  const viewport = document.getElementById("mindmap-viewport");
  const anchorX = viewport ? viewport.clientWidth / 2 : 0;
  const anchorY = viewport ? viewport.clientHeight / 2 : 0;
  zoomAtPoint(state.scale + CONFIG.ZOOM_STEP, anchorX, anchorY);
}

/** Thu nhỏ quanh tâm khung nhìn sơ đồ. @returns {void} */
function zoomOut() {
  const viewport = document.getElementById("mindmap-viewport");
  const anchorX = viewport ? viewport.clientWidth / 2 : 0;
  const anchorY = viewport ? viewport.clientHeight / 2 : 0;
  zoomAtPoint(state.scale - CONFIG.ZOOM_STEP, anchorX, anchorY);
}

/** Chuyển về sơ đồ. @returns {void} */
function showMap() {
  setView("mindmap");
  renderMindMap(true);
}
/** Chuyển về danh sách. @returns {void} */
function showCards() {
  setView("cards");
}
/** Đặt chế độ hiển thị. @param {string} view cards hoặc mindmap. @returns {void} */

function setView(view) {
  state.activeView = view;
  document.getElementById("mindmap-viewport").hidden = view !== "mindmap";
  document.getElementById("cards-viewport").hidden = view !== "cards";
  document.getElementById("mindmap-controls").hidden = view !== "mindmap";
  for (const name of ["mindmap", "cards"]) {
    const button = document.getElementById("btn-view-" + name);
    button.classList.toggle("mindmap-view-btn--active", view === name);
    button.setAttribute("aria-pressed", String(view === name));
  }
}

/** Căn lại map khi chiều ngang khung nhìn thay đổi (tránh thanh địa chỉ mobile ẩn/hiện làm mất zoom).
 * @returns {void}
 */
function resizeMap() {
  const currentWidth = window.innerWidth;
  if (currentWidth === state.lastViewportWidth) return;
  state.lastViewportWidth = currentWidth;
  if (state.activeView === "mindmap") renderMindMap(true);
}

/** Đồng bộ biểu tượng, nhãn văn bản và thuộc tính ARIA của nút Toàn màn hình.
 * @returns {void}
 */
function syncFullscreenButtonState() {
  const btn = document.getElementById("btn-fullscreen");
  if (!btn) return;
  const label = document.getElementById("fullscreen-label");
  const path = document.getElementById("fullscreen-icon-path");
  const isFullscreen = Boolean(document.fullscreenElement);
  const text = isFullscreen ? "Thoát toàn màn hình" : "Toàn màn hình";
  btn.setAttribute("aria-label", text);
  btn.setAttribute("title", text);
  btn.setAttribute("aria-pressed", String(isFullscreen));
  if (label) label.textContent = text;
  if (path) {
    path.setAttribute("d", isFullscreen ? FULLSCREEN_ICONS.EXIT : FULLSCREEN_ICONS.ENTER);
  }
}

/** Xử lý sự kiện thay đổi trạng thái toàn màn hình (kể cả khi thoát bằng phím Escape).
 * @returns {void}
 */
function handleFullscreenChange() {
  syncFullscreenButtonState();
  if (state.activeView === "mindmap") renderMindMap(true);
}

/** Bật hoặc thoát chế độ toàn màn hình với xử lý lỗi an toàn.
 * @returns {Promise<void>}
 */
async function toggleFullscreen() {
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await document.querySelector(".mindmap-component").requestFullscreen();
    }
    syncFullscreenButtonState();
    if (state.activeView === "mindmap") renderMindMap(true);
  } catch {
    document.getElementById("mindmap-hint").textContent =
      "Trình duyệt không cho phép toàn màn hình.";
  }
}

/** Khởi tạo kéo sơ đồ bằng Pointer Events (hỗ trợ cả chuột và cảm ứng) và Ctrl + cuộn để zoom.
 * @returns {void} Không trả về giá trị.
 */
function initCanvasViewport() {
  if (state.canvasInitialized) return;
  const viewport = document.getElementById("mindmap-viewport");
  const stage = document.getElementById("mindmap-stage");
  if (!viewport || !stage) return;
  state.canvasInitialized = true;

  /** Giải phóng trạng thái kéo hiện tại khi nhả trỏ, hủy cảm ứng hoặc mất pointer capture.
   * @param {PointerEvent} [e] Sự kiện con trỏ kết thúc hoặc bị hủy.
   * @returns {void}
   */
  function endPointerPan(e) {
    if (state.activePointerId === null) return;
    if (e && e.pointerId !== undefined && e.pointerId !== state.activePointerId) return;

    if (state.dragThresholdMet && state.isDragging) {
      state.suppressClickUntil = performance.now() + 120;
    }

    // Nếu cử chỉ là vuốt dọc hoặc bị hủy (pointercancel), khôi phục nguyên trạng tọa độ gốc
    if (state.dragDirection === "vertical-ignored" || (e && e.type === "pointercancel")) {
      if (state.isDragging) {
        state.panX = state.dragOriginPanX;
        state.panY = state.dragOriginPanY;
        applyTransform();
      }
    }

    try {
      if (e && viewport.hasPointerCapture?.(e.pointerId)) {
        viewport.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Bỏ qua nếu sự kiện giả lập không đăng ký pointer capture phần cứng
    }

    state.activePointerId = null;
    state.isDragging = false;
    state.dragThresholdMet = false;
    state.dragDirection = null;
    viewport.classList.remove("mindmap-viewport--dragging");
  }

  viewport.addEventListener(
    "pointerdown",
    /** Ghi nhận điểm bắt đầu tương tác trên vùng canvas, bỏ qua nút đóng/mở nhánh và drawer.
     * @param {PointerEvent} e Sự kiện nhấn chuột hoặc chạm cảm ứng.
     * @returns {void}
     */
    (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if (e.target.closest(".mindmap-node__toggle") || e.target.closest(".mindmap-drawer")) return;

      state.activePointerId = e.pointerId;
      state.pointerStartX = e.clientX;
      state.pointerStartY = e.clientY;
      state.dragOriginPanX = state.panX;
      state.dragOriginPanY = state.panY;
      state.dragStartX = e.clientX - state.panX;
      state.dragStartY = e.clientY - state.panY;
      state.dragThresholdMet = false;
      state.dragDirection = null;
      state.isDragging = false;
    },
  );

  window.addEventListener(
    "pointermove",
    /** Xử lý di chuyển con trỏ: phân biệt chuột, cảm ứng toàn màn hình và cảm ứng trong trang.
     * @param {PointerEvent} e Sự kiện di chuyển con trỏ hoặc ngón tay.
     * @returns {void}
     */
    (e) => {
      if (state.activePointerId === null || e.pointerId !== state.activePointerId) return;
      const dx = e.clientX - state.pointerStartX;
      const dy = e.clientY - state.pointerStartY;
      const isFullscreen = Boolean(document.fullscreenElement);
      const isMouse = e.pointerType === "mouse";

      if (!state.dragThresholdMet) {
        if (Math.hypot(dx, dy) < CONFIG.DRAG_THRESHOLD) return;
        state.dragThresholdMet = true;

        if (isMouse || isFullscreen) {
          // Chuột hoặc toàn màn hình: kéo tự do cả hai chiều X và Y
          state.dragDirection = "all";
          state.isDragging = true;
          viewport.classList.add("mindmap-viewport--dragging");
          try {
            viewport.setPointerCapture?.(e.pointerId);
          } catch {}
        } else {
          // Cảm ứng khi nằm trong trang: phân định hướng dựa vào độ lệch dx và dy
          const absDx = Math.abs(dx);
          const absDy = Math.abs(dy);
          if (absDy >= absDx) {
            // Thiên về dọc: người dùng muốn cuộn trang! Bỏ luồng kéo, không đổi pan/scale và không bắt capture
            state.dragDirection = "vertical-ignored";
            state.isDragging = false;
            return;
          } else {
            // Thiên về ngang: khóa hướng kéo ngang của cây
            state.dragDirection = "horizontal";
            state.isDragging = true;
            viewport.classList.add("mindmap-viewport--dragging");
            try {
              viewport.setPointerCapture?.(e.pointerId);
            } catch {}
          }
        }
      }

      if (!state.isDragging) return;

      if (state.dragDirection === "all") {
        state.panX = e.clientX - state.dragStartX;
        state.panY = e.clientY - state.dragStartY;
        applyTransform();
      } else if (state.dragDirection === "horizontal") {
        // Chỉ cập nhật trục X, khóa chặt panY ở mức ban đầu để tránh trôi cây theo chiều dọc
        state.panX = e.clientX - state.dragStartX;
        state.panY = state.dragOriginPanY;
        applyTransform();
      }
    },
  );

  window.addEventListener("pointerup", endPointerPan);
  window.addEventListener("pointercancel", endPointerPan);
  viewport.addEventListener("lostpointercapture", endPointerPan);

  viewport.addEventListener(
    "wheel",
    /** Zoom quanh vị trí con trỏ chuột khi giữ Ctrl; cuộn thường vẫn cuộn trang.
     * @param {WheelEvent} e Sự kiện cuộn chuột trên canvas.
     * @returns {void}
     */
    (e) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      // Giảm độ nhạy cuộn chuột / trackpad: chỉ thay đổi ~3.5% mỗi nấc cuộn để thao tác mượt mà
      const delta = Math.sign(e.deltaY);
      const zoomFactor = delta < 0 ? 1.035 : 0.965;
      const rect = viewport.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      zoomAtPoint(state.scale * zoomFactor, mouseX, mouseY);
    },
    { passive: false },
  );
}

/** Áp dụng tọa độ pan và mức zoom lên sân khấu.
 * @returns {void} Không trả về giá trị.
 */
function applyTransform() {
  const stage = document.getElementById("mindmap-stage");
  if (stage) {
    stage.style.transform = `translate(${state.panX}px, ${state.panY}px) scale(${state.scale})`;
  }
}

/** Dựng danh sách kiến thức bằng details/summary.
 * @param {object} topic Chủ đề nguồn.
 * @returns {void} Không trả về giá trị.
 */
function renderCardsView(topic) {
  const container = document.getElementById("roadmap-pillars-grid");
  if (!container) return;

  container.replaceChildren();
  if (!topic.keywords || topic.keywords.length === 0) return;

  const fragment = document.createDocumentFragment();
  for (const [index, keyword] of topic.keywords.entries()) {
    fragment.appendChild(createPillarCard(keyword, index));
  }
  container.replaceChildren(fragment);
}

/** Tạo một nhánh keyword gốc trong chế độ danh sách.
 * @param {Keyword} keyword Kiến thức gốc của chủ đề.
 * @param {number} index Vị trí để đánh số nhánh.
 * @returns {HTMLElement} Thẻ nhánh và toàn bộ tiên quyết của nó.
 */
function createPillarCard(keyword, index) {
  const card = element("div", "roadmap-pillar");
  const label = element(
    "div",
    "roadmap-pillar__label",
    "Nhánh " + (index + 1) + ": " + keyword.name,
  );
  const tree = element("div", "roadmap-tree");
  tree.appendChild(createCardNodeRecursive(keyword, 0));
  card.append(label, tree);
  return card;
}

/** Dựng đệ quy keyword và các kiến thức tiên quyết.
 * @param {object} kw Keyword nguồn.
 * @param {number} depth Độ sâu trong cây.
 * @returns {HTMLDetailsElement} Nhánh danh sách đóng/mở bằng bàn phím.
 */
function createCardNodeRecursive(kw, depth) {
  const details = document.createElement("details");
  details.className = "roadmap-node";
  details.open = true;

  const isPillar = depth === 0;
  const isLeaf = !kw.children || kw.children.length === 0;

  if (isPillar) details.classList.add("roadmap-node--pillar");
  else if (isLeaf) details.classList.add("roadmap-node--leaf");
  else details.classList.add("roadmap-node--intermediate");

  const summary = document.createElement("summary");
  summary.className = "roadmap-node__summary";

  const badge = document.createElement("span");
  badge.className = "roadmap-node__badge badge";
  if (isPillar) {
    badge.classList.add("badge--primary");
    badge.textContent = "Kiến thức cốt lõi";
  } else if (isLeaf) {
    badge.classList.add("badge--success");
    badge.textContent = "Nền tảng tiên quyết";
  } else {
    badge.classList.add("badge--purple");
    badge.textContent = "Kiến thức cơ sở";
  }

  const h = document.createElement("span");
  h.className = "roadmap-node__name";
  h.textContent = kw.name;

  const icon = document.createElement("span");
  icon.className = "roadmap-node__toggle-icon";
  icon.setAttribute("aria-hidden", "true");

  summary.appendChild(badge);
  summary.appendChild(h);
  summary.appendChild(icon);
  details.appendChild(summary);

  const content = document.createElement("div");
  content.className = "roadmap-node__content";

  const p = document.createElement("p");
  p.className = "roadmap-node__outcome";
  p.textContent = "Đầu ra kỳ vọng: " + (kw.outcome || "Chưa bổ sung.");
  content.appendChild(p);

  if (Array.isArray(kw.subjects) && kw.subjects.length > 0) {
    const subDiv = document.createElement("div");
    subDiv.className = "roadmap-node__subjects";
    subDiv.append(
      element("span", "roadmap-node__subjects-label", "Môn học gợi ý: "),
      ...kw.subjects.map(createSubjectBadge),
    );
    content.appendChild(subDiv);
  }

  if (kw.children && kw.children.length > 0) {
    const branch = document.createElement("div");
    branch.className = "roadmap-branch";
    const connector = element("div", "roadmap-branch__connector");
    connector.append(element("span", "roadmap-branch__arrow", "↑"), " Tiên quyết cần học trước:");
    branch.appendChild(connector);
    for (const child of kw.children) {
      branch.appendChild(createCardNodeRecursive(child, depth + 1));
    }
    content.appendChild(branch);
  }

  details.appendChild(content);
  return details;
}

/** Hiển thị URL không khớp thay vì fallback. @returns {void} */

function renderTopicNotFound() {
  renderPageMessage(
    document.getElementById("main-content"),
    "Không tìm thấy chủ đề",
    "Đường dẫn thiếu hoặc không khớp nhóm, tên chủ đề và email giảng viên.",
    "../index.html",
  );
}
/** Hiển thị lỗi tải. @param {string} message Thông báo. @returns {void} */

function renderErrorMessage(message) {
  renderPageMessage(
    document.getElementById("main-content"),
    "Không thể tải chủ đề",
    message,
    "../index.html",
  );
}
