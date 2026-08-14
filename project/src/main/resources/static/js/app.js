/**
 * ToolShare - Frontend Application JavaScript
 * Handles all interactive UI functionality across the marketplace.
 * Every function fails gracefully if the target element doesn't exist.
 */
(function () {
    'use strict';

    /* ================================================================
       Utility helpers
       ================================================================ */
    function $(selector, ctx) {
        return (ctx || document).querySelector(selector);
    }
    function $all(selector, ctx) {
        return Array.prototype.slice.call((ctx || document).querySelectorAll(selector));
    }
    function has(el, cls) {
        return el && el.classList.contains(cls);
    }
    function addClass(el, cls) {
        if (el) el.classList.add(cls);
    }
    function removeClass(el, cls) {
        if (el) el.classList.remove(cls);
    }

    /* ================================================================
       Toast notifications
       ================================================================ */
    function ensureToastContainer() {
        var c = $('.toast-container');
        if (!c) {
            c = document.createElement('div');
            c.className = 'toast-container';
            document.body.appendChild(c);
        }
        return c;
    }

    function showToast(message, type) {
        type = type || 'success';
        var container = ensureToastContainer();
        var icons = { success: 'bi-check-circle', error: 'bi-x-circle', info: 'bi-info-circle' };
        var toast = document.createElement('div');
        toast.className = 'toast toast-' + type;
        toast.innerHTML =
            '<div class="toast-icon"><i class="bi ' + (icons[type] || icons.success) + '"></i></div>' +
            '<span>' + message + '</span>';
        container.appendChild(toast);
        setTimeout(function () {
            addClass(toast, 'removing');
            setTimeout(function () {
                if (toast.parentNode) toast.parentNode.removeChild(toast);
            }, 300);
        }, 3500);
    }
    // Expose globally so inline handlers can call it if needed
    window.tsShowToast = showToast;

    /* ================================================================
       Navbar - mobile toggle & scroll shadow & dropdown
       ================================================================ */
    function initNavbar() {
        var toggle = $('#navbarToggle');
        var menu = $('#navbarMenu');

        if (toggle && menu) {
            toggle.addEventListener('click', function () {
                var open = has(menu, 'mobile-open');
                if (open) {
                    removeClass(menu, 'mobile-open');
                    toggle.setAttribute('aria-expanded', 'false');
                    removeClass(toggle, 'active');
                } else {
                    addClass(menu, 'mobile-open');
                    toggle.setAttribute('aria-expanded', 'true');
                    addClass(toggle, 'active');
                }
            });
        }

        // Close mobile menu when a link is clicked
        $all('.navbar-link', menu).forEach(function (link) {
            link.addEventListener('click', function () {
                removeClass(menu, 'mobile-open');
                removeClass(toggle, 'active');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Scroll shadow
        var navbar = $('#mainNavbar');
        if (navbar) {
            window.addEventListener('scroll', function () {
                if (window.scrollY > 4) addClass(navbar, 'scrolled');
                else removeClass(navbar, 'scrolled');
            }, { passive: true });
        }

        // Profile dropdown
        var dropdownBtn = $('#profileDropdownBtn');
        var dropdownMenu = $('#profileDropdown');
        if (dropdownBtn && dropdownMenu) {
            dropdownBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                dropdownMenu.classList.toggle('show');
            });
            document.addEventListener('click', function () {
                removeClass(dropdownMenu, 'show');
            });
        }
    }

    /* ================================================================
       Password visibility toggle
       ================================================================ */
    function initPasswordToggles() {
        $all('.password-toggle').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var targetId = btn.getAttribute('data-toggle');
                var input = document.getElementById(targetId);
                if (!input) return;
                var icon = btn.querySelector('i');
                if (input.type === 'password') {
                    input.type = 'text';
                    if (icon) { removeClass(icon, 'bi-eye'); addClass(icon, 'bi-eye-slash'); }
                } else {
                    input.type = 'password';
                    if (icon) { removeClass(icon, 'bi-eye-slash'); addClass(icon, 'bi-eye'); }
                }
            });
        });
    }

    /* ================================================================
       Form validation
       ================================================================ */
    function showFieldError(field, message) {
        if (!field) return;
        addClass(field, 'error');
        var errEl = $('[data-error-for="' + field.id + '"]');
        if (errEl) {
            errEl.textContent = message;
            addClass(errEl, 'show');
        }
    }
    function clearFieldError(field) {
        if (!field) return;
        removeClass(field, 'error');
        var errEl = $('[data-error-for="' + field.id + '"]');
        if (errEl) {
            errEl.textContent = '';
            removeClass(errEl, 'show');
        }
    }

    function isEmailValid(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validateForm(form) {
        var valid = true;
        var fields = $all('input, select, textarea', form);
        fields.forEach(function (field) {
            if (!field.required) return;
            clearFieldError(field);
            if (!field.value.trim()) {
                showFieldError(field, 'This field is required');
                valid = false;
            } else if (field.type === 'email' && !isEmailValid(field.value)) {
                showFieldError(field, 'Please enter a valid email address');
                valid = false;
            } else if (field.id === 'confirmPassword') {
                var pw = $('#password');
                if (pw && field.value !== pw.value) {
                    showFieldError(field, 'Passwords do not match');
                    valid = false;
                }
            } else if (field.id === 'terms' && field.type === 'checkbox' && !field.checked) {
                var te = $('[data-error-for="terms"]');
                if (te) { te.textContent = 'You must agree to the terms'; addClass(te, 'show'); }
                valid = false;
            }
        });
        return valid;
    }

    function initFormValidation() {
        $all('form').forEach(function (form) {
            // Clear error on input
            $all('input, select, textarea', form).forEach(function (field) {
                field.addEventListener('input', function () { clearFieldError(field); });
                field.addEventListener('change', function () { clearFieldError(field); });
            });

            form.addEventListener('submit', function (e) {
                // Only handle forms marked for client validation
                if (form.getAttribute('novalidate') === null) return;
                if (!validateForm(form)) {
                    e.preventDefault();
                    showToast('Please fix the errors in the form', 'error');
                } else {
                    // Add loading state to submit button
                    var btn = $('[type="submit"]', form);
                    if (btn && has(btn, 'btn-loading')) {
                        addClass(btn, 'loading');
                        btn.disabled = true;
                    }
                }
            });
        });
    }

    /* ================================================================
       Password strength meter
       ================================================================ */
    function initPasswordStrength() {
        var pw = $('#password');
        if (!pw) return;
        // Only relevant on registration form
        var strengthBar = $('.strength-bar');
        var strengthText = $('.strength-text');
        if (!strengthBar) return;

        pw.addEventListener('input', function () {
            var val = pw.value;
            var score = 0;
            if (val.length >= 8) score++;
            if (/[A-Z]/.test(val)) score++;
            if (/[0-9]/.test(val)) score++;
            if (/[^A-Za-z0-9]/.test(val)) score++;

            strengthBar.className = 'strength-bar';
            var label = 'Password strength';
            if (val.length === 0) {
                // default
            } else if (score <= 1) {
                addClass(strengthBar, 'weak');
                label = 'Weak';
            } else if (score === 2) {
                addClass(strengthBar, 'fair');
                label = 'Fair';
            } else if (score === 3) {
                addClass(strengthBar, 'good');
                label = 'Good';
            } else {
                addClass(strengthBar, 'strong');
                label = 'Strong';
            }
            if (strengthText) strengthText.textContent = label;
        });
    }

    /* ================================================================
       Favorite button toggle
       ================================================================ */
    function initFavorites() {
        $all('[data-favorite]').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                btn.classList.toggle('active');
                if (has(btn, 'active')) showToast('Added to favorites', 'success');
                else showToast('Removed from favorites', 'info');
            });
        });
    }

    /* ================================================================
       Modal handling
       ================================================================ */
    function openModal(id) {
        var modal = document.getElementById(id);
        if (modal) {
            modal.style.display = 'flex';
            addClass(modal, 'show');
            document.body.style.overflow = 'hidden';
        }
    }
    function closeModal(modal) {
        if (!modal) return;
        modal.style.display = 'none';
        removeClass(modal, 'show');
        document.body.style.overflow = '';
    }
    window.tsOpenModal = openModal;
    window.tsCloseModal = closeModal;

    function initModals() {
        $all('.modal-overlay').forEach(function (modal) {
            // Close on overlay click
            modal.addEventListener('click', function (e) {
                if (e.target === modal) closeModal(modal);
            });
            // Close buttons
            $all('[data-modal-close]', modal).forEach(function (btn) {
                btn.addEventListener('click', function () { closeModal(modal); });
            });
        });
        // Escape key closes any open modal
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                $all('.modal-overlay.show').forEach(function (m) { closeModal(m); });
            }
        });
    }

    /* ================================================================
       Delete confirmation (tools, account)
       ================================================================ */
    function initDeleteConfirmation() {
        // Buttons that open the delete modal
        $all('#deleteToolBtn, [data-delete-tool], #deleteAccountBtn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                openModal('deleteModal');
                if (btn.hasAttribute('data-delete-tool')) {
                    var name = btn.getAttribute('data-tool-name');
                    var label = $('#deleteModal .modal-body p');
                    if (label && name) {
                        label.textContent = 'Are you sure you want to delete "' + name + '"? This action cannot be undone, and all associated bookings will be cancelled.';
                    }
                }
            });
        });

        // Confirm input must match to enable delete button
        var confirmInput = $('#deleteConfirmInput');
        var confirmBtn = $('#deleteConfirmBtn');
        if (confirmInput && confirmBtn) {
            confirmInput.addEventListener('input', function () {
                confirmBtn.disabled = confirmInput.value.trim().length === 0;
            });
            confirmBtn.addEventListener('click', function () {
                closeModal($('#deleteModal'));
                showToast('Tool deleted successfully', 'success');
            });
        }
    }

    /* ================================================================
       Image upload preview
       ================================================================ */
    function initImagePreview() {
        var input = $('#toolImages');
        var previewGrid = $('#imagePreviewGrid');
        if (!input || !previewGrid) return;

        input.addEventListener('change', function () {
            var files = input.files;
            for (var i = 0; i < files.length; i++) {
                (function (file) {
                    if (!file.type.startsWith('image/')) return;
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var item = document.createElement('div');
                        item.className = 'image-preview-item';
                        item.innerHTML =
                            '<img src="' + e.target.result + '" alt="Preview">' +
                            '<button type="button" class="image-remove-btn" aria-label="Remove photo"><i class="bi bi-x"></i></button>';
                        var removeBtn = item.querySelector('.image-remove-btn');
                        removeBtn.addEventListener('click', function () {
                            item.parentNode.removeChild(item);
                        });
                        previewGrid.appendChild(item);
                    };
                    reader.readAsDataURL(file);
                })(files[i]);
            }
        });

        // Remove existing images
        $all('.image-remove-btn', previewGrid).forEach(function (btn) {
            btn.addEventListener('click', function () {
                var item = btn.closest('.image-preview-item');
                if (item) item.parentNode.removeChild(item);
            });
        });
    }

    /* ================================================================
       Filter sidebar (mobile drawer)
       ================================================================ */
    function initFilterSidebar() {
        var toggleBtn = $('#filterToggleBtn');
        var sidebar = $('#filterSidebar');
        var overlay = $('#filterOverlay');
        var closeBtn = $('#filterCloseBtn');

        function openFilters() {
            addClass(sidebar, 'open');
            addClass(overlay, 'show');
            document.body.style.overflow = 'hidden';
        }
        function closeFilters() {
            removeClass(sidebar, 'open');
            removeClass(overlay, 'show');
            document.body.style.overflow = '';
        }

        if (toggleBtn) toggleBtn.addEventListener('click', openFilters);
        if (closeBtn) closeBtn.addEventListener('click', closeFilters);
        if (overlay) overlay.addEventListener('click', closeFilters);

        // Clear filters
        var clearBtn = $('#clearFilters');
        if (clearBtn) {
            clearBtn.addEventListener('click', function () {
                $all('#filterSidebar input[type="text"], #filterSidebar input[type="number"], #filterSidebar select').forEach(function (f) {
                    f.value = '';
                });
                $all('#filterSidebar input[type="checkbox"]').forEach(function (c) { c.checked = false; });
                $all('#filterSidebar input[type="radio"]').forEach(function (r) { r.checked = (r.value === '0'); });
                var display = $('#priceRangeDisplay');
                if (display) display.textContent = '$0 - $100+';
            });
        }

        // Price range display
        var priceMin = $('#priceMin');
        var priceMax = $('#priceMax');
        var display = $('#priceRangeDisplay');
        function updatePriceDisplay() {
            if (!display) return;
            var min = priceMin ? priceMin.value || '0' : '0';
            var max = priceMax ? priceMax.value || '100+' : '100+';
            display.textContent = '$' + min + ' - $' + max;
        }
        if (priceMin) priceMin.addEventListener('input', updatePriceDisplay);
        if (priceMax) priceMax.addEventListener('input', updatePriceDisplay);
    }

    /* ================================================================
       Booking date calculation (tool details page)
       ================================================================ */
    function initBookingCalc() {
        var startDate = $('#bookingStartDate');
        var endDate = $('#bookingEndDate');
        var summary = $('#bookingSummary');
        if (!startDate || !endDate || !summary) return;

        var priceAttr = $('[data-booking-price]');
        var depositAttr = $('[data-booking-deposit]');
        var pricePerDay = priceAttr ? parseFloat(priceAttr.getAttribute('data-booking-price')) : 0;
        var deposit = depositAttr ? parseFloat(depositAttr.getAttribute('data-booking-deposit')) : 0;

        // Also try to read from the booking card text
        if (!pricePerDay) {
            var priceEl = $('.booking-price-amount');
            if (priceEl) pricePerDay = parseFloat(priceEl.textContent.replace(/[^0-9.]/g, ''));
        }

        function calculate() {
            var start = startDate.value;
            var end = endDate.value;
            if (!start || !end) {
                summary.style.display = 'none';
                return;
            }
            var sDate = new Date(start);
            var eDate = new Date(end);
            var days = Math.round((eDate - sDate) / (1000 * 60 * 60 * 24));
            if (days <= 0) {
                summary.style.display = 'none';
                showToast('End date must be after start date', 'error');
                return;
            }
            var subtotal = days * pricePerDay;
            var serviceFee = Math.round(subtotal * 0.1 * 100) / 100;
            var total = subtotal + deposit + serviceFee;

            summary.style.display = 'flex';
            var daysEl = $('#daysCount');
            if (daysEl) daysEl.textContent = days;
            var subEl = $('#subtotalAmount');
            if (subEl) subEl.textContent = '$' + subtotal.toFixed(2);
            var feeEl = $('#serviceFee');
            if (feeEl) feeEl.textContent = '$' + serviceFee.toFixed(2);
            var totalEl = $('#totalAmount');
            if (totalEl) totalEl.textContent = '$' + total.toFixed(2);
        }

        startDate.addEventListener('change', calculate);
        endDate.addEventListener('change', calculate);

        // Request booking button
        var requestBtn = $('#requestBookingBtn');
        if (requestBtn) {
            requestBtn.addEventListener('click', function () {
                if (summary.style.display === 'none' || !startDate.value || !endDate.value) {
                    showToast('Please select rental dates first', 'error');
                    return;
                }
                showToast('Booking request sent! The owner will respond shortly.', 'success');
            });
        }
    }

    /* ================================================================
       Booking tabs (filter by status)
       ================================================================ */
    function initBookingTabs() {
        var tabs = $all('#bookingTabs .tab');
        if (tabs.length === 0) return;
        var cards = $all('.booking-item-card');

        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                tabs.forEach(function (t) { removeClass(t, 'active'); });
                addClass(tab, 'active');
                var filter = tab.getAttribute('data-tab');

                cards.forEach(function (card) {
                    if (filter === 'all') {
                        card.style.display = '';
                    } else {
                        var status = card.getAttribute('data-status');
                        card.style.display = (status === filter) ? '' : 'none';
                    }
                });
            });
        });
    }

    /* ================================================================
       Profile section navigation
       ================================================================ */
    function initProfileNav() {
        var navLinks = $all('#profileNav .profile-nav-link');
        if (navLinks.length === 0) return;

        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.forEach(function (l) { removeClass(l, 'active'); });
                addClass(link, 'active');

                var section = link.getAttribute('data-section');
                $all('.profile-section').forEach(function (s) {
                    removeClass(s, 'active');
                });
                var target = $('#section-' + section);
                if (target) addClass(target, 'active');
            });
        });
    }

    /* ================================================================
       Chat UI interactions
       ================================================================ */
    function initChat() {
        var sendBtn = $('#chatSendBtn');
        var input = $('#chatInput');
        var messages = $('#chatMessages');
        if (!sendBtn && !input) return;

        function sendMessage() {
            if (!input || !messages) return;
            var text = input.value.trim();
            if (!text) return;
            var msg = document.createElement('div');
            msg.className = 'chat-message chat-message-sent';
            var now = new Date();
            var timeStr = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
            msg.innerHTML =
                '<div class="chat-message-content">' +
                '<p>' + text.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</p>' +
                '<span class="chat-message-time">' + timeStr + '</span>' +
                '</div>';
            messages.appendChild(msg);
            messages.scrollTop = messages.scrollHeight;
            input.value = '';
        }

        if (sendBtn) sendBtn.addEventListener('click', sendMessage);
        if (input) {
            input.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    sendMessage();
                }
            });
        }

        // Conversation selection on mobile
        var conversations = $all('.conversation-item');
        conversations.forEach(function (conv) {
            conv.addEventListener('click', function () {
                conversations.forEach(function (c) { removeClass(c, 'active'); });
                addClass(conv, 'active');
                // On mobile, switch to chat window view
                if (window.innerWidth < 768) {
                    var sidebar = $('#chatSidebar');
                    var chatWindow = $('#chatWindow');
                    if (sidebar) addClass(sidebar, 'mobile-hidden');
                    if (chatWindow) addClass(chatWindow, 'active');
                }
            });
        });

        // Back button on mobile chat
        var backBtn = $('#chatBackBtn');
        if (backBtn) {
            backBtn.addEventListener('click', function () {
                var sidebar = $('#chatSidebar');
                var chatWindow = $('#chatWindow');
                if (sidebar) removeClass(sidebar, 'mobile-hidden');
                if (chatWindow) removeClass(chatWindow, 'active');
            });
        }

        // Auto-scroll to bottom on load
        if (messages) messages.scrollTop = messages.scrollHeight;
    }

    /* ================================================================
       Save Draft button (add tool page)
       ================================================================ */
    function initSaveDraft() {
        var draftBtn = $('#saveDraftBtn');
        if (!draftBtn) return;
        draftBtn.addEventListener('click', function () {
            showToast('Draft saved', 'success');
        });
    }

    /* ================================================================
       Alert dismiss
       ================================================================ */
    function initAlerts() {
        $all('.alert-close').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var alert = btn.closest('.alert');
                if (alert) alert.parentNode.removeChild(alert);
            });
        });
    }

    /* ================================================================
       Loading buttons (non-form triggered)
       ================================================================ */
    function initLoadingButtons() {
        $all('.btn-loading').forEach(function (btn) {
            // Only handle buttons that are NOT submit type (those handled by form validation)
            if (btn.getAttribute('type') === 'submit') return;
            btn.addEventListener('click', function () {
                if (btn.disabled) return;
                addClass(btn, 'loading');
                btn.disabled = true;
                setTimeout(function () {
                    removeClass(btn, 'loading');
                    btn.disabled = false;
                }, 2000);
            });
        });
    }

    /* ================================================================
       Image gallery (tool details page)
       ================================================================ */
    function initGallery() {
        var mainImg = $('#galleryMainImg');
        var thumbs = $all('.gallery-thumb');
        if (!mainImg || thumbs.length === 0) return;

        thumbs.forEach(function (thumb) {
            thumb.addEventListener('click', function () {
                var full = thumb.getAttribute('data-full');
                if (full) mainImg.src = full;
                thumbs.forEach(function (t) { removeClass(t, 'active'); });
                addClass(thumb, 'active');
            });
        });
    }

    /* ================================================================
       Sort dropdown (browse page)
       ================================================================ */
    function initSort() {
        var sortSelect = $('#sortBy');
        if (!sortSelect) return;
        sortSelect.addEventListener('change', function () {
            var grid = $('.tool-grid');
            if (!grid) return;
            var cards = Array.prototype.slice.call(grid.querySelectorAll('.tool-card'));
            var sortType = sortSelect.value;

            cards.sort(function (a, b) {
                if (sortType === 'price-asc' || sortType === 'price-desc') {
                    var pa = parseFloat(a.querySelector('.tool-price-amount').textContent.replace(/[^0-9.]/g, ''));
                    var pb = parseFloat(b.querySelector('.tool-price-amount').textContent.replace(/[^0-9.]/g, ''));
                    return sortType === 'price-asc' ? pa - pb : pb - pa;
                }
                if (sortType === 'rating') {
                    var ra = parseFloat(a.querySelector('.tool-rating span').textContent);
                    var rb = parseFloat(b.querySelector('.tool-rating span').textContent);
                    return rb - ra;
                }
                return 0;
            });

            cards.forEach(function (card) { grid.appendChild(card); });
        });
    }

    /* ================================================================
       Initialize everything on DOM ready
       ================================================================ */
    function init() {
        initNavbar();
        initPasswordToggles();
        initFormValidation();
        initPasswordStrength();
        initFavorites();
        initModals();
        initDeleteConfirmation();
        initImagePreview();
        initFilterSidebar();
        initBookingCalc();
        initBookingTabs();
        initProfileNav();
        initChat();
        initSaveDraft();
        initAlerts();
        initLoadingButtons();
        initGallery();
        initSort();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
