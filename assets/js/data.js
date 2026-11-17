/** @file Hợp đồng dữ liệu và URL dùng chung cho tất cả các trang. */
const projectRoot = new URL("../../", import.meta.url);
const cache = new Map();
/** Chuẩn hóa email. @param {string} value Email đầu vào. @returns {string} Email dùng đối chiếu. */
export function normalizeEmail(value) {
  const email = String(value || "").trim().toLowerCase();
  // Giữ tương thích URL trước khi sửa lỗi chính tả trong dữ liệu.
  return email === "hunglkt@uit.edu.vn" ? "hunglk@uit.edu.vn" : email;
}
/** Chuẩn hóa tiếng Việt để tìm kiếm. @param {string} value Văn bản. @returns {string} Chuỗi không dấu, chữ thường. */
export function searchText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .trim();
}
/** Tải và cache JSON trong phiên trang. @param {string} file Tên file thuộc data/. @returns {Promise<object>} Dữ liệu JSON. */
export async function loadJson(file) {
  if (!cache.has(file)) {
    const request = fetch(new URL("data/" + file, projectRoot))
      .then(checkResponse)
      .catch(handleLoadFailure);
    cache.set(file, request);
  }
  return cache.get(file);
  /** Kiểm tra HTTP trước khi parse. @param {Response} response Phản hồi. @returns {Promise<object>} JSON đã parse. */

  function checkResponse(response) {
    if (!response.ok) throw new Error("Không tải được " + file);
    return response.json();
  }
  /** Cho phép thử lại khi request lỗi. @param {Error} error Lỗi tải. @returns {never} Ném lỗi cho UI xử lý. */

  function handleLoadFailure(error) {
    cache.delete(file);
    throw error;
  }
}
/** Kiểm tra dữ liệu nghiên cứu tối thiểu. @returns {Promise<object>} Dữ liệu nghiên cứu. */
export async function loadResearch() {
  const data = await loadJson("research-data.json");
  if (!Array.isArray(data.groups) || data.groups.some(invalidGroup))
    throw new Error("Dữ liệu nghiên cứu không hợp lệ.");
  return data;
  /** Kiểm tra group. @param {object} item Group nguồn. @returns {boolean} Có lỗi cấu trúc. */

  function invalidGroup(item) {
    return !item.group?.id || !item.group?.name || !Array.isArray(item.topics);
  }
}
/** Đọc danh bạ. @returns {Promise<object[]>} Giảng viên. */
export async function loadLecturers() {
  const data = await loadJson("lecturers.json");
  if (!Array.isArray(data.lecturers) || data.lecturers.some(invalidLecturer))
    throw new Error("Dữ liệu giảng viên không hợp lệ.");
  return data.lecturers;
  /** Kiểm tra khóa tối thiểu. @param {object} lecturer Giảng viên. @returns {boolean} Có lỗi cấu trúc. */

  function invalidLecturer(lecturer) {
    return !lecturer.name || !lecturer.email;
  }
}
/** Trải danh sách, giữ nguyên thứ tự nguồn. @param {object} data Dữ liệu nghiên cứu. @returns {object[]} Các cặp group/topic. */
export function flattenTopics(data) {
  return data.groups.flatMap(expandGroup);
  /** Ghép group cho từng topic. @param {object} entry Nhóm. @returns {object[]} Bản ghi có context. */

  function expandGroup(entry) {
    return entry.topics.map(
      pairTopic,
    ); /** Gắn group. @param {object} topic Chủ đề. @returns {object} Context chủ đề. */
    function pairTopic(topic) {
      return { group: entry.group, topic };
    }
  }
}
/** Tạo link chủ đề dùng chung. @param {object} group Nhóm. @param {object} topic Chủ đề. @returns {string} URL tương thích subpath. */
export function topicUrl(group, topic) {
  const url = new URL("topics/detail/index.html", projectRoot);
  url.search = new URLSearchParams({
    group: group.id,
    topic: topic.name,
    email: normalizeEmail(topic.lecturer.email),
  });
  return url.href;
}
/** Tạo link hồ sơ. @param {string} email Email. @returns {string} URL hồ sơ. */
export function lecturerUrl(email) {
  const url = new URL("lecturers/detail/index.html", projectRoot);
  url.search = new URLSearchParams({ email: normalizeEmail(email) });
  return url.href;
}
/** Đọc định danh chủ đề trên URL. @param {string} search Query URL. @returns {object} Khóa đối chiếu. */
export function readTopicQuery(search = location.search) {
  const query = new URLSearchParams(search);
  return {
    group: query.get("group"),
    topic: query.get("topic"),
    email: normalizeEmail(query.get("email")),
  };
}
/** Tìm duy nhất một chủ đề; không có fallback. @param {object} data JSON nghiên cứu. @param {object} query Khóa URL. @returns {object|null} Cặp topic/group. */
export function findTopic(data, query) {
  if (!query.group || !query.topic || !query.email) return null;
  const matches = flattenTopics(data).filter(matchesQuery);
  return matches.length === 1 ? matches[0] : null;
  /** Đối chiếu đủ ba thành phần. @param {object} entry Chủ đề kèm nhóm. @returns {boolean} Khớp URL. */

  function matchesQuery(entry) {
    return (
      entry.group.id === query.group &&
      entry.topic.name === query.topic &&
      normalizeEmail(entry.topic.lecturer.email) === query.email
    );
  }
}
/** Tạo DOM an toàn, dữ liệu chỉ vào textContent. @param {string} tag Thẻ HTML. @param {string} className Lớp CSS. @param {string|number} text Nội dung. @returns {HTMLElement} Node. */
export function element(tag, className = "", text = "") {
  const node = document.createElement(tag);
  if (className) node.className = className;
  node.textContent = String(text);
  return node;
}
/** Chỉ chấp nhận HTTP(S). @param {string} value URL. @returns {string|null} URL an toàn. */
export function safeWebUrl(value) {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}
/** Tạo link ngoài an toàn. @param {string} label Nội dung. @param {string} value URL. @returns {HTMLAnchorElement|null} Link hoặc null. */
export function externalLink(label, value) {
  const href = safeWebUrl(value);
  if (!href) return null;
  const link = element("a", "", label);
  link.href = href;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  return link;
}
/** Khối lỗi giữ h1 hợp lệ. @param {HTMLElement} main Main bị thay thế. @param {string} title Tiêu đề. @param {string} message Nội dung. @param {string} backUrl Link quay về. @returns {void} */
export function renderPageMessage(main, title, message, backUrl) {
  const box = element("section", "container status-panel");
  box.append(element("h1", "", title), element("p", "", message));
  const link = element("a", "btn", "Quay về danh sách");
  link.href = backUrl;
  box.append(link);
  main.replaceChildren(box);
}
/** Avatar với fallback khi thiếu hoặc lỗi ảnh. @param {object} lecturer Giảng viên. @param {string} className Lớp avatar. @returns {HTMLElement} Khung avatar. */
export function avatar(lecturer, className) {
  const initials = getLecturerInitials(lecturer.name);
  const box = element("div", className, initials);
  box.setAttribute("aria-hidden", "true");
  if (lecturer.photo?.path) {
    const photo = resolvePhotoUrl(lecturer.photo.path);
    const url = photo ? new URL(photo) : null;
    // Ảnh chỉ từ HTTP(S); không nhận data/javascript hay file nội bộ máy.
    if (url) {
      const image = element("img");
      image.src = url.href;
      image.alt = lecturer.photo.alt || lecturer.name;
      image.loading = "lazy";
      image.addEventListener("error", restoreInitials, { once: true });
      box.replaceChildren(image);
    }
  }
  return box;
  /** Ảnh lỗi trở về chữ cái. @returns {void} */
  function restoreInitials() {
    box.textContent = initials;
  }
}

/** Kiểm tra đường dẫn ảnh, bỏ qua URL sai thay vì làm hỏng hồ sơ.
 * @param {string} value Đường dẫn ảnh từ JSON.
 * @returns {string|null} URL ảnh HTTP(S) hợp lệ hoặc null.
 */
function resolvePhotoUrl(value) {
  try {
    const url = new URL(value, projectRoot);
    return ["http:", "https:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

/**
 * Đệ quy đếm tổng số mục kiến thức trong cây keyword và số môn học gợi ý duy nhất.
 * @param {object[]} keywords Danh sách nút kiến thức của một nhánh hoặc toàn chủ đề.
 * @param {Set<string>} [subjects] Tập hợp dùng để tích lũy tên môn học duy nhất qua đệ quy.
 * @returns {{nodeCount: number, subjectCount: number}} Tổng số mục kiến thức và số môn gợi ý duy nhất.
 */
export function countTopicNodes(keywords, subjects = new Set()) {
  if (!Array.isArray(keywords) || !keywords.length) {
    return { nodeCount: 0, subjectCount: subjects.size };
  }

  let nodeCount = 0;
  for (const keyword of keywords) {
    if (!keyword || typeof keyword !== "object") continue;
    nodeCount++;

    // Gom tên môn học hợp lệ vào Set để tự động khử trùng lặp giữa các nhánh.
    if (Array.isArray(keyword.subjects)) {
      for (const subject of keyword.subjects) {
        const name = String(subject || "").trim();
        if (name) subjects.add(name);
      }
    }

    // Đệ quy xuống các kiến thức tiên quyết cấp sâu hơn và chia sẻ cùng Set môn học.
    if (Array.isArray(keyword.children) && keyword.children.length) {
      nodeCount += countTopicNodes(keyword.children, subjects).nodeCount;
    }
  }

  return { nodeCount, subjectCount: subjects.size };
}

/**
 * Tạo chuỗi tóm tắt các trụ cột kiến thức chính và quy mô lộ trình từ dữ liệu thật của chủ đề.
 * @param {object} topic Đối tượng chủ đề từ JSON nghiên cứu.
 * @returns {string} Chuỗi tóm tắt gọn hoặc chuỗi rỗng nếu chủ đề chưa có dữ liệu keyword.
 */
export function summarizeTopicScope(topic) {
  const keywords = Array.isArray(topic?.keywords) ? topic.keywords : [];
  if (!keywords.length) return "";

  // Chỉ lấy tên các trụ cột kiến thức ở tầng gốc để giữ tóm tắt ngắn gọn và trực quan.
  const rootNames = keywords.map((item) => String(item?.name || "").trim()).filter(Boolean);
  const { nodeCount, subjectCount } = countTopicNodes(keywords);
  const parts = [];

  if (rootNames.length) {
    parts.push("Kiến thức chính: " + rootNames.join(" · "));
  }
  parts.push(nodeCount + " mục kiến thức");

  // Chỉ hiển thị số môn gợi ý khi chủ đề thực sự có môn học liên kết (> 0).
  if (subjectCount > 0) {
    parts.push(subjectCount + " môn gợi ý");
  }

  return parts.join(" · ");
}

/** Tạo hàng chủ đề dùng chung cho khám phá và hồ sơ giảng viên.
 * @param {{group: object, topic: object}} entry Chủ đề và nhóm nguồn.
 * @param {number} [headingLevel=2] Cấp heading của tên đề tài (2 hoặc 3).
 * @returns {HTMLElement} Article có link chủ đề và link giảng viên độc lập.
 */
export function createTopicRow(entry, headingLevel = 2) {
  const { group, topic } = entry;
  const row = element("article", "topic-row");
  const badge = element("span", "badge badge--" + group.id + " topic-row__group", group.name);
  const heading = element(headingLevel === 3 ? "h3" : "h2", "topic-row__title");
  const link = element("a", "", topic.name);
  link.href = topicUrl(group, topic);
  heading.append(link);

  // Tóm tắt trụ cột đặt bằng phần tử riêng (.topic-row__summary) để không bị xóa cùng .topic-row__meta.
  const summaryText = summarizeTopicScope(topic);
  const summary = summaryText ? element("p", "topic-row__summary", summaryText) : null;

  const meta = element("p", "topic-row__meta", "Hướng dẫn: ");
  const lecturer = element("a", "", topic.lecturer.name);
  lecturer.href = lecturerUrl(topic.lecturer.email);
  meta.append(lecturer);

  if (summary) row.append(heading, summary, meta, badge);
  else row.append(heading, meta, badge);
  return row;
}

/** Lấy chữ viết tắt tên, bỏ học vị và chú thích đơn vị. @param {string} rawName Tên nguồn. @returns {string} Chữ đại diện. */
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
