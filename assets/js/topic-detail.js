import {
  loadResearch,
  normalizeEmail,
  readTopicQuery,
  findTopic as findDataTopic,
  topicUrl,
  lecturerUrl,
  element,
  searchText,
  renderPageMessage,
} from "./data.js";
/**
 * @file topic-detail.js
 * @description Trực quan hóa Lộ trình nghiên cứu dạng Sơ đồ tư duy (Interactive Mind Map)
 * - Khởi đầu hiển thị gọn (Chủ đề & Trụ cột).
 * - Bấm vào nút +/− để mở hoặc thu nhánh con kế cận, tiếp tục lần lượt tới node lá.
 * - Vẽ đường cong Bezier và mũi tên chỉ rõ hướng tiên quyết từ con về cha.
 * - Tự động tính độ rộng cột động, tránh chồng lấn node.
 * - Hỗ trợ kéo 2D trực tiếp, chế độ toàn màn hình fallback cho iOS Safari và điều hướng bàn phím.
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
  MIN_COL_GAP: 85, // Khoảng cách an toàn giữa các cột để đường cong và mũi tên thoáng
  NODE_MARGIN_Y: 28, // Khoảng cách đệm giữa 2 hàng nhánh chống đè dọc
  START_X: 45, // Tọa độ mép trái của node gốc
  MIN_ZOOM: 0.02,
  MAX_ZOOM: 2.2,
  ZOOM_STEP: 0.2,
  KEYBOARD_PAN_STEP: 60, // Bước dịch chuyển (px) khi dùng phím mũi tên
  DRAG_THRESHOLD: 6, // Ngưỡng dịch chuyển (px) để phân biệt chạm (tap) và kéo (pan)
};

/** Đường dẫn SVG cho hai trạng thái của nút Toàn màn hình */
const FULLSCREEN_ICONS = {
  ENTER: "M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z",
  EXIT: "M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z",
};

/**
 * Trạng thái toàn cục của trang chi tiết và tương tác sơ đồ
 */
const state = {
  researchData: null,
  currentTopic: null,
  currentGroup: null,
  rootNode: null,
  selectedNode: null,
  drawerTrigger: null,

  // Trạng thái Pan & Zoom
  panX: 40,
  panY: 80,
  scale: 1,
  pan2DMode: false,
  isDragging: false,
  activePointerId: null,
  pointerStartX: 0,
  pointerStartY: 0,
  dragOriginPanX: 0,
  dragOriginPanY: 0,
  dragAnchorX: 0,
  dragAnchorY: 0,
  dragThresholdMet: false,
  dragDirection: null,
  suppressClickUntil: 0,
  suppressOutcomeHelp: false,
  suppressFocusAutoPan: false,
  dragStartX: 0,
  dragStartY: 0,

  // Trạng thái hiển thị và điều phối khung hình
  activeView: "mindmap",
  mapFrame: 0,
  renderVersion: 0,
  fitAfterRender: false,
  expandFocusNode: null,
  toggleFocusId: "",
  nodeBounds: null,
  canvasInitialized: false,
  lastViewportWidth: 0,
};

document.addEventListener("DOMContentLoaded", initTopicDetailPage);

/**
 * Khởi tạo toàn bộ trang chi tiết chủ đề và các thành phần tương tác.
 * @returns {Promise<void>} Hoàn tất khởi tạo hoặc hiển thị trạng thái lỗi.
 */
async function initTopicDetailPage() {
  state.lastViewportWidth = window.innerWidth;

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
    // Mặc định hiển thị Sơ đồ trên cả mobile và desktop; vẫn chuyển sang Danh sách được.
    setView("mindmap");
    renderMindMap(true);
  } catch (err) {
    console.error("Lỗi khởi tạo chi tiết chủ đề:", err);
    renderErrorMessage("Không thể tải dữ liệu chủ đề. Hãy tải lại trang để thử lại.");
  } finally {
    // Công bố nội dung sau một lần cập nhật, tránh xê dịch các placeholder khi JSON tới.
    document.getElementById("main-content")?.removeAttribute("aria-busy");
    document.getElementById("topic-load-status")?.remove();
  }
}

/**
 * Hiển thị tiêu đề, màu nhóm ngành, breadcrumb và liên kết giảng viên đúng chủ đề.
 * @param {object} topic Chủ đề nguồn.
 * @param {object} group Nhóm chủ đề chứa màu miền.
 * @returns {void}
 */
function renderHeaderInfo(topic, group) {
  document.title = `${topic.name} | UIT Discovery`;

  const elBreadcrumb = document.getElementById("breadcrumb-current");
  if (elBreadcrumb) elBreadcrumb.textContent = topic.name;

  // Đồng bộ màu badge nhóm ngành và gán data-group cho vùng sơ đồ tô màu node gốc
  const elGroupBadge = document.getElementById("topic-group-badge");
  if (elGroupBadge) {
    elGroupBadge.textContent = group.name;
    elGroupBadge.className = "badge badge--" + group.id;
  }

  const elViewport = document.getElementById("mindmap-viewport");
  if (elViewport) {
    elViewport.dataset.group = group.id;
  }

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

/**
 * Gắn xử lý đóng modal dialog khi cùng một thao tác con trỏ bắt đầu và kết thúc trên vùng backdrop.
 * @param {HTMLDialogElement} dialog Phần tử dialog cần gắn sự kiện backdrop.
 * @param {Function} onClose Hàm callback đóng dialog tương ứng.
 * @returns {void}
 */
function attachDialogBackdropClose(dialog, onClose) {
  let outsidePointerId = null;

  /**
   * Kiểm tra tọa độ con trỏ có nằm ngoài khung hộp thoại hay không.
   * @param {PointerEvent} event Sự kiện con trỏ.
   * @returns {boolean} True nếu con trỏ nằm ngoài khung chữ nhật của dialog.
   */
  function isOutside(event) {
    const rect = dialog.getBoundingClientRect();
    return (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    );
  }

  /**
   * Ghi nhận con trỏ nhấn bắt đầu trực tiếp trên nền backdrop ngoài dialog.
   * @param {PointerEvent} event Sự kiện bắt đầu nhấn.
   * @returns {void}
   */
  function rememberStart(event) {
    const isPrimary = event.pointerType !== "mouse" || event.button === 0;
    outsidePointerId = isPrimary && isOutside(event) ? event.pointerId : null;
  }

  /**
   * Chỉ đóng hộp thoại khi cùng một con trỏ vừa nhấn vừa nhả ở ngoài khung dialog.
   * @param {PointerEvent} event Sự kiện kết thúc nhấn.
   * @returns {void}
   */
  function closeOnRelease(event) {
    const shouldClose = outsidePointerId === event.pointerId && isOutside(event);
    outsidePointerId = null;
    if (shouldClose) onClose();
  }

  /**
   * Đặt lại trạng thái theo dõi backdrop khi cử chỉ bị hủy hoặc dialog đóng.
   * @returns {void}
   */
  function resetOutside() {
    outsidePointerId = null;
  }

  dialog.addEventListener("pointerdown", rememberStart);
  dialog.addEventListener("pointerup", closeOnRelease);
  dialog.addEventListener("pointercancel", resetOutside);
  dialog.addEventListener("close", resetOutside);
}

/**
 * Dựng bộ chuyển chủ đề cùng giảng viên; ẩn hoàn toàn khi giảng viên chỉ có 1 đề tài.
 * @param {object} data Dữ liệu nghiên cứu gồm danh sách nhóm.
 * @param {object} currentTopic Chủ đề hiện tại để đối chiếu giảng viên và đánh dấu đang xem.
 * @returns {void}
 */
function renderQuickTopicSwitcher(data, currentTopic) {
  const container = document.getElementById("topic-switcher-container");
  if (!container) return;

  container.replaceChildren();

  /**
   * Kiểm tra chủ đề có thuộc cùng giảng viên hiện tại hay không (hỗ trợ email alias).
   * @param {object} topic Chủ đề cần đối chiếu.
   * @returns {boolean} True nếu cùng giảng viên hướng dẫn.
   */
  function matchesLecturer(topic) {
    return normalizeEmail(topic.lecturer.email) === normalizeEmail(currentTopic.lecturer.email);
  }

  // Đếm tổng số chủ đề của giảng viên hiện tại trên toàn bộ các nhóm
  let totalCount = 0;
  for (const entry of data.groups) {
    totalCount += entry.topics.filter(matchesLecturer).length;
  }

  // Nếu giảng viên chỉ có 1 chủ đề, ẩn hoàn toàn vùng chuyển chủ đề để header dàn đủ 1 cột
  if (totalCount <= 1) {
    container.hidden = true;
    return;
  }

  container.hidden = false;
  const button = element(
    "button",
    "btn btn--outline topic-switcher__trigger",
    "Đề tài khác (" + totalCount + ")",
  );
  button.type = "button";

  const dialog = element("dialog", "topic-picker");
  dialog.setAttribute("aria-labelledby", "topic-picker-heading");

  const top = element("div", "topic-picker__header");
  const heading = element("h2", "", "Chủ đề của giảng viên");
  heading.id = "topic-picker-heading";
  const close = element("button", "btn btn--quiet", "Đóng");
  close.type = "button";
  top.append(heading, close);

  const label = element("label", "", "Tìm trong chủ đề của giảng viên");
  label.htmlFor = "topic-picker-search";
  const search = element("input");
  search.id = "topic-picker-search";
  search.type = "search";

  // Chỉ hiện ô tìm kiếm bên trong hộp chọn khi giảng viên có từ 5 đề tài trở lên
  const shouldHideSearch = totalCount <= 4;
  label.hidden = shouldHideSearch;
  search.hidden = shouldHideSearch;

  const list = element("div", "topic-picker__list");
  const status = element("p", "topic-picker__status");
  status.setAttribute("role", "status");
  const lecturerName = element("p", "topic-picker__lecturer", currentTopic.lecturer.name);

  dialog.append(top, lecturerName, label, search, status, list);
  attachDialogBackdropClose(dialog, closePicker);

  container.append(button, dialog);
  button.addEventListener("click", openPicker);
  close.addEventListener("click", closePicker);
  dialog.addEventListener("close", restorePickerFocus);
  dialog.addEventListener("keydown", handlePickerKey);
  search.addEventListener("input", renderChoices);

  /**
   * Đóng hộp chọn bằng phím Escape ngay cả khi ô tìm kiếm đang có nội dung.
   * @param {KeyboardEvent} event Sự kiện bàn phím.
   * @returns {void}
   */
  function handlePickerKey(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      closePicker();
    }
  }

  /**
   * Mở hộp chọn chủ đề, dọn tooltip nổi và đặt focus vào phần tử phù hợp.
   * @returns {void}
   */
  function openPicker() {
    hideOutcomeHelp();
    search.value = "";
    renderChoices();
    dialog.showModal();
    list.scrollTop = 0;
    if (!search.hidden) {
      search.focus();
    } else {
      close.focus();
    }
  }

  /**
   * Đóng hộp chọn chủ đề.
   * @returns {void}
   */
  function closePicker() {
    dialog.close();
  }

  /**
   * Trả focus về nút kích hoạt sau khi đóng hộp chọn.
   * @returns {void}
   */
  function restorePickerFocus() {
    button.focus();
  }

  /**
   * Lọc các chủ đề cùng giảng viên theo từ khóa và sắp xếp tiếng Việt trong từng nhóm.
   * @returns {void}
   */
  function renderChoices() {
    const fragment = document.createDocumentFragment();
    const query = searchText(search.value);
    let count = 0;

    /**
     * Đối chiếu tên chủ đề với từ khóa không dấu.
     * @param {object} topic Chủ đề cần lọc.
     * @returns {boolean} True nếu tên chủ đề chứa từ khóa.
     */
    function matchesSearch(topic) {
      return searchText(topic.name).includes(query);
    }

    for (const entry of data.groups) {
      const matches = entry.topics
        .filter(matchesLecturer)
        .filter(matchesSearch)
        .slice()
        .sort(compareNames);
      if (!matches.length) continue;

      const section = element("section", "topic-picker__group");
      section.append(element("h3", "", entry.group.name));

      for (const topic of matches) {
        const link = element("a", "topic-picker__item");
        link.href = topicUrl(entry.group, topic);
        link.append(element("span", "topic-picker__name", topic.name));

        if (entry.group.id === state.currentGroup.id && topic === currentTopic) {
          link.setAttribute("aria-current", "page");
          link.append(element("span", "topic-picker__current", "Đang xem"));
        }
        section.append(link);
        count++;
      }
      fragment.append(section);
    }

    list.replaceChildren(fragment);
    status.textContent = count ? count + " chủ đề" : "Không tìm thấy chủ đề phù hợp.";
  }

  /**
   * So sánh tên chủ đề theo bảng chữ cái tiếng Việt.
   * @param {object} a Chủ đề thứ nhất.
   * @param {object} b Chủ đề thứ hai.
   * @returns {number} Giá trị thứ tự cho Array.sort.
   */
  function compareNames(a, b) {
    return a.name.localeCompare(b.name, "vi");
  }
}

/* ==========================================================================
   BỘ DỰNG CÂY TIÊN QUYẾT & TÍNH TOÁN BỐ CỤC
   ========================================================================== */

/**
 * Khởi tạo cấu trúc cây từ chủ đề nguồn: mở node gốc và thu gọn các nhánh trụ cột.
 * @param {object} topic Chủ đề nguồn từ JSON.
 * @returns {void}
 */
function buildMindMapTree(topic) {
  let nodeIdCounter = 1;

  state.rootNode = {
    id: "node_root",
    name: topic.name,
    depth: 0,
    isRoot: true,
    collapsed: false, // Root luôn mở để hiển thị các Trụ cột và không gắn nút thu gọn
    outcome: "", // Không lặp lại tên đề tài vào đầu ra của node gốc
    subjects: [],
    children: [],
  };

  /**
   * Chuyển đổi đệ quy từng keyword nguồn thành MapNode có trạng thái đóng/mở.
   * @param {Keyword} kw Keyword nguồn.
   * @param {number} depth Độ sâu của node trong cây.
   * @param {MapNode} parentNode Node cha cần học sau keyword này.
   * @returns {MapNode} Node runtime hoàn chỉnh.
   */
  function convertKeyword(kw, depth, parentNode) {
    const node = {
      id: `node_${nodeIdCounter++}`,
      name: kw.name,
      depth: depth,
      isRoot: false,
      outcome: kw.outcome || "",
      subjects: Array.isArray(kw.subjects) ? kw.subjects : [],
      collapsed: true, // Mặc định thu gọn: người dùng bấm + mới mở nhánh con
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

/**
 * Thu thập danh sách các node đang mở và các đường nối tương ứng.
 * @returns {{visibleNodes: MapNode[], links: MapLink[]}} Node và liên kết đang hiển thị.
 */
function getVisibleNodesAndLinks() {
  const visibleNodes = [];
  const links = [];

  /**
   * Duyệt đệ quy cây theo các nhánh đang ở trạng thái mở.
   * @param {MapNode} node Node kiến thức đang xét.
   * @returns {void}
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

/**
 * Gộp yêu cầu dựng sơ đồ trong cùng khung hình animation; lượt mới thay thế lượt cũ.
 * @param {boolean} [fit=false] Căn lại góc nhìn ban đầu sau khi đo kích thước xong.
 * @param {string} [focusId=""] ID của node vừa toggle để trả focus sau khi dựng DOM.
 * @returns {void}
 */
function renderMindMap(fit = false, focusId = "") {
  state.fitAfterRender ||= fit;
  if (focusId) state.toggleFocusId = focusId;
  state.renderVersion++;
  cancelAnimationFrame(state.mapFrame);
  state.mapFrame = requestAnimationFrame(buildMapFrame);
}

/**
 * Dựng DOM ở khung hình đầu, dành khung hình tiếp theo cho bước đo và bố trí tọa độ.
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

  /**
   * Hoàn thành đo đạc, chống chồng lấn, vẽ đường nối và khôi phục tương tác cho lượt mới nhất.
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

/**
 * Khôi phục góc nhìn (fit khởi đầu hoặc neo nhánh vừa mở) và trả focus về nút toggle.
 * @returns {void}
 */
function finishMapInteraction() {
  if (state.activeView === "mindmap") {
    if (state.fitAfterRender) {
      setInitialMapView();
    } else if (state.expandFocusNode) {
      focusExpandedBranch(state.expandFocusNode);
    }
  }

  // Chỉ trả focus về nút mở/thu (.mindmap-node__toggle) để không bật nhầm tooltip hoặc phá góc nhìn neo nhánh
  if (state.toggleFocusId && state.activeView === "mindmap") {
    state.suppressFocusAutoPan = true;
    document
      .getElementById(state.toggleFocusId)
      ?.querySelector(".mindmap-node__toggle")
      ?.focus({ preventScroll: true });
    state.suppressFocusAutoPan = false;
  }

  state.fitAfterRender = false;
  state.expandFocusNode = null;
  state.toggleFocusId = "";
}

/**
 * Gắn toàn bộ node đang hiển thị vào DOM trong một lô duy nhất.
 * @param {HTMLElement} layer Phần tử chứa các node.
 * @param {MapNode[]} nodes Danh sách node theo thứ tự duyệt cây.
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

/**
 * Chuẩn bị lớp SVG chứa đường nối và bảo toàn định nghĩa đầu mũi tên.
 * @param {SVGSVGElement} svg Phần tử SVG của sơ đồ.
 * @returns {SVGGElement} Nhóm SVG chứa các đường cong nối node.
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

/**
 * Đo kích thước thật của từng node trước pha ghi vị trí để tránh layout thrashing.
 * @param {MapNode[]} nodes Danh sách node đã gắn vào DOM.
 * @returns {void}
 */
function measureMapNodes(nodes) {
  for (const node of nodes) {
    node.width = node.domElement.offsetWidth || 180;
    node.height = node.domElement.offsetHeight || 42;
  }
}

/**
 * Gom các node đang hiển thị theo độ sâu cột.
 * @param {MapNode[]} nodes Danh sách node đang hiển thị.
 * @returns {MapNode[][]} Mảng các cột phân theo độ sâu.
 */
function groupNodesByDepth(nodes) {
  const columns = [];
  for (const node of nodes) {
    if (!columns[node.depth]) columns[node.depth] = [];
    columns[node.depth].push(node);
  }
  return columns;
}

/**
 * Tính tọa độ ngang của từng cột sao cho cách cột trước một khoảng an toàn.
 * @param {MapNode[][]} columns Các cột node theo độ sâu.
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

/**
 * Phân bố tọa độ dọc, xử lý chống chồng lấn cùng cột và căn giữa lại node cha.
 * @param {MapNode[][]} columns Các cột của cây đang hiển thị.
 * @returns {void}
 */
function positionMapRows(columns) {
  computeSubtreeSpan(state.rootNode);
  assignNodeRows(state.rootNode, 45);
  resolveColumnOverlaps(columns);
  centerParentNodes(state.rootNode);
}

/**
 * Tính chiều cao vùng chiếm chỗ cho mỗi cây con.
 * @param {MapNode} node Gốc cây con đang xét.
 * @returns {number} Tổng chiều cao cần thiết gồm khoảng đệm dọc.
 */
function computeSubtreeSpan(node) {
  let childrenSpan = 0;
  if (!node.collapsed) {
    for (const child of node.children) childrenSpan += computeSubtreeSpan(child);
  }
  node.span = Math.max(childrenSpan, node.height + CONFIG.NODE_MARGIN_Y);
  return node.span;
}

/**
 * Gán tọa độ dọc ban đầu dựa trên chiều cao cây con và căn cha theo con đầu/cuối.
 * @param {MapNode} node Node đang bố trí.
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

/**
 * Quét từng cột từ trên xuống dưới và dịch nhánh bị chạm khoảng đệm tối thiểu.
 * @param {MapNode[][]} columns Các cột đã gán tọa độ Y ban đầu.
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

/**
 * So sánh tọa độ dọc giữa hai node để sắp xếp thứ tự trên-dưới.
 * @param {MapNode} first Node thứ nhất.
 * @param {MapNode} second Node thứ hai.
 * @returns {number} Hiệu tọa độ Y.
 */
function compareNodeRows(first, second) {
  return first.y - second.y;
}

/**
 * Dịch node hiện tại và toàn bộ hậu duệ đang mở xuống dưới một khoảng cố định.
 * @param {MapNode} node Node gốc nhánh cần dịch.
 * @param {number} offset Khoảng dịch chuyển theo trục Y (px).
 * @returns {void}
 */
function shiftSubtree(node, offset) {
  node.y += offset;
  if (!node.collapsed) {
    for (const child of node.children) shiftSubtree(child, offset);
  }
}

/**
 * Căn lại tâm dọc của node cha sau khi xử lý va chạm cột.
 * @param {MapNode} node Node đang xét.
 * @returns {void}
 */
function centerParentNodes(node) {
  if (node.collapsed || node.children.length === 0) return;
  for (const child of node.children) centerParentNodes(child);
  node.y = (node.children[0].y + node.children[node.children.length - 1].y) / 2;
}

/**
 * Áp dụng tọa độ x/y đã tính lên CSS left/top của các thẻ DOM node.
 * @param {MapNode[]} nodes Danh sách node cần cập nhật vị trí.
 * @returns {void}
 */
function applyNodePositions(nodes) {
  for (const node of nodes) {
    node.domElement.style.left = node.x + "px";
    node.domElement.style.top = node.y - node.height / 2 + "px";
  }
}

/**
 * Cập nhật kích thước canvas SVG bao trọn toàn bộ node và lưu vùng bounding box.
 * @param {SVGSVGElement} svg Phần tử SVG nền.
 * @param {MapNode[]} nodes Các node đang hiển thị.
 * @param {number[]} rightEdges Mép phải lớn nhất của các cột.
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

/**
 * Vẽ toàn bộ đường nối Bezier từ nhánh con hướng mũi tên về nhánh cha.
 * @param {SVGGElement} group Nhóm SVG nhận các thẻ path.
 * @param {MapLink[]} links Danh sách cặp node cha-con đang hiển thị.
 * @returns {void}
 */
function drawMapLinks(group, links) {
  const fragment = document.createDocumentFragment();
  for (const link of links) fragment.appendChild(createMapLink(link));
  group.replaceChildren(fragment);
}

/**
 * Tạo đường cong Bezier từ mép phải cha đến mép trái con; dịch đầu mũi tên tách khỏi hộp cha.
 * @param {MapLink} link Cặp liên kết cha và con.
 * @returns {SVGPathElement} Thẻ path SVG chưa gắn DOM.
 */
function createMapLink(link) {
  const parent = link.parent;
  const child = link.child;
  // Dịch startX +3px để đầu mũi tên marker-start tách rõ khỏi đường viền hộp cha
  const startX = parent.x + parent.width + 3;
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

/**
 * Khởi tạo định nghĩa marker mũi tên SVG hướng từ tiên quyết về kiến thức đích.
 * @param {SVGElement} svgLayer Lớp SVG gốc của sơ đồ.
 * @returns {void}
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

/**
 * Tạo thẻ DOM cho một node: tách riêng button thẻ kiến thức và button mở/thu nhánh con.
 * @param {MapNode} node Node kiến thức trong cây.
 * @returns {HTMLDivElement} Khối nhóm chứa card button và toggle button (nếu có).
 */
function createNodeDomElement(node) {
  const el = document.createElement("div");
  el.className = "mindmap-node";
  el.setAttribute("role", "group");
  el.setAttribute("aria-label", node.name);
  el.id = node.id;

  // Gắn class phân cấp trực quan trung tính theo vị trí node trong cây
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

  // Nút thẻ chính để mở Drawer chi tiết và gắn trợ giúp đầu ra (không gắn lên div cha)
  const cardBtn = document.createElement("button");
  cardBtn.type = "button";
  cardBtn.className = "mindmap-node__card";

  const textSpan = document.createElement("span");
  textSpan.className = "mindmap-node__text";
  textSpan.textContent = node.name;
  cardBtn.appendChild(textSpan);

  cardBtn.addEventListener(
    "click",
    /**
     * Mở panel đầu ra khi bấm vào thẻ node (bỏ qua nếu vừa kết thúc thao tác kéo).
     * @returns {void}
     */
    () => {
      if (performance.now() < state.suppressClickUntil) return;
      selectNode(node);
    },
  );

  if (!node.isRoot) {
    attachOutcomeHelp(cardBtn, node.outcome);
  }

  el.appendChild(cardBtn);

  // Chỉ hiển thị nút mở/thu (+N / −) ở các node không phải gốc và có tiên quyết con
  const hasChildren = !node.isRoot && node.children && node.children.length > 0;
  if (hasChildren) {
    const childCount = node.children.length;
    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.className = "mindmap-node__toggle";
    toggleBtn.title = node.collapsed
      ? `Mở rộng ${childCount} nhánh con`
      : "Thu gọn các nhánh con";
    toggleBtn.textContent = node.collapsed ? "+" + childCount : "−";
    toggleBtn.setAttribute("aria-expanded", String(!node.collapsed));
    toggleBtn.setAttribute(
      "aria-label",
      (node.collapsed ? "Mở " + childCount : "Thu " + childCount) +
        " kiến thức tiên quyết của " +
        node.name,
    );

    toggleBtn.addEventListener(
      "click",
      /**
       * Đảo trạng thái mở/thu nhánh mà không kích hoạt mở Drawer của thẻ kiến thức.
       * @param {MouseEvent} e Sự kiện click nút mở/thu nhánh.
       * @returns {void}
       */
      (e) => {
        e.stopPropagation();
        toggleNode(node);
      },
    );

    el.appendChild(toggleBtn);
  }

  return el;
}

/**
 * Đảo trạng thái mở/thu gọn của node và vẽ lại sơ đồ; neo nhánh vừa mở trong tầm nhìn.
 * @param {MapNode} node Node kiến thức được thao tác.
 * @returns {void}
 */
function toggleNode(node) {
  hideOutcomeHelp();
  const isExpanding = node.collapsed;
  node.collapsed = !node.collapsed;
  // Giữ nguyên state.scale hiện tại và chỉ neo nhánh vừa mở vào khung nhìn
  state.fitAfterRender = false;
  state.expandFocusNode = isExpanding ? node : null;
  renderMindMap(false, node.id);
}

/**
 * Đánh dấu node được chọn và mở Drawer chi tiết kiến thức.
 * @param {MapNode} node Node kiến thức cần xem.
 * @returns {void}
 */
function selectNode(node) {
  highlightSelectedNode(node);
  renderDrawerContent(node);
  openDrawer();
}

/**
 * Đánh dấu trực quan node đang được chọn mà không dựng lại toàn bộ sơ đồ.
 * @param {MapNode} node Node vừa chọn.
 * @returns {void}
 */
function highlightSelectedNode(node) {
  state.selectedNode = node;
  for (const selected of document.querySelectorAll(".mindmap-node--selected")) {
    selected.classList.remove("mindmap-node--selected");
  }
  node.domElement?.classList.add("mindmap-node--selected");
}

/**
 * Điền thông tin đầu ra, môn học tham khảo và tiên quyết vào Drawer; ẩn đầu ra ở node gốc.
 * @param {MapNode} node Node đang được hiển thị trong Drawer.
 * @returns {void}
 */
function renderDrawerContent(node) {
  document.getElementById("drawer-title").textContent = node.name;
  renderDrawerBadge(node);

  // Ẩn mục đầu ra kỳ vọng khi xem chủ đề gốc để tránh lặp lại tên đề tài
  const outcomeSection = document.getElementById("drawer-outcome-section");
  if (outcomeSection) {
    outcomeSection.hidden = node.isRoot;
  }
  document.getElementById("drawer-outcome").textContent =
    node.outcome || "Chưa bổ sung đầu ra kiến thức.";

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

/**
 * Gán nhãn cấp độ trung tính trong Drawer, tách biệt hoàn toàn với màu 3 nhóm ngành.
 * @param {MapNode} node Node kiến thức đang xem.
 * @returns {void}
 */
function renderDrawerBadge(node) {
  const badge = document.getElementById("drawer-badge");
  const isLeaf = node.children.length === 0;
  const level = node.isRoot
    ? "root"
    : node.depth === 1
      ? "pillar"
      : isLeaf
        ? "leaf"
        : "intermediate";

  badge.className = "badge badge--level-" + level;
  badge.textContent = node.isRoot
    ? "Chủ đề nghiên cứu"
    : node.depth === 1
      ? "Kiến thức cốt lõi"
      : isLeaf
        ? "Nền tảng tiên quyết"
        : "Kiến thức cơ sở";
}

/**
 * Mở Drawer chi tiết bằng native dialog và lưu điểm trả focus khi đóng.
 * @returns {void}
 */
function openDrawer() {
  hideOutcomeHelp();
  const drawer = document.getElementById("mindmap-drawer");
  const active = document.activeElement;
  const fallbackCard = state.selectedNode?.domElement?.querySelector(".mindmap-node__card");
  state.drawerTrigger = active?.closest?.(".mindmap-node__card") ? active : fallbackCard || active;
  drawer.hidden = false;
  if (!drawer.open) drawer.showModal();
  drawer.classList.add("mindmap-drawer--open");
  document.getElementById("drawer-close").focus();
}

/**
 * Gắn đầy đủ sự kiện đóng Drawer: nút đóng, listener "close", click backdrop và bàn phím.
 * @returns {void}
 */
function initDrawerEvents() {
  const drawer = document.getElementById("mindmap-drawer");
  if (!drawer) return;

  document.getElementById("drawer-close").addEventListener("click", closeDrawer);
  drawer.addEventListener("close", handleDrawerClose);
  attachDialogBackdropClose(drawer, closeDrawer);
  drawer.addEventListener("keydown", handleDrawerKey);
}

/**
 * Kích hoạt đóng Drawer an toàn qua native dialog close.
 * @returns {void}
 */
function closeDrawer() {
  const drawer = document.getElementById("mindmap-drawer");
  if (!drawer) return;
  if (drawer.open) {
    drawer.close();
  } else {
    handleDrawerClose();
  }
}

/**
 * Dọn trạng thái hiển thị của Drawer sau khi dialog đóng và trả focus không bật tooltip.
 * @returns {void}
 */
function handleDrawerClose() {
  const drawer = document.getElementById("mindmap-drawer");
  if (!drawer) return;
  drawer.hidden = true;
  drawer.classList.remove("mindmap-drawer--open");
  state.selectedNode?.domElement?.classList.remove("mindmap-node--selected");
  state.selectedNode = null;

  // Khôi phục focus về thẻ nút đã mở Drawer nhưng không kích hoạt lại tooltip nổi
  if (state.drawerTrigger?.isConnected) {
    state.suppressOutcomeHelp = true;
    state.drawerTrigger.focus({ preventScroll: true });
    state.suppressOutcomeHelp = false;
  }
  state.drawerTrigger = null;
}

/**
 * Xử lý phím Escape và giữ vòng lặp Tab bên trong Drawer khi đang mở.
 * @param {KeyboardEvent} event Sự kiện bàn phím trên Drawer.
 * @returns {void}
 */
function handleDrawerKey(event) {
  const drawer = document.getElementById("mindmap-drawer");
  if (!drawer || drawer.hidden) return;
  if (event.key === "Escape") {
    event.preventDefault();
    event.stopPropagation();
    closeDrawer();
  } else if (event.key === "Tab") {
    event.preventDefault();
    document.getElementById("drawer-close").focus();
  }
}

/**
 * Tạo badge môn học gợi ý tham khảo với modifier ngữ nghĩa badge--subject.
 * @param {string} subject Tên môn học gợi ý.
 * @returns {HTMLElement} Thẻ span badge môn học.
 */
function createSubjectBadge(subject) {
  return element("span", "badge badge--subject", subject);
}

/**
 * Tạo một mục danh sách kiến thức tiên quyết bên trong Drawer.
 * @param {MapNode} node Node kiến thức con.
 * @returns {HTMLLIElement} Phần tử danh sách mô tả tiên quyết.
 */
function createPrerequisite(node) {
  return element("li", "", node.name + (node.outcome ? ": " + node.outcome : ""));
}

/**
 * Chọn góc nhìn khởi đầu tối ưu: trên mobile (<768px) hé lộ mép phải gốc, mũi tên và nhánh đầu;
 * đảm bảo tỷ lệ scale >= 0.77 ở 375px để vùng chạm đạt >= 44px và không cắt trên/dưới.
 * @returns {void}
 */
function setInitialMapView() {
  const viewport = document.getElementById("mindmap-viewport");
  if (!viewport || !viewport.clientWidth || !viewport.clientHeight) return;
  if (viewport.clientWidth >= 768) {
    fitToScreen();
    return;
  }

  const root = state.rootNode;
  const firstChild = root?.children?.[0];
  const bounds = state.nodeBounds;
  if (!root || !firstChild || !bounds || !firstChild.width || !firstChild.height) {
    fitToScreen();
    return;
  }

  // Giữ ~44–54px mép phải node_root để scale đạt ~0.80 ở 375px và vùng chạm card/toggle >= 44px
  const rootRight = root.x + root.width;
  const childRight = firstChild.x + firstChild.width;
  const desiredRootPeek = Math.min(54, Math.max(44, Math.round(viewport.clientWidth * 0.145)));
  const rightMargin = viewport.clientWidth < 340 ? 14 : 16;
  const spanFromRootRight = Math.max(1, childRight - rootRight);
  const fittedScale = (viewport.clientWidth - desiredRootPeek - rightMargin) / spanFromRootRight;
  state.scale = Math.max(0.62, Math.min(0.9, fittedScale));

  const rootToChildWidth = (childRight - root.x) * state.scale;
  if (rootToChildWidth <= viewport.clientWidth - 32) {
    state.panX = (viewport.clientWidth - rootToChildWidth) / 2 - root.x * state.scale;
  } else {
    state.panX = desiredRootPeek - rootRight * state.scale;
  }

  // Căn giữa dọc khi toàn cây lọt khung (đệm tối thiểu 12px); nếu vượt chiều cao thì neo sát đỉnh 16px
  const scaledHeight = bounds.height * state.scale;
  if (scaledHeight > viewport.clientHeight - 24) {
    state.panY = 16 - bounds.top * state.scale;
  } else {
    state.panY = (viewport.clientHeight - scaledHeight) / 2 - bounds.top * state.scale;
  }

  applyTransform();
}

/**
 * Tự động căn vừa toàn bộ sơ đồ vào khung nhìn (đệm 40px mỗi cạnh, tối đa scale 1).
 * @returns {void}
 */
function fitToScreen() {
  hideOutcomeHelp();
  const viewport = document.getElementById("mindmap-viewport");
  const bounds = state.nodeBounds;
  if (!viewport || !bounds || !viewport.clientWidth || !viewport.clientHeight) return;

  const width = viewport.clientWidth;
  const height = viewport.clientHeight;
  // Chừa 40px ở mỗi cạnh, không tính vùng SVG trống vào tỷ lệ fit
  state.scale = Math.max(
    CONFIG.MIN_ZOOM,
    Math.min((width - 80) / bounds.width, (height - 80) / bounds.height, 1),
  );
  state.panX = (width - bounds.width * state.scale) / 2 - bounds.left * state.scale;
  state.panY = (height - bounds.height * state.scale) / 2 - bounds.top * state.scale;
  applyTransform();
}

/**
 * Tịnh tiến khung nhìn vừa đủ (giữ nguyên scale) để giữ nhánh vừa mở trong tầm nhìn;
 * trên khung hẹp ưu tiên hiển thị trọn cụm node con mới mở và hé lộ đầu nối/mép phải node cha bên trái.
 * @param {MapNode} node Node vừa bấm mở nhánh (+).
 * @returns {void}
 */
function focusExpandedBranch(node) {
  const viewport = document.getElementById("mindmap-viewport");
  if (!viewport || !node || !viewport.clientWidth || !viewport.clientHeight) return;

  const children = node.children || [];
  const branchNodes = [node, ...children];
  const branchBounds = getMapBounds(branchNodes);
  const padX = Math.min(24, Math.max(12, Math.round(viewport.clientWidth * 0.05)));
  const padY = Math.min(24, Math.max(12, Math.round(viewport.clientHeight * 0.05)));

  const screenLeft = branchBounds.left * state.scale + state.panX;
  const screenTop = branchBounds.top * state.scale + state.panY;
  const screenWidth = branchBounds.width * state.scale;
  const screenHeight = branchBounds.height * state.scale;
  const availableWidth = viewport.clientWidth - padX * 2;
  const availableHeight = viewport.clientHeight - padY * 2;

  if (screenWidth > availableWidth) {
    if (children.length > 0) {
      // Trên khung hẹp (như mobile 375px), tính riêng vùng bao cụm con để không đẩy nhánh con ra ngoài mép phải
      const childrenBounds = getMapBounds(children);
      const childrenScreenWidth = childrenBounds.width * state.scale;
      if (childrenScreenWidth <= availableWidth) {
        // Neo mép phải cụm con vào trong lề phải viewport, giữ trọn node con và vẫn hé lộ mũi tên + mép phải node cha ở bên trái
        state.panX =
          viewport.clientWidth - padX - (childrenBounds.left + childrenBounds.width) * state.scale;
      } else {
        state.panX = padX - childrenBounds.left * state.scale;
      }
    } else {
      state.panX = padX - branchBounds.left * state.scale;
    }
  } else if (screenLeft < padX) {
    state.panX += padX - screenLeft;
  } else if (screenLeft + screenWidth > viewport.clientWidth - padX) {
    state.panX -= screenLeft + screenWidth - (viewport.clientWidth - padX);
  }

  if (screenHeight > availableHeight) {
    // Nếu cụm cao hơn khung nhìn, ưu tiên neo đỉnh của cụm con (hoặc nhánh cha) vào lề trên
    const verticalTarget = children.length > 0 ? getMapBounds(children) : branchBounds;
    state.panY = padY - verticalTarget.top * state.scale;
  } else if (screenTop < padY) {
    state.panY += padY - screenTop;
  } else if (screenTop + screenHeight > viewport.clientHeight - padY) {
    state.panY -= screenTop + screenHeight - (viewport.clientHeight - padY);
  }

  applyTransform();
}

/**
 * Phóng to hoặc thu nhỏ sơ đồ quanh một điểm neo cố định trong khung nhìn.
 * @param {number} targetScale Mức tỷ lệ mới trước khi giới hạn min/max.
 * @param {number} anchorX Tọa độ ngang điểm neo trong viewport (px).
 * @param {number} anchorY Tọa độ dọc điểm neo trong viewport (px).
 * @returns {void}
 */
function zoomAtPoint(targetScale, anchorX, anchorY) {
  const newScale = Math.min(Math.max(targetScale, CONFIG.MIN_ZOOM), CONFIG.MAX_ZOOM);
  if (newScale === state.scale) return;

  // Quy đổi điểm neo từ tọa độ viewport sang tọa độ thế giới để giữ điểm neo đứng yên
  const worldX = (anchorX - state.panX) / state.scale;
  const worldY = (anchorY - state.panY) / state.scale;
  state.panX = anchorX - worldX * newScale;
  state.panY = anchorY - worldY * newScale;
  state.scale = newScale;
  applyTransform();
}

/**
 * Tính vùng bao hình chữ nhật thật của tập các node đã đo vị trí.
 * @param {MapNode[]} nodes Danh sách node cần tính vùng bao.
 * @returns {{left: number, top: number, width: number, height: number}} Tọa độ và kích thước vùng bao.
 */
function getMapBounds(nodes) {
  let left = Infinity;
  let top = Infinity;
  let right = -Infinity;
  let bottom = -Infinity;

  for (const node of nodes) {
    left = Math.min(left, node.x);
    top = Math.min(top, node.y - node.height / 2);
    right = Math.max(right, node.x + node.width);
    bottom = Math.max(bottom, node.y + node.height / 2);
  }

  return {
    left,
    top,
    width: Math.max(1, right - left),
    height: Math.max(1, bottom - top),
  };
}

/**
 * Khởi tạo các nút công cụ Toolbar (Zoom, Fit, Kéo 2D, Toàn màn hình và Chuyển chế độ).
 * @returns {void}
 */
function initToolbarControls() {
  document.getElementById("btn-zoom-in").addEventListener("click", zoomIn);
  document.getElementById("btn-zoom-out").addEventListener("click", zoomOut);
  document.getElementById("btn-zoom-reset").addEventListener("click", fitToScreen);
  document.getElementById("btn-pan-mode")?.addEventListener("click", togglePanMode);
  document.getElementById("btn-view-mindmap").addEventListener("click", showMap);
  document.getElementById("btn-view-cards").addEventListener("click", showCards);

  const full = document.getElementById("btn-fullscreen");
  if (full) {
    full.addEventListener("click", toggleFullscreen);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("keydown", handleExpandedEscape);
    syncFullscreenButtonState();
  }

  window.addEventListener("resize", resizeMap);
  window.addEventListener("scroll", hideOutcomeHelp, { passive: true });
}

/**
 * Bật hoặc tắt chế độ Kéo 2D trực tiếp bằng cảm ứng trên khung sơ đồ.
 * @returns {void}
 */
function togglePanMode() {
  hideOutcomeHelp();
  state.pan2DMode = !state.pan2DMode;
  const btn = document.getElementById("btn-pan-mode");
  const viewport = document.getElementById("mindmap-viewport");
  if (btn) btn.setAttribute("aria-pressed", String(state.pan2DMode));
  viewport?.classList.toggle("mindmap-viewport--pan-2d", state.pan2DMode);
}

/**
 * Phóng to sơ đồ quanh tâm khung nhìn hiện tại.
 * @returns {void}
 */
function zoomIn() {
  hideOutcomeHelp();
  const viewport = document.getElementById("mindmap-viewport");
  const anchorX = viewport ? viewport.clientWidth / 2 : 0;
  const anchorY = viewport ? viewport.clientHeight / 2 : 0;
  zoomAtPoint(state.scale + CONFIG.ZOOM_STEP, anchorX, anchorY);
}

/**
 * Thu nhỏ sơ đồ quanh tâm khung nhìn hiện tại.
 * @returns {void}
 */
function zoomOut() {
  hideOutcomeHelp();
  const viewport = document.getElementById("mindmap-viewport");
  const anchorX = viewport ? viewport.clientWidth / 2 : 0;
  const anchorY = viewport ? viewport.clientHeight / 2 : 0;
  zoomAtPoint(state.scale - CONFIG.ZOOM_STEP, anchorX, anchorY);
}

/**
 * Chuyển sang chế độ hiển thị Sơ đồ và vẽ lại khung nhìn chuẩn.
 * @returns {void}
 */
function showMap() {
  setView("mindmap");
  renderMindMap(true);
}

/**
 * Chuyển sang chế độ hiển thị Danh sách tuần tự.
 * @returns {void}
 */
function showCards() {
  setView("cards");
}

/**
 * Chuyển đổi chế độ hiển thị giữa Sơ đồ và Danh sách; ẩn/hiện vùng sơ đồ, bộ điều khiển, gợi ý tương tác và dọn tooltip nổi.
 * @param {string} view Tên chế độ ("mindmap" hoặc "cards").
 * @returns {void}
 */
function setView(view) {
  hideOutcomeHelp();
  state.activeView = view;
  const isMindmap = view === "mindmap";
  document.getElementById("mindmap-viewport").hidden = !isMindmap;
  document.getElementById("cards-viewport").hidden = isMindmap;
  document.getElementById("mindmap-controls").hidden = !isMindmap;
  document.getElementById("mindmap-hint").hidden = !isMindmap;

  for (const name of ["mindmap", "cards"]) {
    const button = document.getElementById("btn-view-" + name);
    button.classList.toggle("mindmap-view-btn--active", view === name);
    button.setAttribute("aria-pressed", String(view === name));
  }
}

/**
 * Dọn tooltip nổi và căn lại sơ đồ khi chiều ngang viewport thay đổi.
 * @returns {void}
 */
function resizeMap() {
  hideOutcomeHelp();
  const currentWidth = window.innerWidth;
  if (currentWidth === state.lastViewportWidth) return;
  state.lastViewportWidth = currentWidth;
  if (state.activeView === "mindmap") renderMindMap(true);
}

/**
 * Kiểm tra khung sơ đồ có đang mở rộng toàn màn hình (Fullscreen API hoặc CSS fallback).
 * @returns {boolean} True nếu đang ở chế độ toàn màn hình.
 */
function isMapExpanded() {
  const component = document.querySelector(".mindmap-component");
  return Boolean(
    document.fullscreenElement || component?.classList.contains("mindmap-component--expanded"),
  );
}

/**
 * Bật hoặc tắt lớp CSS toàn màn hình giả lập (dành cho iOS Safari hoặc trình duyệt chặn API).
 * @param {boolean} expanded True để phóng toàn màn hình, False để thoát về vị trí cũ.
 * @returns {void}
 */
function setPseudoFullscreen(expanded) {
  const component = document.querySelector(".mindmap-component");
  component?.classList.toggle("mindmap-component--expanded", expanded);
  document.body.classList.toggle("mindmap-scroll-locked", expanded);
}

/**
 * Đồng bộ biểu tượng, nhãn và trạng thái ARIA của nút Toàn màn hình.
 * @returns {void}
 */
function syncFullscreenButtonState() {
  const btn = document.getElementById("btn-fullscreen");
  if (!btn) return;
  const label = document.getElementById("fullscreen-label");
  const path = document.getElementById("fullscreen-icon-path");
  const isFullscreen = isMapExpanded();
  const text = isFullscreen ? "Thoát toàn màn hình" : "Toàn màn hình";

  btn.setAttribute("aria-label", text);
  btn.setAttribute("title", text);
  btn.setAttribute("aria-pressed", String(isFullscreen));
  if (label) label.textContent = text;
  if (path) {
    path.setAttribute("d", isFullscreen ? FULLSCREEN_ICONS.EXIT : FULLSCREEN_ICONS.ENTER);
  }
}

/**
 * Xử lý sự kiện thay đổi trạng thái Fullscreen API gốc (kể cả khi nhấn Escape).
 * @returns {void}
 */
function handleFullscreenChange() {
  if (!document.fullscreenElement) {
    setPseudoFullscreen(false);
  }
  syncFullscreenButtonState();
  if (state.activeView === "mindmap") renderMindMap(true);
}

/**
 * Cho phép dùng phím Escape để thoát chế độ toàn màn hình giả lập CSS và trả focus về nút gọi.
 * @param {KeyboardEvent} event Sự kiện bàn phím toàn cục.
 * @returns {void}
 */
function handleExpandedEscape(event) {
  if (event.key !== "Escape" || event.defaultPrevented) return;
  const component = document.querySelector(".mindmap-component");
  const isCssExpanded =
    component?.classList.contains("mindmap-component--expanded") && !document.fullscreenElement;
  if (!isCssExpanded) return;

  // Không thoát chế độ mở rộng nếu còn modal dialog (Drawer hoặc Topic Picker) đang mở
  const drawer = document.getElementById("mindmap-drawer");
  const hasOpenDialog = (drawer && !drawer.hidden) || Boolean(document.querySelector("dialog[open]"));
  if (hasOpenDialog) return;

  event.preventDefault();
  setPseudoFullscreen(false);
  syncFullscreenButtonState();
  if (state.activeView === "mindmap") renderMindMap(true);
  document.getElementById("btn-fullscreen")?.focus();
}

/**
 * Công bố thông báo trạng thái ngắn gọn qua vùng aria-live mà không ghi đè hướng dẫn gốc.
 * @param {string} message Nội dung thông báo cho trình đọc màn hình.
 * @returns {void}
 */
function announceMapStatus(message) {
  const statusEl = document.getElementById("mindmap-live-status");
  if (statusEl) statusEl.textContent = message;
}

/**
 * Bật hoặc thoát chế độ toàn màn hình; tự chuyển sang CSS fallback khi API không khả dụng/bị từ chối.
 * @returns {Promise<void>} Hoàn tất cập nhật chế độ toàn màn hình và căn lại sơ đồ.
 */
async function toggleFullscreen() {
  const component = document.querySelector(".mindmap-component");
  if (!component) return;
  hideOutcomeHelp();

  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      syncFullscreenButtonState();
      if (state.activeView === "mindmap") renderMindMap(true);
      return;
    }

    if (component.classList.contains("mindmap-component--expanded")) {
      setPseudoFullscreen(false);
      syncFullscreenButtonState();
      if (state.activeView === "mindmap") renderMindMap(true);
      return;
    }

    if (document.fullscreenEnabled && typeof component.requestFullscreen === "function") {
      try {
        await component.requestFullscreen();
        syncFullscreenButtonState();
        if (state.activeView === "mindmap") renderMindMap(true);
        return;
      } catch {
        // Fallback sang toàn màn hình CSS khi trình duyệt từ chối hoặc không hỗ trợ
      }
    }

    setPseudoFullscreen(true);
    syncFullscreenButtonState();
    if (state.activeView === "mindmap") renderMindMap(true);
  } catch {
    announceMapStatus("Không thể thay đổi chế độ toàn màn hình trên trình duyệt này.");
  }
}

/**
 * Dịch chuyển khung nhìn sơ đồ theo độ lệch pixel và áp dụng transform.
 * @param {number} deltaX Khoảng dịch chuyển ngang (px).
 * @param {number} deltaY Khoảng dịch chuyển dọc (px).
 * @returns {void}
 */
function panBy(deltaX, deltaY) {
  hideOutcomeHelp();
  state.panX += deltaX;
  state.panY += deltaY;
  applyTransform();
}

/**
 * Xử lý điều hướng bàn phím trên vùng sơ đồ (mũi tên pan, +/− zoom, 0 căn vừa).
 * @param {KeyboardEvent} event Sự kiện bàn phím trong viewport.
 * @returns {void}
 */
function handleViewportKeydown(event) {
  if (event.ctrlKey || event.metaKey || event.altKey) return;
  if (event.target.closest?.(".mindmap-drawer")) return;

  switch (event.key) {
    case "ArrowLeft":
      event.preventDefault();
      panBy(CONFIG.KEYBOARD_PAN_STEP, 0);
      break;
    case "ArrowRight":
      event.preventDefault();
      panBy(-CONFIG.KEYBOARD_PAN_STEP, 0);
      break;
    case "ArrowUp":
      event.preventDefault();
      panBy(0, CONFIG.KEYBOARD_PAN_STEP);
      break;
    case "ArrowDown":
      event.preventDefault();
      panBy(0, -CONFIG.KEYBOARD_PAN_STEP);
      break;
    case "+":
    case "=":
      event.preventDefault();
      zoomIn();
      break;
    case "-":
    case "_":
      event.preventDefault();
      zoomOut();
      break;
    case "0":
      event.preventDefault();
      fitToScreen();
      break;
    default:
      break;
  }
}

/**
 * Tự động dịch chuyển nhẹ khung nhìn khi một node nhận focus bàn phím nhưng đang bị khuất.
 * @param {FocusEvent} event Sự kiện focusin trong lớp node.
 * @returns {void}
 */
function ensureFocusedNodeVisible(event) {
  if (state.suppressFocusAutoPan) return;
  const viewport = document.getElementById("mindmap-viewport");
  const nodeEl = event.target?.closest?.(".mindmap-node");
  if (!viewport || !nodeEl || state.activeView !== "mindmap") return;

  const vRect = viewport.getBoundingClientRect();
  const nRect = nodeEl.getBoundingClientRect();
  const fRect = event.target.getBoundingClientRect();
  const pad = 16;

  // Ưu tiên đưa trọn cả hộp node vào khung nhìn; nếu hộp rộng/cao hơn khung thì căn theo nút đang focus
  const targetRectX = nRect.width <= vRect.width - pad * 2 ? nRect : fRect;
  const targetRectY = nRect.height <= vRect.height - pad * 2 ? nRect : fRect;

  let dx = 0;
  let dy = 0;
  if (targetRectX.left < vRect.left + pad) {
    dx = vRect.left + pad - targetRectX.left;
  } else if (targetRectX.right > vRect.right - pad) {
    dx = vRect.right - pad - targetRectX.right;
  }

  if (targetRectY.top < vRect.top + pad) {
    dy = vRect.top + pad - targetRectY.top;
  } else if (targetRectY.bottom > vRect.bottom - pad) {
    dy = vRect.bottom - pad - targetRectY.bottom;
  }

  if (dx !== 0 || dy !== 0) {
    state.panX += dx;
    state.panY += dy;
    applyTransform();
  }
}

/**
 * Khởi tạo kéo sơ đồ bằng Pointer Events, zoom Ctrl + cuộn và điều hướng bàn phím.
 * @returns {void}
 */
function initCanvasViewport() {
  if (state.canvasInitialized) return;
  const viewport = document.getElementById("mindmap-viewport");
  const nodesLayer = document.getElementById("mindmap-nodes");
  if (!viewport || !nodesLayer) return;
  state.canvasInitialized = true;

  /**
   * Giải phóng trạng thái kéo hiện tại khi nhả trỏ, hủy cảm ứng hoặc mất pointer capture.
   * @param {PointerEvent} [e] Sự kiện con trỏ kết thúc hoặc bị hủy.
   * @returns {void}
   */
  function endPointerPan(e) {
    if (state.activePointerId === null) return;
    if (e && e.pointerId !== undefined && e.pointerId !== state.activePointerId) return;

    if (state.dragThresholdMet && state.isDragging) {
      state.suppressClickUntil = performance.now() + 120;
    }

    // Nếu cử chỉ là vuốt dọc để cuộn trang hoặc bị hủy, khôi phục nguyên trạng pan gốc
    if (state.dragDirection === "vertical-ignored" || (e && e.type === "pointercancel")) {
      if (state.isDragging) {
        state.panX = state.dragOriginPanX;
        state.panY = state.dragOriginPanY;
        applyTransform();
      }
    }

    try {
      if (e && e.pointerId !== undefined && viewport.hasPointerCapture?.(e.pointerId)) {
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
    /**
     * Ghi nhận điểm bắt đầu tương tác trên canvas, bỏ qua nút đóng/mở nhánh và Drawer.
     * @param {PointerEvent} e Sự kiện nhấn chuột hoặc chạm cảm ứng.
     * @returns {void}
     */
    (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if (e.target.closest(".mindmap-node__toggle") || e.target.closest(".mindmap-drawer")) return;

      hideOutcomeHelp();
      state.activePointerId = e.pointerId;
      state.pointerStartX = e.clientX;
      state.pointerStartY = e.clientY;
      state.dragOriginPanX = state.panX;
      state.dragOriginPanY = state.panY;
      state.dragAnchorX = e.clientX;
      state.dragAnchorY = e.clientY;
      state.dragStartX = e.clientX - state.panX;
      state.dragStartY = e.clientY - state.panY;
      state.dragThresholdMet = false;
      state.dragDirection = null;
      state.isDragging = false;
    },
  );

  window.addEventListener(
    "pointermove",
    /**
     * Xử lý kéo sơ đồ: hỗ trợ Kéo 2D tự do và mở khóa kéo 2 chiều sau ngưỡng vuốt ngang.
     * @param {PointerEvent} e Sự kiện di chuyển con trỏ hoặc ngón tay.
     * @returns {void}
     */
    (e) => {
      if (state.activePointerId === null || e.pointerId !== state.activePointerId) return;

      const dx = e.clientX - state.pointerStartX;
      const dy = e.clientY - state.pointerStartY;
      const isMouse = e.pointerType === "mouse";

      if (!state.dragThresholdMet) {
        if (Math.hypot(dx, dy) < CONFIG.DRAG_THRESHOLD) return;
        state.dragThresholdMet = true;

        if (state.pan2DMode || isMouse || isMapExpanded()) {
          // Chuột, chế độ Kéo 2D hoặc toàn màn hình: kéo tự do cả hai chiều X và Y
          state.dragDirection = "all";
          state.isDragging = true;
          viewport.classList.add("mindmap-viewport--dragging");
          if (isMouse) {
            try {
              viewport.setPointerCapture?.(e.pointerId);
            } catch {
              // Bỏ qua nếu môi trường không hỗ trợ pointer capture
            }
          }
        } else {
          // Cảm ứng khi chưa bật Kéo 2D: giữ cuộn trang khi vuốt dọc, mở kéo chéo khi vượt ngưỡng ngang
          const absDx = Math.abs(dx);
          const absDy = Math.abs(dy);
          if (absDy >= absDx) {
            state.dragDirection = "vertical-ignored";
            state.isDragging = false;
            return;
          }

          // Ghi nhận điểm neo tại thời điểm mở khóa kéo ngang để di chuyển mượt cả panX và panY
          state.dragDirection = "unlocked";
          state.dragAnchorX = e.clientX;
          state.dragAnchorY = e.clientY;
          state.isDragging = true;
          viewport.classList.add("mindmap-viewport--dragging");
        }
      }

      if (!state.isDragging) return;
      if (isMouse && (e.buttons & 1) === 0) {
        endPointerPan(e);
        return;
      }

      if (state.dragDirection === "all") {
        state.panX = e.clientX - state.dragStartX;
        state.panY = e.clientY - state.dragStartY;
        applyTransform();
      } else if (state.dragDirection === "unlocked") {
        state.panX = state.dragOriginPanX + (e.clientX - state.dragAnchorX);
        state.panY = state.dragOriginPanY + (e.clientY - state.dragAnchorY);
        applyTransform();
      }
    },
  );

  window.addEventListener("pointerup", endPointerPan);
  window.addEventListener("pointercancel", endPointerPan);
  window.addEventListener("blur", endPointerPan);
  viewport.addEventListener("keydown", handleViewportKeydown);
  nodesLayer.addEventListener("focusin", ensureFocusedNodeVisible, true);

  viewport.addEventListener(
    "wheel",
    /**
     * Zoom quanh vị trí con trỏ khi giữ Ctrl; cuộn thường giữ nguyên hành vi cuộn trang.
     * @param {WheelEvent} e Sự kiện cuộn chuột trên canvas.
     * @returns {void}
     */
    (e) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      hideOutcomeHelp();
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

/**
 * Áp dụng tọa độ pan và tỷ lệ zoom hiện tại lên sân khấu sơ đồ.
 * @returns {void}
 */
function applyTransform() {
  const stage = document.getElementById("mindmap-stage");
  if (stage) {
    stage.style.transform = `translate(${state.panX}px, ${state.panY}px) scale(${state.scale})`;
  }
}

/* ==========================================================================
   CHẾ ĐỘ DANH SÁCH TUẦN TỰ (HẬU THỨ TỰ)
   ========================================================================== */

/**
 * Dựng toàn bộ chế độ Danh sách bằng các thẻ details/summary theo từng trụ cột.
 * @param {object} topic Chủ đề nguồn từ JSON.
 * @returns {void}
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
  container.append(
    element(
      "p",
      "knowledge-list__hint",
      "Danh sách đặt kiến thức tiên quyết trước kiến thức phụ thuộc; các nhánh độc lập không bắt buộc học tuần tự.",
    ),
    fragment,
  );
}

/**
 * Tạo một khối accordion trụ cột trong chế độ Danh sách, mở sẵn trụ cột đầu tiên.
 * @param {Keyword} keyword Keyword trụ cột gốc của chủ đề.
 * @param {number} index Chỉ số thứ tự trụ cột.
 * @returns {HTMLElement} Thẻ details chứa danh sách mục kiến thức theo thứ tự học.
 */
function createPillarCard(keyword, index) {
  const card = document.createElement("details");
  card.className = "knowledge-section";
  card.open = index === 0;

  const nodes = flattenKnowledge(keyword);
  const summary = element("summary", "knowledge-section__summary");
  summary.append(
    element("span", "knowledge-section__title", keyword.name),
    element("span", "knowledge-section__count", nodes.length + " mục kiến thức"),
  );

  const list = element("ul", "knowledge-list");
  for (const node of nodes) {
    list.append(createKnowledgeItem(node, node === keyword));
  }

  card.append(summary, list);
  return card;
}

/**
 * Trải phẳng cây kiến thức theo thứ tự hậu thứ tự (con trước cha), không làm thay đổi nguồn.
 * @param {Keyword} keyword Keyword gốc của nhánh cần trải phẳng.
 * @returns {Keyword[]} Danh sách kiến thức đặt tiên quyết trước kiến thức phụ thuộc.
 */
function flattenKnowledge(keyword) {
  const nodes = [];
  for (const child of keyword.children || []) nodes.push(...flattenKnowledge(child));
  nodes.push(keyword);
  return nodes;
}

/**
 * Tạo một mục kiến thức phẳng kèm badge phân tầng cấp độ trung tính, đầu ra và môn học gợi ý.
 * @param {Keyword} keyword Đối tượng kiến thức nguồn.
 * @param {boolean} [isRootKeyword=false] True nếu đây là trụ cột đích của nhánh đang xem.
 * @returns {HTMLLIElement} Phần tử danh sách kiến thức hoàn chỉnh.
 */
function createKnowledgeItem(keyword, isRootKeyword = false) {
  const item = element("li", "knowledge-list__item");
  const isLeaf = !keyword.children || keyword.children.length === 0;
  const levelClass = isRootKeyword
    ? "badge--level-pillar"
    : isLeaf
      ? "badge--level-leaf"
      : "badge--level-intermediate";
  const levelLabel = isRootKeyword
    ? "Kiến thức cốt lõi"
    : isLeaf
      ? "Nền tảng tiên quyết"
      : "Kiến thức cơ sở";

  const header = element("div", "knowledge-list__header");
  header.append(
    element("span", "badge " + levelClass, levelLabel),
    element("h3", "knowledge-list__name", keyword.name),
  );

  item.append(
    header,
    element(
      "p",
      "knowledge-list__outcome",
      "Đầu ra kỳ vọng: " + (keyword.outcome || "Chưa bổ sung."),
    ),
  );

  if (keyword.children?.length) {
    item.append(
      element(
        "p",
        "knowledge-list__prerequisites",
        "Cần học trước: " + keyword.children.map((child) => child.name).join("; "),
      ),
    );
  }

  if (keyword.subjects?.length) {
    const subjects = element("div", "knowledge-list__subjects");
    subjects.append("Môn học gợi ý: ", ...keyword.subjects.map(createSubjectBadge));
    item.append(subjects);
  }

  return item;
}

/* ==========================================================================
   THÔNG BÁO LỖI & TRỢ GIÚP ĐẦU RA KIẾN THỨC
   ========================================================================== */

/**
 * Hiển thị thông báo không tìm thấy chủ đề khi URL không khớp chính xác.
 * @returns {void}
 */
function renderTopicNotFound() {
  renderPageMessage(
    document.getElementById("main-content"),
    "Không tìm thấy chủ đề",
    "Đường dẫn thiếu hoặc không khớp nhóm, tên chủ đề và email giảng viên.",
    "../index.html",
  );
}

/**
 * Hiển thị thông báo lỗi tải dữ liệu kèm liên kết quay lại trang khám phá.
 * @param {string} message Thông điệp lỗi chi tiết.
 * @returns {void}
 */
function renderErrorMessage(message) {
  renderPageMessage(
    document.getElementById("main-content"),
    "Không thể tải chủ đề",
    message,
    "../index.html",
  );
}

/**
 * Ẩn và dọn sạch tooltip đầu ra kiến thức đang hiển thị cùng thuộc tính aria-describedby.
 * @returns {void}
 */
function hideOutcomeHelp() {
  document.getElementById("knowledge-outcome-help")?.remove();
  document
    .querySelector('[aria-describedby="knowledge-outcome-help"]')
    ?.removeAttribute("aria-describedby");
}

/**
 * Gắn trợ giúp đầu ra kiến thức cho thẻ node khi hover hoặc nhận focus bàn phím.
 * @param {HTMLElement} target Thẻ button node kiến thức (mindmap-node__card).
 * @param {string} outcome Nội dung đầu ra kỳ vọng từ JSON.
 * @returns {void}
 */
function attachOutcomeHelp(target, outcome) {
  if (!outcome) return;

  target.addEventListener("mouseenter", showHelp);
  target.addEventListener("mouseleave", hideOutcomeHelp);
  target.addEventListener("focusin", showHelp);
  target.addEventListener("focusout", hideOutcomeHelp);
  target.addEventListener("pointerdown", hideOutcomeHelp);
  target.addEventListener("keydown", dismissHelp);

  /**
   * Hiển thị hộp chú giải đầu ra gần thẻ node; bỏ qua nếu trỏ/focus thuộc nút toggle.
   * @param {Event} event Sự kiện hover hoặc focus kích hoạt tooltip.
   * @returns {void}
   */
  function showHelp(event) {
    if (event?.target?.closest?.(".mindmap-node__toggle")) return;
    if (state.suppressOutcomeHelp) return;

    hideOutcomeHelp();
    const box = element("div", "knowledge-help", outcome);
    box.id = "knowledge-outcome-help";
    box.setAttribute("role", "tooltip");
    target.setAttribute("aria-describedby", box.id);
    document.body.append(box);

    const rect = target.getBoundingClientRect();
    const bounds = box.getBoundingClientRect();
    box.style.left = Math.max(12, Math.min(rect.left, innerWidth - bounds.width - 12)) + "px";
    box.style.top =
      Math.max(
        12,
        rect.top >= bounds.height + 20
          ? rect.top - bounds.height - 8
          : Math.min(rect.bottom + 8, innerHeight - bounds.height - 12),
      ) + "px";
  }

  /**
   * Đóng tooltip đầu ra khi người dùng nhấn phím Escape.
   * @param {KeyboardEvent} event Sự kiện bàn phím trên thẻ node.
   * @returns {void}
   */
  function dismissHelp(event) {
    if (event.key === "Escape") hideOutcomeHelp();
  }
}
