/* ===== Shared Utilities ===== */

// Highlight active nav link based on current page
(function () {
    const links = document.querySelectorAll('nav.site-nav a');
    const current = location.pathname.split('/').pop() || 'index.html';
    links.forEach(link => {
        const href = link.getAttribute('href').split('/').pop();
        if (href === current) link.classList.add('active');
    });
})();

// Log helper for output boxes
function logToBox(boxId, message, type = '') {
    const box = document.getElementById(boxId);
    if (!box) return;
    const entry = document.createElement('div');
    entry.className = 'log-entry' + (type ? ' log-' + type : '');
    entry.textContent = '[' + new Date().toLocaleTimeString() + '] ' + message;
    box.appendChild(entry);
    box.scrollTop = box.scrollHeight;
}

// Tab switching
function initTabs(containerSelector) {
    document.querySelectorAll(containerSelector || '.tab-container').forEach(container => {
        const buttons = container.querySelectorAll('.tab-btn');
        const panels = container.querySelectorAll('.tab-panel');
        buttons.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                btn.classList.add('active');
                panels[i].classList.add('active');
            });
        });
    });
}

// Modal helpers
function openModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('open');
}
function closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('open');
}

// Cookie helpers
const Cookie = {
    set(name, value, days = 7) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
    },
    get(name) {
        return document.cookie.split('; ').reduce((r, v) => {
            const parts = v.split('=');
            return parts[0] === name ? decodeURIComponent(parts[1]) : r;
        }, null);
    },
    delete(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    }
};

// Expose globally
window.logToBox = logToBox;
window.initTabs = initTabs;
window.openModal = openModal;
window.closeModal = closeModal;
window.Cookie = Cookie;
