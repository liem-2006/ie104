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
 * Chuẩn NotebookLM:
 * - Khởi đầu hiển thị gọn (Chủ đề & Trụ cột).
 * - Bấm vào node cha để xổ ra các node con kế cận, tiếp tục lần lượt tới node lá.
 * - Vẽ đường cong Bezier và mũi tên chỉ rõ hướng phân nhánh.
 * - Tự động tính độ rộng cột động, tránh chồng chữ.
 * -  Vanilla JS chuẩn môn học IE104.
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
};

document.addEventListener(
  "DOMContentLoaded",
  /** Xử lý sự kiện của thành phần.
   * @returns {*} Kết quả của thao tác.
   */
  () => {
    initTopicDetailPage();
  },
);

/** * Khởi tạo toàn bộ trang chi tiết
 * @returns {void} Không trả về giá trị.
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
    renderMindMap();
    setView(matchMedia("(max-width:767px)").matches ? "cards" : "mindmap");
    requestAnimationFrame(fitToScreen);
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
 * @param {*} data Dữ liệu nguồn.
 * @param {*} currentTopic Phần tử đang xử lý.
 * @returns {void} Không trả về giá trị.
 */

function renderQuickTopicSwitcher(data, currentTopic) {
  const container = document.getElementById("topic-switcher-container");
  if (!container) return;

  container.innerHTML = "";

  const label = document.createElement("label");
  label.setAttribute("for", "topic-select-dropdown");
  label.className = "topic-switcher__label";
  label.textContent = "🚀 Chọn nhanh chủ đề nghiên cứu:";

  const select = document.createElement("select");
  select.id = "topic-select-dropdown";
  select.className = "topic-switcher__select";

  data.groups.forEach(
    /** Áp dụng thao tác cho từng phần tử trong phép duyệt.
     * @param {*} g Nhóm nguồn.
     * @returns {*} Kết quả của thao tác.
     */
    (g) => {
      const optgroup = document.createElement("optgroup");
      optgroup.label = `[${g.group.name}]`;

      g.topics.forEach(
        /** Áp dụng thao tác cho từng phần tử trong phép duyệt.
         * @param {*} t Chủ đề nguồn.
         * @returns {*} Kết quả của thao tác.
         */
        (t) => {
          const opt = document.createElement("option");
          opt.value = topicUrl(g.group, t);
          opt.textContent = `${t.name} — ${t.lecturer.name}`;

          if (g.group.id === state.currentGroup.id && t.name === currentTopic.name && t.lecturer.email === currentTopic.lecturer.email) {
            opt.selected = true;
          }
          optgroup.appendChild(opt);
        },
      );

      select.appendChild(optgroup);
    },
  );

  select.addEventListener(
    "change",
    /** Xử lý sự kiện của thành phần.
     * @param {Event} e Sự kiện trình duyệt.
     * @returns {*} Kết quả của thao tác.
     */
    (e) => {
      if (e.target.value) {
        window.location.assign(e.target.value);
      }
    },
  );

  container.appendChild(label);
  container.appendChild(select);
}

/* ==========================================================================
   MIND MAP ENGINE - NOTEBOOK LM STYLE
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
   * @param {object} kw Keyword nguồn.
   * @param {number} depth Độ sâu trong cây.
   * @param {object} parentNode Node cha.
   * @returns {object} Kết quả của thao tác.
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

    if (Array.isArray(kw.children) && kw.children.length > 0) {
      kw.children.forEach(
        /** Áp dụng thao tác cho từng phần tử trong phép duyệt.
         * @param {object} childKw Keyword con.
         * @returns {*} Kết quả của thao tác.
         */
        (childKw) => {
          node.children.push(convertKeyword(childKw, depth + 1, node));
        },
      );
    }

    return node;
  }

  if (Array.isArray(topic.keywords)) {
    topic.keywords.forEach(
      /** Áp dụng thao tác cho từng phần tử trong phép duyệt.
       * @param {object} kw Keyword nguồn.
       * @returns {*} Kết quả của thao tác.
       */
      (kw) => {
        state.rootNode.children.push(convertKeyword(kw, 1, state.rootNode));
      },
    );
  }
}

/** Thu thập các node đang mở và các đường nối.
 * @returns {object} Kết quả của thao tác.
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
      node.children.forEach(
        /** Áp dụng thao tác cho từng phần tử trong phép duyệt.
         * @param {*} child Phần tử đang xử lý.
         * @returns {*} Kết quả của thao tác.
         */
        (child) => {
          links.push({ parent: node, child: child });
          traverse(child);
        },
      );
    }
  }

  traverse(state.rootNode);
  return { visibleNodes, links };
}

/** Đo các node, bố trí cây và vẽ đường nối tiên quyết.
 * @returns {void} Không trả về giá trị.
 */

function renderMindMap() {
  const nodesLayer = document.getElementById("mindmap-nodes");
  const svgLayer = document.getElementById("mindmap-svg");
  if (!nodesLayer || !svgLayer) return;

  nodesLayer.innerHTML = "";

  // Giữ lại defs và xóa các đường link cũ
  let linksGroup = document.getElementById("mindmap-links-group");
  if (!linksGroup) {
    linksGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    linksGroup.id = "mindmap-links-group";
    svgLayer.appendChild(linksGroup);
  }
  linksGroup.innerHTML = "";

  // Đảm bảo defs chứa đầu mũi tên luôn sẵn sàng
  ensureSvgDefs(svgLayer);

  const { visibleNodes, links } = getVisibleNodesAndLinks();

  // 1. Render tất cả các node vào DOM trước để lấy kích thước thật của chữ sau khi wrap
  visibleNodes.forEach(
    /** Áp dụng thao tác cho từng phần tử trong phép duyệt.
     * @param {object} node Node kiến thức.
     * @returns {*} Kết quả của thao tác.
     */
    (node) => {
      const el = createNodeDomElement(node);
      nodesLayer.appendChild(el);
      node.domElement = el;
    },
  );

  // 2. Chờ DOM tính toán kích thước thực tế
  requestAnimationFrame(
    /** Áp dụng thao tác cho từng phần tử trong phép duyệt.
     * @returns {*} Kết quả của thao tác.
     */
    () => {
      // Đo kích thước từng node thực tế
      visibleNodes.forEach(
        /** Áp dụng thao tác cho từng phần tử trong phép duyệt.
         * @param {object} node Node kiến thức.
         * @returns {*} Kết quả của thao tác.
         */
        (node) => {
          const el = node.domElement;
          if (el) {
            node.width = el.offsetWidth || 180;
            node.height = el.offsetHeight || 42;
          } else {
            node.width = 180;
            node.height = 42;
          }
        },
      );

      // 3. Tính toán vị trí X theo độ rộng động của từng cột (Dynamic Column X)
      const depthMaxRight = {};
      const maxDepth = Math.max(
        ...visibleNodes.map(
          /** Áp dụng thao tác cho từng phần tử trong phép duyệt.
           * @param {object} n Node đang xét.
           * @returns {*} Kết quả của thao tác.
           */
          (n) => n.depth,
        ),
      );

      // Khởi tạo cột 0 (Root)
      state.rootNode.x = CONFIG.START_X;
      depthMaxRight[0] = state.rootNode.x + state.rootNode.width;

      for (let d = 1; d <= maxDepth; d++) {
        const prevRight = depthMaxRight[d - 1] || 250;
        const colX = prevRight + CONFIG.MIN_COL_GAP;

        let colMaxRight = colX;
        visibleNodes
          .filter(
            /** Áp dụng thao tác cho từng phần tử trong phép duyệt.
             * @param {object} n Node đang xét.
             * @returns {*} Kết quả của thao tác.
             */
            (n) => n.depth === d,
          )
          .forEach(
            /** Áp dụng thao tác cho từng phần tử trong phép duyệt.
             * @param {object} n Node đang xét.
             * @returns {*} Kết quả của thao tác.
             */
            (n) => {
              n.x = colX;
              colMaxRight = Math.max(colMaxRight, n.x + n.width);
            },
          );

        depthMaxRight[d] = colMaxRight;
      }

      // 4. Tính toán vị trí Y theo cây phân cấp chống chồng lấn
      const GAP_Y = CONFIG.NODE_MARGIN_Y;

      // Bước 4.1: Tính khoảng không gian chiều dọc (span) cần thiết cho từng cây con

      /** Tính chiều cao cần thiết của một cây con.
       * @param {object} node Node kiến thức.
       * @returns {number} Kết quả của thao tác.
       */
      function computeSubtreeSpan(node) {
        if (!node.children || node.children.length === 0 || node.collapsed) {
          node.span = node.height + GAP_Y;
          return node.span;
        }
        let childrenSpan = 0;
        node.children.forEach(
          /** Áp dụng thao tác cho từng phần tử trong phép duyệt.
           * @param {*} c Node con.
           * @returns {*} Kết quả của thao tác.
           */
          (c) => {
            childrenSpan += computeSubtreeSpan(c);
          },
        );
        // Khoảng không gian của cây con ít nhất phải bằng chiều cao của chính node cha + đệm
        node.span = Math.max(childrenSpan, node.height + GAP_Y);
        return node.span;
      }
      computeSubtreeSpan(state.rootNode);

      // Bước 4.2: Gán tọa độ Y theo phân bổ không gian span

      /** Phân bố vị trí dọc theo chiều cao cây con.
       * @param {object} node Node kiến thức.
       * @param {number} startY Vị trí dọc bắt đầu.
       * @returns {void} Không trả về giá trị.
       */
      function assignY(node, startY) {
        if (!node.children || node.children.length === 0 || node.collapsed) {
          node.y = startY + node.span / 2;
        } else {
          let curY = startY;
          node.children.forEach(
            /** Áp dụng thao tác cho từng phần tử trong phép duyệt.
             * @param {*} c Node con.
             * @returns {*} Kết quả của thao tác.
             */
            (c) => {
              assignY(c, curY);
              curY += c.span;
            },
          );
          const firstChild = node.children[0];
          const lastChild = node.children[node.children.length - 1];
          node.y = (firstChild.y + lastChild.y) / 2;
        }
      }
      assignY(state.rootNode, 45);

      // Bước 4.3: Quét kiểm tra va chạm trên từng cột (Depth) và đẩy dồn nhánh dưới nếu có chạm
      for (let d = 0; d <= maxDepth; d++) {
        const colNodes = visibleNodes
          .filter(
            /** Áp dụng thao tác cho từng phần tử trong phép duyệt.
             * @param {object} n Node đang xét.
             * @returns {*} Kết quả của thao tác.
             */
            (n) => n.depth === d,
          )
          .sort(
            /** Áp dụng thao tác cho từng phần tử trong phép duyệt.
             * @param {object} a Bản ghi thứ nhất.
             * @param {object} b Bản ghi thứ hai.
             * @returns {*} Kết quả của thao tác.
             */
            (a, b) => a.y - b.y,
          );
        for (let i = 1; i < colNodes.length; i++) {
          const prev = colNodes[i - 1];
          const curr = colNodes[i];
          const prevBottom = prev.y + prev.height / 2;
          const currTop = curr.y - curr.height / 2;
          const overlap = prevBottom + GAP_Y - currTop;
          if (overlap > 0) {
            /** Dịch cây con để giảm va chạm.
             * @param {object} n Node đang xét.
             * @param {number} dy Khoảng dịch dọc.
             * @returns {void} Không trả về giá trị.
             */
            function shiftSubtree(n, dy) {
              n.y += dy;
              if (!n.collapsed && n.children) {
                n.children.forEach(
                  /** Áp dụng thao tác cho từng phần tử trong phép duyệt.
                   * @param {*} c Node con.
                   * @returns {*} Kết quả của thao tác.
                   */
                  (c) => shiftSubtree(c, dy),
                );
              }
            }
            shiftSubtree(curr, overlap);
          }
        }
      }

      // Bước 4.4: Căn giữa lại các node cha theo trung điểm các con

      /** Căn node cha theo các node con đang hiển thị.
       * @param {object} node Node kiến thức.
       * @returns {void} Không trả về giá trị.
       */
      function reCenterParents(node) {
        if (node.children && node.children.length > 0 && !node.collapsed) {
          node.children.forEach(
            /** Áp dụng thao tác cho từng phần tử trong phép duyệt.
             * @param {*} c Node con.
             * @returns {*} Kết quả của thao tác.
             */
            (c) => reCenterParents(c),
          );
          const firstChild = node.children[0];
          const lastChild = node.children[node.children.length - 1];
          node.y = (firstChild.y + lastChild.y) / 2;
        }
      }
      reCenterParents(state.rootNode);

      // 5. Cập nhật vị trí tuyệt đối cho từng phần tử Node DOM
      visibleNodes.forEach(
        /** Áp dụng thao tác cho từng phần tử trong phép duyệt.
         * @param {object} node Node kiến thức.
         * @returns {*} Kết quả của thao tác.
         */
        (node) => {
          const el = node.domElement;
          if (!el) return;
          el.style.left = `${node.x}px`;
          el.style.top = `${node.y - node.height / 2}px`;
        },
      );

      // 6. Cập nhật kích thước SVG Canvas
      const maxY = Math.max(
        ...visibleNodes.map(
          /** Áp dụng thao tác cho từng phần tử trong phép duyệt.
           * @param {object} n Node đang xét.
           * @returns {*} Kết quả của thao tác.
           */
          (n) => n.y + n.height / 2,
        ),
      );
      const totalSvgWidth = (depthMaxRight[maxDepth] || 600) + 160;
      const totalSvgHeight = Math.max(maxY + 100, 560);
      svgLayer.setAttribute("width", totalSvgWidth);
      svgLayer.setAttribute("height", totalSvgHeight);
      svgLayer.style.width = `${totalSvgWidth}px`;
      svgLayer.style.height = `${totalSvgHeight}px`;
      svgLayer.style.maxWidth = "none";
      svgLayer.style.maxHeight = "none";

      // 7. Vẽ các đường cong Bezier và gắn đầu MŨI TÊN (Marker)
      links.forEach(
        /** Áp dụng thao tác cho từng phần tử trong phép duyệt.
         * @param {*} link Liên kết trong cây.
         * @returns {*} Kết quả của thao tác.
         */
        (link) => {
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

          const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          path.setAttribute(
            "d",
            `M ${startX} ${startY} C ${cx1} ${startY}, ${cx2} ${endY}, ${endX} ${endY}`,
          );
          path.setAttribute("class", "mindmap-curve");
          path.setAttribute("marker-start", "url(#mindmap-arrow)");
          path.setAttribute("data-parent", p.id);
          path.setAttribute("data-child", c.id);

          linksGroup.appendChild(path);
        },
      );
    },
  );
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
 * @returns {HTMLElement} Kết quả của thao tác.
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
      /** Xử lý sự kiện của thành phần.
       * @param {Event} e Sự kiện trình duyệt.
       * @returns {*} Kết quả của thao tác.
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
    /** Xử lý sự kiện của thành phần.
     * @returns {*} Kết quả của thao tác.
     */
    () => {
      selectNode(node);
    },
  );

  el.addEventListener(
    "keydown",
    /** Xử lý sự kiện của thành phần.
     * @param {Event} e Sự kiện trình duyệt.
     * @returns {*} Kết quả của thao tác.
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

/** * Đảo trạng thái mở/thu gọn của node và re-render Mind Map
 * @param {object} node Node kiến thức.
 * @returns {void} Không trả về giá trị.
 */

function toggleNode(node) {
  node.collapsed = !node.collapsed;
  renderMindMap();
  requestAnimationFrame(restoreToggleFocus);
  /** Giữ focus sau khi dựng lại node. @returns {void} */

  function restoreToggleFocus() {
    document.getElementById(node.id)?.querySelector("button")?.focus();
  }
}

/** Hiển thị đầu ra và môn học của keyword trong panel.
 * @param {object} node Node kiến thức.
 * @returns {void} Không trả về giá trị.
 */

function selectNode(node) {
  state.selectedNode = node;

  document.querySelectorAll(".mindmap-node").forEach(
    /** Áp dụng thao tác cho từng phần tử trong phép duyệt.
     * @param {*} el Phần tử DOM.
     * @returns {*} Kết quả của thao tác.
     */
    (el) => {
      el.classList.remove("mindmap-node--selected");
    },
  );
  if (node.domElement) {
    node.domElement.classList.add("mindmap-node--selected");
  }

  const drawer = document.getElementById("mindmap-drawer");
  const drawerTitle = document.getElementById("drawer-title");
  const drawerBadge = document.getElementById("drawer-badge");
  const drawerOutcome = document.getElementById("drawer-outcome");
  const drawerSubjects = document.getElementById("drawer-subjects");
  const drawerSubjectsSection = document.getElementById("drawer-subjects-section");
  const drawerPrereqs = document.getElementById("drawer-prereqs");
  const drawerPrereqsSection = document.getElementById("drawer-prereqs-section");

  if (!drawer) return;

  drawerTitle.textContent = node.name;
  drawerOutcome.textContent = node.outcome || "Chưa bổ sung đầu ra kiến thức.";

  if (node.isRoot) {
    drawerBadge.className = "badge badge--primary";
    drawerBadge.textContent = "🎯 MỤC TIÊU ĐỀ TÀI";
  } else if (node.depth === 1) {
    drawerBadge.className = "badge badge--primary";
    drawerBadge.textContent = "🏛️ TRỤ CỘT ĐỀ TÀI";
  } else if (!node.children || node.children.length === 0) {
    drawerBadge.className = "badge badge--success";
    drawerBadge.textContent = "🌱 NỀN TẢNG TIÊN QUYẾT (XUẤT PHÁT)";
  } else {
    drawerBadge.className = "badge badge--purple";
    drawerBadge.textContent = "🔷 KIẾN THỨC CƠ SỞ";
  }

  if (Array.isArray(node.subjects) && node.subjects.length > 0) {
    drawerSubjectsSection.style.display = "block";
    drawerSubjects.replaceChildren(...node.subjects.map(createSubjectBadge));
  } else {
    drawerSubjectsSection.style.display = "none";
  }

  if (Array.isArray(node.children) && node.children.length > 0) {
    drawerPrereqsSection.style.display = "block";
    drawerPrereqs.replaceChildren(...node.children.map(createPrerequisite));
  } else {
    drawerPrereqsSection.style.display = "none";
  }

  state.drawerTrigger = document.activeElement;
  drawer.hidden = false;
  if (!drawer.open) drawer.showModal();
  drawer.classList.add("mindmap-drawer--open");
  document.getElementById("drawer-close").focus();
}

/** * Đóng Drawer
 * @returns {void} Không trả về giá trị.
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

/** * Tự động căn vừa khung nhìn
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

/** * Khởi tạo các nút công cụ Toolbar
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
  renderMindMap();
  requestAnimationFrame(fitToScreen);
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
  if (state.activeView === "mindmap") fitToScreen();
}
/** Fullscreen với lỗi được xử lý trong UI. @returns {Promise<void>} */

async function toggleFullscreen() {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.querySelector(".mindmap-component").requestFullscreen();
    requestAnimationFrame(fitToScreen);
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
    /** Xử lý sự kiện của thành phần.
     * @param {Event} e Sự kiện trình duyệt.
     * @returns {*} Kết quả của thao tác.
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
    /** Xử lý sự kiện của thành phần.
     * @param {Event} e Sự kiện trình duyệt.
     * @returns {*} Kết quả của thao tác.
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
    /** Xử lý sự kiện của thành phần.
     * @returns {*} Kết quả của thao tác.
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
    /** Xử lý sự kiện của thành phần.
     * @param {Event} e Sự kiện trình duyệt.
     * @returns {*} Kết quả của thao tác.
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

  container.innerHTML = "";
  if (!topic.keywords || topic.keywords.length === 0) return;

  topic.keywords.forEach(
    /** Áp dụng thao tác cho từng phần tử trong phép duyệt.
     * @param {object} kw Keyword nguồn.
     * @param {number} index Vị trí trong danh sách.
     * @returns {*} Kết quả của thao tác.
     */
    (kw, index) => {
      const card = document.createElement("div");
      card.className = "roadmap-pillar";

      const label = document.createElement("div");
      label.className = "roadmap-pillar__label";
      label.textContent = `Trụ cột ${index + 1}: ${kw.name}`;
      card.appendChild(label);

      const tree = document.createElement("div");
      tree.className = "roadmap-tree";

      const nodeEl = createCardNodeRecursive(kw, 0);
      tree.appendChild(nodeEl);

      card.appendChild(tree);
      container.appendChild(card);
    },
  );
}

/** Dựng đệ quy keyword và các kiến thức tiên quyết.
 * @param {object} kw Keyword nguồn.
 * @param {number} depth Độ sâu trong cây.
 * @returns {HTMLElement} Kết quả của thao tác.
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
    branch.innerHTML = `<div class="roadmap-branch__connector"><span class="roadmap-branch__arrow">&uarr;</span> Tiên quyết cần học trước:</div>`;
    kw.children.forEach(
      /** Áp dụng thao tác cho từng phần tử trong phép duyệt.
       * @param {*} c Node con.
       * @returns {*} Kết quả của thao tác.
       */
      (c) => branch.appendChild(createCardNodeRecursive(c, depth + 1)),
    );
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
