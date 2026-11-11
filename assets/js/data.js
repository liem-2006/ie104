/** @file Hợp đồng dữ liệu và URL dùng chung cho tất cả các trang. */
const projectRoot = new URL('../../', import.meta.url);
const cache = new Map();
/** Chuẩn hóa email. @param {string} value Email đầu vào. @returns {string} Email dùng đối chiếu. */
export function normalizeEmail(value) { return String(value || '').trim().toLowerCase(); }
/** Chuẩn hóa tiếng Việt để tìm kiếm. @param {string} value Văn bản. @returns {string} Chuỗi không dấu, chữ thường. */
export function searchText(value) { return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/gi, 'd').toLowerCase().trim(); }
/** Tải và cache JSON trong phiên trang. @param {string} file Tên file thuộc data/. @returns {Promise<object>} Dữ liệu JSON. */
export async function loadJson(file) {
 if (!cache.has(file)) {
  const request = fetch(new URL('data/' + file, projectRoot)).then(checkResponse).catch(handleLoadFailure);
  cache.set(file, request);
 }
 return cache.get(file);
 /** Kiểm tra HTTP trước khi parse. @param {Response} response Phản hồi. @returns {Promise<object>} JSON đã parse. */
 function checkResponse(response) { if (!response.ok) throw new Error('Không tải được ' + file); return response.json(); }
 /** Cho phép thử lại khi request lỗi. @param {Error} error Lỗi tải. @returns {never} Ném lỗi cho UI xử lý. */
 function handleLoadFailure(error) { cache.delete(file); throw error; }
}
/** Kiểm tra dữ liệu nghiên cứu tối thiểu. @returns {Promise<object>} Dữ liệu nghiên cứu. */
export async function loadResearch() {
 const data = await loadJson('research-data.json');
 if (!Array.isArray(data.groups) || data.groups.some(invalidGroup)) throw new Error('Dữ liệu nghiên cứu không hợp lệ.');
 return data;
 /** Kiểm tra group. @param {object} item Group nguồn. @returns {boolean} Có lỗi cấu trúc. */
 function invalidGroup(item) { return !item.group?.id || !item.group?.name || !Array.isArray(item.topics); }
}
/** Đọc danh bạ. @returns {Promise<object[]>} Giảng viên. */
export async function loadLecturers() {
 const data = await loadJson('lecturers.json');
 if (!Array.isArray(data.lecturers) || data.lecturers.some(invalidLecturer)) throw new Error('Dữ liệu giảng viên không hợp lệ.');
 return data.lecturers;
 /** Kiểm tra khóa tối thiểu. @param {object} lecturer Giảng viên. @returns {boolean} Có lỗi cấu trúc. */
 function invalidLecturer(lecturer) { return !lecturer.name || !lecturer.email; }
}
/** Trải danh sách, giữ nguyên thứ tự nguồn. @param {object} data Dữ liệu nghiên cứu. @returns {object[]} Các cặp group/topic. */
export function flattenTopics(data) {
 return data.groups.flatMap(expandGroup);
 /** Ghép group cho từng topic. @param {object} entry Nhóm. @returns {object[]} Bản ghi có context. */
 function expandGroup(entry) { return entry.topics.map(pairTopic); /** Gắn group. @param {object} topic Chủ đề. @returns {object} Context chủ đề. */ function pairTopic(topic) { return {group:entry.group, topic}; } }
}
/** Tạo link chủ đề dùng chung. @param {object} group Nhóm. @param {object} topic Chủ đề. @returns {string} URL tương thích subpath. */
export function topicUrl(group, topic) {
 const url = new URL('topics/detail/index.html', projectRoot);
 url.search = new URLSearchParams({group:group.id, topic:topic.name, email:normalizeEmail(topic.lecturer.email)});
 return url.href;
}
/** Tạo link hồ sơ. @param {string} email Email. @returns {string} URL hồ sơ. */
export function lecturerUrl(email) { const url = new URL('lecturers/detail/index.html', projectRoot); url.search = new URLSearchParams({email:normalizeEmail(email)}); return url.href; }
/** Đọc định danh chủ đề trên URL. @param {string} search Query URL. @returns {object} Khóa đối chiếu. */
export function readTopicQuery(search = location.search) { const query = new URLSearchParams(search); return {group:query.get('group'), topic:query.get('topic'), email:normalizeEmail(query.get('email'))}; }
/** Tìm duy nhất một chủ đề; không có fallback. @param {object} data JSON nghiên cứu. @param {object} query Khóa URL. @returns {object|null} Cặp topic/group. */
export function findTopic(data, query) {
 if (!query.group || !query.topic || !query.email) return null;
 const matches = flattenTopics(data).filter(matchesQuery);
 return matches.length === 1 ? matches[0] : null;
 /** Đối chiếu đủ ba thành phần. @param {object} entry Chủ đề kèm nhóm. @returns {boolean} Khớp URL. */
 function matchesQuery(entry) { return entry.group.id === query.group && entry.topic.name === query.topic && normalizeEmail(entry.topic.lecturer.email) === query.email; }
}
/** Tạo DOM an toàn, dữ liệu chỉ vào textContent. @param {string} tag Thẻ HTML. @param {string} className Lớp CSS. @param {string|number} text Nội dung. @returns {HTMLElement} Node. */
export function element(tag, className = '', text = '') { const node = document.createElement(tag); if(className) node.className=className; node.textContent=String(text); return node; }
/** Chỉ chấp nhận HTTP(S). @param {string} value URL. @returns {string|null} URL an toàn. */
export function safeWebUrl(value) { try { const url = new URL(value); return ['http:','https:'].includes(url.protocol) ? url.href : null; } catch { return null; } }
/** Tạo link ngoài an toàn. @param {string} label Nội dung. @param {string} value URL. @returns {HTMLAnchorElement|null} Link hoặc null. */
export function externalLink(label,value) { const href=safeWebUrl(value); if(!href)return null; const link=element('a','',label); link.href=href; link.target='_blank'; link.rel='noopener noreferrer'; return link; }
/** Khối lỗi giữ h1 hợp lệ. @param {HTMLElement} main Main bị thay thế. @param {string} title Tiêu đề. @param {string} message Nội dung. @param {string} backUrl Link quay về. @returns {void} */
export function renderPageMessage(main,title,message,backUrl) { const box=element('section','container status-panel');box.append(element('h1','',title),element('p','',message)); const link=element('a','btn','Quay về danh sách');link.href=backUrl;box.append(link); main.replaceChildren(box); }
/** Avatar với fallback khi thiếu hoặc lỗi ảnh. @param {object} lecturer Giảng viên. @param {string} className Lớp avatar. @returns {HTMLElement} Khung avatar. */
export function avatar(lecturer,className) {
 const words=lecturer.name.trim().split(/\s+/); const initials=words.slice(-2).map(firstLetter).join('');
 const box=element('div',className,initials); box.setAttribute('aria-hidden','true');
 if(lecturer.photo?.path) {
  const url=new URL(lecturer.photo.path,projectRoot);
  // Ảnh chỉ từ HTTP(S); không nhận data/javascript hay file nội bộ máy.
  if(['http:','https:'].includes(url.protocol)) { const image=element('img'); image.src=url.href; image.alt=lecturer.photo.alt || lecturer.name; image.loading='lazy'; image.addEventListener('error',restoreInitials,{once:true});box.replaceChildren(image); }
 }
 return box;
 /** Lấy chữ đầu. @param {string} word Từ. @returns {string} Chữ hoa. */ function firstLetter(word) { return word.charAt(0).toUpperCase(); }
 /** Ảnh lỗi trở về chữ cái. @returns {void} */ function restoreInitials() { box.textContent=initials; }
}
