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
  activeView: "mindmap",
  mapFrame: 0,
  renderVersion: 0,
  fitAfterRender: false,
  toggleFocusId: "",
};

document.addEventListener("DOMContentLoaded", initTopicDetailPage);

/** Khởi tạo toàn bộ trang chi tiết
 * @returns {Promise<void>} Hoàn tất khởi tạo hoặc hiển thị lỗi.
 */

async function initTopicDetailPage() {
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
    setView(matchMedia("(max-width:767px)").matches ? "cards" : "mindmap");
    renderMindMap(true);
  } catch {
    renderErrorMessage("Không thể tải dữ liệu chủ đề. Hãy tải lại trang để thử lại.");
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
  if (elGroupBadge) elGroupBadge.textContent = `Lĩnh vực: ${group.name || "An toàn thông tin"}`;

  const elTitle = document.getElementById("topic-title");
  if (elTitle) elTitle.textContent = topic.name;

  const elLecturer = document.getElementById("topic-lecturer-link");
  if (elLecturer && topic.lecturer) {
    elLecturer.textContent = `${topic.lecturer.name} →`;
    elLecturer.href = lecturerUrl(topic.lecturer.email);
  }

  const elEmail = document.getElementById("topic-email-link");
  if (elEmail && topic.lecturer) {
    elEmail.textContent = topic.lecturer.email;
    elEmail.href = `mailto:${topic.lecturer.email}`;
  }

  const elIntro = document.getElementById("topic-intro-text");
  if (elIntro) {
    elIntro.textContent = `Nghiên cứu định hướng chuyên sâu về đề tài "${topic.name}", được hướng dẫn bởi ${topic.lecturer ? topic.lecturer.name : "Giảng viên"}. Bạn có thể nhấp trực tiếp vào từng node để mở dần lộ trình các kiến thức nền tảng tương ứng.`;
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
  label.textContent = "🚀 Chọn nhanh chủ đề nghiên cứu:";

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

/** Khôi phục góc nhìn và focus sau khi tọa độ mới đã được áp dụng.
 * @returns {void}
 */
function finishMapInteraction() {
  if (state.fitAfterRender && state.activeView === "mindmap") fitToScreen();
  if (state.toggleFocusId && state.activeView === "mindmap") {
    document
      .getElementById(state.toggleFocusId)
      ?.querySelector("button")
      ?.focus({ preventScroll: true });
  }
  state.fitAfterRender = false;
  state.toggleFocusId = "";
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
 * @returns {HTMLDetailsElement} Nhánh danh sách đóng/mở bằng bàn phím.
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
    /** Mở panel đầu ra kiến thức khi click thẻ node.
     * @returns {void}
     */
    () => {
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

/** Đảo trạng thái mở/thu gọn của node và re-render Mind Map
 * @param {object} node Node kiến thức.
 * @returns {void} Không trả về giá trị.
 */

function toggleNode(node) {
  node.collapsed = !node.collapsed;
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
    ? "🎯 MỤC TIÊU ĐỀ TÀI"
    : node.depth === 1
      ? "🏛️ TRỤ CỘT ĐỀ TÀI"
      : isLeaf
        ? "🌱 NỀN TẢNG TIÊN QUYẾT (XUẤT PHÁT)"
        : "🔷 KIẾN THỨC CƠ SỞ";
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

/** Tự động căn vừa khung nhìn
 * @returns {void} Không trả về giá trị.
 */

function fitToScreen() {
  const viewport = document.getElementById("mindmap-viewport");
  const svg = document.getElementById("mindmap-svg");
  if (!viewport || !svg) return;

  const vpWidth = viewport.clientWidth;
  const vpHeight = viewport.clientHeight;
  const contentWidth = parseFloat(svg.getAttribute("width")) || 650;
  const contentHeight = parseFloat(svg.getAttribute("height")) || 400;

  const scaleX = (vpWidth - 80) / contentWidth;
  const scaleY = (vpHeight - 80) / contentHeight;
  const fitScale = Math.min(Math.min(scaleX, scaleY), 1.0);

  state.scale = Math.max(0.02, fitScale);
  state.panX = Math.max(0, (vpWidth - contentWidth * state.scale) / 2);
  state.panY = Math.max(0, (vpHeight - contentHeight * state.scale) / 2);

  applyTransform();
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
  if (!document.fullscreenEnabled) full.hidden = true;
  else full.addEventListener("click", toggleFullscreen);
  window.addEventListener("resize", resizeMap);
}
/** Phóng to. @returns {void} */
function zoomIn() {
  state.scale = Math.min(state.scale + CONFIG.ZOOM_STEP, CONFIG.MAX_ZOOM);
  applyTransform();
}
/** Thu nhỏ. @returns {void} */
function zoomOut() {
  state.scale = Math.max(state.scale - CONFIG.ZOOM_STEP, 0.02);
  applyTransform();
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
/** Căn lại map khi kích thước đổi. @returns {void} */
function resizeMap() {
  if (state.activeView === "mindmap") renderMindMap(true);
}
/** Fullscreen với lỗi được xử lý trong UI. @returns {Promise<void>} */

async function toggleFullscreen() {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.querySelector(".mindmap-component").requestFullscreen();
    renderMindMap(true);
  } catch {
    document.getElementById("mindmap-hint").textContent =
      "Trình duyệt không cho phép toàn màn hình.";
  }
}

/** Khởi tạo kéo sơ đồ và Ctrl + cuộn để zoom.
 * @returns {void} Không trả về giá trị.
 */
function initCanvasViewport() {
  const viewport = document.getElementById("mindmap-viewport");
  const stage = document.getElementById("mindmap-stage");
  if (!viewport || !stage) return;

  viewport.addEventListener(
    "mousedown",
    /** Bắt đầu kéo ở nền canvas, tránh thao tác trên node hoặc panel.
     * @param {MouseEvent} e Sự kiện chuột trên canvas.
     * @returns {void}
     */
    (e) => {
      if (e.target.closest(".mindmap-node") || e.target.closest(".mindmap-drawer")) return;

      state.isDragging = true;
      state.dragStartX = e.clientX - state.panX;
      state.dragStartY = e.clientY - state.panY;
      viewport.style.cursor = "grabbing";
    },
  );

  window.addEventListener(
    "mousemove",
    /** Cập nhật pan theo con trỏ khi một thao tác kéo đang diễn ra.
     * @param {MouseEvent} e Sự kiện chuột trên canvas.
     * @returns {void}
     */
    (e) => {
      if (!state.isDragging) return;
      state.panX = e.clientX - state.dragStartX;
      state.panY = e.clientY - state.dragStartY;
      applyTransform();
    },
  );

  window.addEventListener(
    "mouseup",
    /** Kết thúc kéo và khôi phục con trỏ canvas.
     * @returns {void}
     */
    () => {
      if (state.isDragging) {
        state.isDragging = false;
        viewport.style.cursor = "grab";
      }
    },
  );

  viewport.addEventListener(
    "wheel",
    /** Zoom quanh vị trí chuột khi giữ Ctrl; cuộn thường vẫn cuộn trang.
     * @param {WheelEvent} e Sự kiện chuột trên canvas.
     * @returns {void}
     */
    (e) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      // Giảm độ nhạy cuộn chuột / trackpad: chỉ thay đổi ~3.5% mỗi nấc cuộn để thao tác mượt mà
      const delta = Math.sign(e.deltaY);
      const zoomFactor = delta < 0 ? 1.035 : 0.965;
      const newScale = Math.min(
        Math.max(state.scale * zoomFactor, CONFIG.MIN_ZOOM),
        CONFIG.MAX_ZOOM,
      );

      const rect = viewport.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      state.panX = mouseX - (mouseX - state.panX) * (newScale / state.scale);
      state.panY = mouseY - (mouseY - state.panY) * (newScale / state.scale);
      state.scale = newScale;

      applyTransform();
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
    "Trụ cột " + (index + 1) + ": " + keyword.name,
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
    badge.textContent = "🏛️ TRỤ CỘT ĐỀ TÀI";
  } else if (isLeaf) {
    badge.classList.add("badge--success");
    badge.textContent = "🌱 NỀN TẢNG TIÊN QUYẾT";
  } else {
    badge.classList.add("badge--purple");
    badge.textContent = "🔷 KIẾN THỨC CƠ SỞ";
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
