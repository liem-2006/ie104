/**
 * @file topics.js
 * @description Xử lý lọc theo lĩnh vực, sắp xếp và đồng bộ trạng thái modal cho trang Khám phá đề tài nghiên cứu (UIT Discovery - IE104).
 * @version 2.0.0
 * 
 * Tuân thủ quy chuẩn IE104:
 * - 100% Vanilla JavaScript (ES6+), không thư viện / framework.
 * - Single Responsibility Pattern (Mỗi hàm làm một nhiệm vụ duy nhất).
 * - JSDoc và inline comment chi tiết cho từng luồng xử lý.
 * - Cập nhật DOM thực tế khớp thứ tự sắp xếp, không chỉ dùng CSS order.
 * - Hỗ trợ chuẩn truy cập (a11y): aria-live, aria-pressed, keyboard focus restoration.
 * - Đồng bộ chính xác 13 lĩnh vực (3 có dữ liệu + 10 minh họa), xử lý trạng thái indeterminate.
 */

'use strict';

/**
 * Bản đồ ánh xạ tên gọi chuẩn tiếng Việt của 13 lĩnh vực nghiên cứu
 * @type {Record<string, string>}
 */
const DOMAIN_NAMES = {
  all: 'Tất cả',
  sec: 'An toàn thông tin',
  data: 'Dữ liệu & dự báo',
  nlp: 'AI ngôn ngữ',
  se: 'Công nghệ phần mềm',
  is: 'Hệ thống thông tin',
  net: 'Mạng máy tính',
  cloud: 'Điện toán đám mây',
  iot: 'Internet vạn vật (IoT)',
  cv: 'Thị giác máy tính',
  robot: 'Robot & tự hành',
  hci: 'Tương tác người–máy',
  xr: 'Đồ họa & XR',
  bio: 'Tin học y sinh'
};

/**
 * Danh sách toàn bộ 13 mã lĩnh vực nghiên cứu trong modal
 * @type {string[]}
 */
const ALL_13_DOMAINS = [
  'sec', 'data', 'nlp', 'se', 'is', 'net',
  'cloud', 'iot', 'cv', 'robot', 'hci', 'xr', 'bio'
];

/**
 * Định nghĩa kiểu dữ liệu trạng thái bộ lọc và sắp xếp
 * @typedef {Object} TopicFilterState
 * @property {Set<string>} selectedDomains - Tập hợp các mã lĩnh vực được chọn ('all' hoặc các mã cụ thể)
 * @property {'latest'|'oldest'|'title-az'} currentSort - Chế độ sắp xếp hiện tại
 */

/**
 * Định nghĩa cấu trúc dữ liệu cho một đề tài nghiên cứu trích xuất từ DOM
 * @typedef {Object} TopicItemData
 * @property {string} id - Mã định danh của hàng đề tài
 * @property {string} domain - Mã lĩnh vực nghiên cứu (vd: 'sec', 'data', 'nlp')
 * @property {string} createdAt - Ngày thêm định dạng ISO (YYYY-MM-DD)
 * @property {string} title - Tên đề tài dùng để sắp xếp A–Z
 * @property {HTMLElement} element - Tham chiếu node DOM gốc của hàng đề tài
 */

/**
 * Trạng thái hoạt động chính của ứng dụng
 * @type {TopicFilterState}
 */
const appState = {
  selectedDomains: new Set(['all']),
  currentSort: 'latest'
};

/**
 * Danh sách tham chiếu toàn bộ 12 đề tài gốc trong trang
 * @type {TopicItemData[]}
 */
let originalTopics = [];

/**
 * Biến lưu phần tử kích hoạt mở modal để phục hồi focus chuẩn khi đóng
 * @type {HTMLElement|null}
 */
let lastActiveModalTrigger = null;

/**
 * Trích xuất dữ liệu của một hàng đề tài từ các thuộc tính data-* trên phần tử DOM
 * @param {HTMLElement} rowElement - Node <article class="topic-row">
 * @returns {TopicItemData} Dữ liệu có cấu trúc của đề tài
 */
function extractTopicData(rowElement) {
  const id = rowElement.id || '';
  const domain = rowElement.dataset.domain || '';
  const createdAt = rowElement.dataset.createdAt || '';
  const title = (rowElement.dataset.title || '').trim();

  return {
    id,
    domain,
    createdAt,
    title,
    element: rowElement
  };
}

/**
 * Lọc danh sách đề tài theo tập hợp các lĩnh vực được chọn
 * @param {TopicItemData[]} topics - Danh sách đề tài đầu vào
 * @param {Set<string>} selectedDomains - Tập hợp các mã lĩnh vực đang chọn
 * @returns {TopicItemData[]} Danh sách đề tài đã qua lọc
 */
function filterTopicsByDomain(topics, selectedDomains) {
  // Nếu chọn 'all', trả về toàn bộ danh sách
  if (selectedDomains.has('all')) {
    return topics.slice();
  }

  // Lọc các đề tài có domain nằm trong danh sách được chọn
  return topics.filter(function (topic) {
    return selectedDomains.has(topic.domain);
  });
}

/**
 * Sắp xếp danh sách đề tài theo tiêu chí được chỉ định
 * @param {TopicItemData[]} topics - Danh sách đề tài cần sắp xếp
 * @param {'latest'|'oldest'|'title-az'} sortMode - Tiêu chí sắp xếp
 * @returns {TopicItemData[]} Danh sách đề tài sau khi sắp xếp
 */
function sortTopicsByMode(topics, sortMode) {
  // Tạo bản sao để không làm biến đổi mảng đầu vào
  const sorted = topics.slice();

  switch (sortMode) {
    case 'latest':
      // Mới nhất trước: ngày giảm dần (YYYY-MM-DD)
      sorted.sort(function (a, b) {
        return b.createdAt.localeCompare(a.createdAt);
      });
      break;

    case 'oldest':
      // Cũ nhất trước: ngày tăng dần (YYYY-MM-DD)
      sorted.sort(function (a, b) {
        return a.createdAt.localeCompare(b.createdAt);
      });
      break;

    case 'title-az':
      // Tên đề tài A–Z: so sánh theo bảng chữ cái tiếng Việt chuẩn Unicode
      sorted.sort(function (a, b) {
        return a.title.localeCompare(b.title, 'vi', { sensitivity: 'base' });
      });
      break;

    default:
      // Giữ nguyên thứ tự nếu tiêu chí không hợp lệ
      break;
  }

  return sorted;
}

/**
 * Hiển thị danh sách đề tài ra giao diện, cập nhật vị trí DOM thực tế và thông báo số lượng
 * @param {TopicItemData[]} visibleTopics - Danh sách đề tài đã lọc và sắp xếp
 * @param {HTMLElement} rowsContainer - Container chứa các hàng đề tài (.topics-rows)
 * @param {HTMLElement} emptySection - Section trạng thái rỗng (.topics-empty)
 * @param {HTMLElement} countBadge - Badge hiển thị số lượng đề tài (.topics-results__count)
 * @param {HTMLElement} [sortNote] - Đoạn văn bản ghi chú sắp xếp hiện tại
 * @returns {void}
 */
function renderTopicsList(visibleTopics, rowsContainer, emptySection, countBadge, sortNote) {
  const count = visibleTopics.length;

  // Cập nhật số lượng đề tài và thông báo cho trình đọc màn hình qua aria-live="polite"
  if (countBadge) {
    countBadge.textContent = `${count} đề tài hiển thị`;
  }

  // Cập nhật ghi chú chế độ sắp xếp nếu có
  if (sortNote) {
    let sortLabel = 'Mới nhất trước';
    if (appState.currentSort === 'oldest') {
      sortLabel = 'Cũ nhất trước';
    } else if (appState.currentSort === 'title-az') {
      sortLabel = 'Tên đề tài A–Z';
    }
    sortNote.textContent = `Sắp xếp hiện tại: ${sortLabel}. Ngày thêm trong bản xem trước là dữ liệu minh họa.`;
  }

  // Xử lý trường hợp không có kết quả phù hợp (0 đề tài)
  if (count === 0) {
    rowsContainer.hidden = true;
    rowsContainer.innerHTML = '';
    emptySection.hidden = false;
    return;
  }

  // Khi có kết quả: ẩn trạng thái rỗng, hiện container
  emptySection.hidden = true;
  rowsContainer.hidden = false;
  rowsContainer.innerHTML = '';

  // Đính kèm các phần tử DOM theo đúng thứ tự đã sắp xếp (cập nhật DOM thực tế)
  visibleTopics.forEach(function (topic, index) {
    // Cập nhật lại số thứ tự hiển thị (01, 02, ...)
    const numBadge = topic.element.querySelector('.topic-row__num');
    if (numBadge) {
      const formattedNum = String(index + 1).padStart(2, '0');
      numBadge.textContent = formattedNum;
      numBadge.setAttribute('aria-label', `Thứ tự ${formattedNum}`);
    }

    rowsContainer.appendChild(topic.element);
  });
}

/**
 * Cập nhật giao diện thanh chip lọc nhanh bên ngoài
 * @param {TopicFilterState} state - Trạng thái hiện tại
 * @param {NodeListOf<HTMLButtonElement>} quickChips - Danh sách các nút chip lọc nhanh
 * @param {HTMLButtonElement|null} multiPill - Nút hiển thị trạng thái chọn nhiều lĩnh vực
 * @param {HTMLButtonElement} openModalBtn - Nút mở hộp thoại Lĩnh vực và sắp xếp
 * @returns {void}
 */
function updateQuickChipsUI(state, quickChips, multiPill, openModalBtn) {
  const selected = state.selectedDomains;
  const isAll = selected.has('all');

  // Xử lý các chip đơn cố định: 'all', 'sec', 'data', 'nlp'
  quickChips.forEach(function (chip) {
    const filterValue = chip.dataset.domainFilter;
    let isSelected = false;

    if (isAll && filterValue === 'all') {
      isSelected = true;
    } else if (!isAll && selected.size === 1 && selected.has(filterValue)) {
      isSelected = true;
    }

    chip.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    if (isSelected) {
      chip.classList.add('topics-domain-nav__pill--selected');
    } else {
      chip.classList.remove('topics-domain-nav__pill--selected');
    }
  });

  // Xử lý chip đại diện: khi chọn nhiều lĩnh vực HOẶC chọn 1 lĩnh vực minh họa ngoài 3 chip cố định
  if (multiPill) {
    const isSingleSimulated = (!isAll && selected.size === 1 && !selected.has('sec') && !selected.has('data') && !selected.has('nlp'));
    const isMultiple = (!isAll && selected.size > 1);

    if (isSingleSimulated || isMultiple) {
      multiPill.hidden = false;
      multiPill.setAttribute('aria-pressed', 'true');
      multiPill.classList.add('topics-domain-nav__pill--selected');
      const pillText = multiPill.querySelector('span');
      if (pillText) {
        if (isSingleSimulated) {
          const singleKey = Array.from(selected)[0];
          pillText.textContent = DOMAIN_NAMES[singleKey] || '1 lĩnh vực đã chọn';
        } else {
          pillText.textContent = `Nhiều lĩnh vực (${selected.size})`;
        }
      }
    } else {
      multiPill.hidden = true;
      multiPill.setAttribute('aria-pressed', 'false');
      multiPill.classList.remove('topics-domain-nav__pill--selected');
    }
  }

  // Bật/tắt điểm nhấn trên nút "Chọn" khi có bộ lọc tùy chỉnh
  if (openModalBtn) {
    if (!isAll && (selected.size > 1 || (!selected.has('sec') && !selected.has('data') && !selected.has('nlp')))) {
      openModalBtn.classList.add('topics-domain-nav__pill--active-filter');
    } else {
      openModalBtn.classList.remove('topics-domain-nav__pill--active-filter');
    }
  }
}

/**
 * Thực thi toàn bộ chu trình: Lọc -> Sắp xếp -> Cập nhật DOM -> Cập nhật trạng thái Chip
 * @param {HTMLElement} rowsContainer - Container danh sách đề tài
 * @param {HTMLElement} emptySection - Section trạng thái rỗng
 * @param {HTMLElement} countBadge - Badge đếm kết quả
 * @param {HTMLElement} sortNote - Ghi chú sắp xếp
 * @param {NodeListOf<HTMLButtonElement>} quickChips - Các chip lọc nhanh
 * @param {HTMLButtonElement|null} multiPill - Chip hiển thị nhiều lĩnh vực
 * @param {HTMLButtonElement} openModalBtn - Nút mở modal
 * @returns {void}
 */
function applyFilterAndSort(rowsContainer, emptySection, countBadge, sortNote, quickChips, multiPill, openModalBtn) {
  // Bước 1: Lọc dữ liệu theo lĩnh vực đã chọn
  const filtered = filterTopicsByDomain(originalTopics, appState.selectedDomains);

  // Bước 2: Sắp xếp dữ liệu theo tiêu chí hiện tại
  const sorted = sortTopicsByMode(filtered, appState.currentSort);

  // Bước 3: Đưa kết quả ra DOM
  renderTopicsList(sorted, rowsContainer, emptySection, countBadge, sortNote);

  // Bước 4: Đồng bộ trạng thái các chip bên ngoài
  updateQuickChipsUI(appState, quickChips, multiPill, openModalBtn);
}

/**
 * Đồng bộ giá trị hiện tại của appState vào các ô checkbox và radio trong Modal khi mở
 * @param {HTMLDialogElement} dialog - Hộp thoại modal
 * @returns {void}
 */
function syncModalFromState(dialog) {
  const isAll = appState.selectedDomains.has('all');
  const allCheckbox = dialog.querySelector('#dialog-select-all');
  const domainCheckboxes = dialog.querySelectorAll('input[type="checkbox"][name="domain"]');
  const sortRadios = dialog.querySelectorAll('input[type="radio"][name="topic-sort"]');
  const validationMsg = dialog.querySelector('#dialog-validation-msg');

  // Ẩn thông báo lỗi nếu có từ lần mở trước
  if (validationMsg) {
    validationMsg.hidden = true;
  }

  let checkedCount = 0;

  // Đồng bộ từng checkbox của 13 lĩnh vực
  domainCheckboxes.forEach(function (cb) {
    if (isAll) {
      // Khi appState là 'all', tất cả 13 lĩnh vực đều được đánh dấu chọn
      cb.checked = true;
      checkedCount++;
    } else {
      cb.checked = appState.selectedDomains.has(cb.value);
      if (cb.checked) {
        checkedCount++;
      }
    }
  });

  // Đồng bộ checkbox "Tất cả lĩnh vực" với trạng thái indeterminate chính xác
  if (allCheckbox) {
    if (isAll || checkedCount === ALL_13_DOMAINS.length) {
      allCheckbox.checked = true;
      allCheckbox.indeterminate = false;
    } else if (checkedCount === 0) {
      allCheckbox.checked = false;
      allCheckbox.indeterminate = false;
    } else {
      allCheckbox.checked = false;
      allCheckbox.indeterminate = true;
    }
  }

  // Đồng bộ radio sắp xếp
  sortRadios.forEach(function (radio) {
    radio.checked = (radio.value === appState.currentSort);
  });
}

/**
 * Mở modal một cách an toàn và ghi nhớ phần tử kích hoạt để phục hồi focus
 * Khóa cuộn trang nền để ngăn chặn cuộn xuyên qua backdrop (scroll chaining)
 * @param {HTMLDialogElement} dialog - Hộp thoại modal
 * @param {HTMLElement} triggerElement - Nút đã kích hoạt mở modal
 * @returns {void}
 */
function openFilterModal(dialog, triggerElement) {
  if (!dialog || typeof dialog.showModal !== 'function') return;

  lastActiveModalTrigger = triggerElement || document.activeElement;
  syncModalFromState(dialog);

  if (!dialog.open) {
    document.body.classList.add('modal-open');
    dialog.showModal();
  }
}

/**
 * Đóng modal và hoàn trả focus về nút kích hoạt ban đầu
 * Phục hồi khả năng cuộn trang nền một cách mượt mà không gây giật bố cục
 * @param {HTMLDialogElement} dialog - Hộp thoại modal
 * @param {HTMLButtonElement} fallbackBtn - Nút dự phòng nếu nút kích hoạt bị ẩn
 * @returns {void}
 */
function closeFilterModal(dialog, fallbackBtn) {
  if (!dialog || !dialog.open) return;

  dialog.close();
  document.body.classList.remove('modal-open');

  // Khôi phục focus về nút đã mở modal (hoặc nút fallback nếu nút trước đó đã bị ẩn/xóa khỏi DOM)
  const isTriggerVisible = lastActiveModalTrigger &&
    document.body.contains(lastActiveModalTrigger) &&
    !lastActiveModalTrigger.hidden &&
    lastActiveModalTrigger.offsetParent !== null;

  if (isTriggerVisible && typeof lastActiveModalTrigger.focus === 'function') {
    lastActiveModalTrigger.focus({ preventScroll: true });
  } else if (fallbackBtn && typeof fallbackBtn.focus === 'function') {
    fallbackBtn.focus({ preventScroll: true });
  }
}

/**
 * Thiết lập các bộ lắng nghe sự kiện cho chip lọc nhanh
 * @param {NodeListOf<HTMLButtonElement>} quickChips - Danh sách chip
 * @param {Function} onFilterChange - Callback khi bộ lọc thay đổi
 * @returns {void}
 */
function setupQuickChipListeners(quickChips, onFilterChange) {
  quickChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      const filterValue = chip.dataset.domainFilter;
      if (!filterValue) return;

      if (filterValue === 'all') {
        appState.selectedDomains = new Set(['all']);
      } else {
        appState.selectedDomains = new Set([filterValue]);
      }

      onFilterChange();
    });
  });
}

/**
 * Thiết lập các bộ lắng nghe sự kiện bên trong Hộp thoại Modal (Lĩnh vực & Sắp xếp)
 * @param {HTMLDialogElement} dialog - Hộp thoại modal
 * @param {HTMLButtonElement} openModalBtn - Nút kích hoạt mở modal
 * @param {HTMLButtonElement|null} multiPill - Nút chip hiển thị nhiều lĩnh vực
 * @param {Function} onApply - Callback khi bấm Áp dụng
 * @returns {void}
 */
function setupModalListeners(dialog, openModalBtn, multiPill, onApply) {
  const allCheckbox = dialog.querySelector('#dialog-select-all');
  const domainCheckboxes = dialog.querySelectorAll('input[type="checkbox"][name="domain"]');
  const applyBtn = dialog.querySelector('#dialog-apply-btn');
  const cancelBtn = dialog.querySelector('#dialog-cancel-btn');
  const closeBtn = dialog.querySelector('.topics-dialog__close');
  const validationMsg = dialog.querySelector('#dialog-validation-msg');

  // 1. Mở modal từ nút "+ Chọn"
  if (openModalBtn) {
    openModalBtn.addEventListener('click', function () {
      openFilterModal(dialog, openModalBtn);
    });
  }

  // 2. Mở modal từ chip "Nhiều lĩnh vực" / Lĩnh vực minh họa
  if (multiPill) {
    multiPill.addEventListener('click', function () {
      openFilterModal(dialog, multiPill);
    });
  }

  // 3. Xử lý khi checkbox "Tất cả lĩnh vực" thay đổi
  if (allCheckbox) {
    allCheckbox.addEventListener('change', function () {
      if (validationMsg) validationMsg.hidden = true;
      const isChecked = allCheckbox.checked;
      allCheckbox.indeterminate = false;

      // Chọn hoặc bỏ chọn toàn bộ 13 lĩnh vực
      domainCheckboxes.forEach(function (cb) {
        cb.checked = isChecked;
      });
    });
  }

  // 4. Khi từng checkbox lĩnh vực thay đổi: cập nhật trạng thái của checkbox "Tất cả lĩnh vực"
  domainCheckboxes.forEach(function (cb) {
    cb.addEventListener('change', function () {
      if (validationMsg) validationMsg.hidden = true;

      if (allCheckbox) {
        let checkedCount = 0;
        domainCheckboxes.forEach(function (c) {
          if (c.checked) checkedCount++;
        });

        if (checkedCount === domainCheckboxes.length) {
          allCheckbox.checked = true;
          allCheckbox.indeterminate = false;
        } else if (checkedCount === 0) {
          allCheckbox.checked = false;
          allCheckbox.indeterminate = false;
        } else {
          allCheckbox.checked = false;
          allCheckbox.indeterminate = true;
        }
      }
    });
  });

  // 5. Xử lý khi bấm nút "Áp dụng"
  if (applyBtn) {
    applyBtn.addEventListener('click', function () {
      // Đọc toàn bộ các checkbox được chọn trong 13 lĩnh vực
      const checkedDomains = [];
      domainCheckboxes.forEach(function (cb) {
        if (cb.checked) {
          checkedDomains.push(cb.value);
        }
      });

      // Xác thực: Không cho phép áp dụng nếu không chọn bất kỳ lĩnh vực nào
      if (checkedDomains.length === 0) {
        if (validationMsg) {
          validationMsg.textContent = 'Vui lòng chọn ít nhất một lĩnh vực nghiên cứu.';
          validationMsg.hidden = false;
        }
        return;
      }

      // Nếu chọn đủ toàn bộ 13 lĩnh vực, coi như là 'all'
      if (checkedDomains.length === domainCheckboxes.length) {
        appState.selectedDomains = new Set(['all']);
      } else {
        // Lưu chính xác tập lĩnh vực đã chọn (bảo toàn hoàn toàn cả 3 lĩnh vực thật lẫn 10 minh họa)
        appState.selectedDomains = new Set(checkedDomains);
      }

      // Đọc radio sắp xếp được chọn
      const selectedRadio = dialog.querySelector('input[name="topic-sort"]:checked');
      if (selectedRadio) {
        appState.currentSort = selectedRadio.value;
      }

      // Cập nhật state và DOM trước (để multiPill ẩn/hiện chính xác theo state mới)
      onApply();
      // Sau đó đóng modal và phục hồi focus an toàn (nếu trigger bị ẩn sẽ fallback sang openModalBtn)
      closeFilterModal(dialog, openModalBtn);
    });
  }

  // 6. Xử lý đóng modal mà KHÔNG áp dụng (Hủy, Nút X, Click backdrop, phím Escape)
  if (cancelBtn) {
    cancelBtn.addEventListener('click', function () {
      closeFilterModal(dialog, openModalBtn);
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      closeFilterModal(dialog, openModalBtn);
    });
  }

  // Đóng khi click ngoài backdrop của <dialog> native
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) {
      closeFilterModal(dialog, openModalBtn);
    }
  });

  // Ngăn chặn cuộn xuyên qua nền (scroll chaining) trên backdrop của <dialog>
  dialog.addEventListener('wheel', function (e) {
    if (e.target === dialog) {
      e.preventDefault();
    }
  }, { passive: false });

  dialog.addEventListener('touchmove', function (e) {
    if (e.target === dialog) {
      e.preventDefault();
    }
  }, { passive: false });

  // Khi nhấn Escape, bắt sự kiện 'cancel' để phục hồi focus chuẩn thay vì để trình duyệt hủy tự do
  dialog.addEventListener('cancel', function (e) {
    e.preventDefault();
    closeFilterModal(dialog, openModalBtn);
  });
}

/**
 * Thiết lập bộ lắng nghe cho nút "Xóa bộ lọc" trong trạng thái rỗng
 * @param {HTMLElement} emptySection - Section trạng thái rỗng
 * @param {HTMLButtonElement|null} allChip - Nút chip "Tất cả" để phục hồi focus
 * @param {Function} onReset - Callback thực thi khi xóa bộ lọc
 * @returns {void}
 */
function setupEmptyStateResetListener(emptySection, allChip, onReset) {
  const resetBtn = emptySection.querySelector('#btn-reset-filter');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      appState.selectedDomains = new Set(['all']);
      onReset();

      // Đưa focus trở về nút "Tất cả" để bàn phím không bị lạc
      if (allChip && typeof allChip.focus === 'function') {
        allChip.focus();
      }
    });
  }
}

/**
 * Thiết lập tự động đóng menu mobile khi người dùng nhấn vào bất kỳ liên kết điều hướng nào
 * @returns {void}
 */
function setupMobileMenuAutoClose() {
  const mobileDetails = document.querySelector('.site-header__mobile-menu');
  if (!mobileDetails) return;

  const navLinks = mobileDetails.querySelectorAll('.site-header__mobile-link, a');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      mobileDetails.open = false;
    });
  });
}

/**
 * Hàm khởi tạo chính: chạy khi cây DOM đã sẵn sàng
 * @returns {void}
 */
function initTopicsPage() {
  // Truy vấn các phần tử DOM cần thiết
  const rowsContainer = document.querySelector('.topics-rows');
  const emptySection = document.querySelector('.topics-empty');
  const countBadge = document.querySelector('.topics-results__count');
  const sortNote = document.querySelector('.topics-results__note');
  const quickChips = document.querySelectorAll('.topics-domain-nav__pill[data-domain-filter]');
  const allChip = document.querySelector('.topics-domain-nav__pill[data-domain-filter="all"]');
  const multiPill = document.querySelector('#pill-multi-domains');
  const openModalBtn = document.querySelector('#btn-open-filter-dialog');
  const filterDialog = document.querySelector('#topics-filter-dialog');

  // Kiểm tra tính toàn vẹn của các thành phần bắt buộc
  if (!rowsContainer || !emptySection) {
    return;
  }

  // Trích xuất danh sách 12 đề tài gốc từ DOM
  const rowElements = Array.from(rowsContainer.querySelectorAll('.topic-row'));
  originalTopics = rowElements.map(extractTopicData);

  /**
   * Hàm gọi lại thực thi cập nhật toàn bộ trang
   */
  function handleStateUpdate() {
    applyFilterAndSort(rowsContainer, emptySection, countBadge, sortNote, quickChips, multiPill, openModalBtn);
  }

  // Cài đặt các trình lắng nghe sự kiện
  setupQuickChipListeners(quickChips, handleStateUpdate);

  if (filterDialog && openModalBtn) {
    setupModalListeners(filterDialog, openModalBtn, multiPill, handleStateUpdate);
  }

  setupEmptyStateResetListener(emptySection, allChip, handleStateUpdate);
  setupMobileMenuAutoClose();

  // Chạy lần đầu tiên để thiết lập trạng thái mặc định chuẩn xác
  handleStateUpdate();
}

// Khởi chạy khi tài liệu HTML đã phân tích xong cấu trúc
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTopicsPage);
} else {
  initTopicsPage();
}
