import { strings } from './import-controls.js';
const dialogs = new WeakMap();
function enhance() {
    for (const element of document.querySelectorAll('#languageModal, #myNav, #closeNav, #helpNav, #addTopicOptions, #topicText')) {
        if (!dialogs.has(element)) {
            dialogs.set(element, { open: false, previous: null });
            element.setAttribute('role', 'dialog');
            element.setAttribute('aria-label', element.id === 'languageModal' ? strings().language : strings().navigation);
            element.setAttribute('aria-modal', 'true');
            element.addEventListener('keydown', event => {
                const focusable = [...element.querySelectorAll('button, a[href], input, select, [tabindex="0"]')].filter(el => el.getClientRects().length);
                if (event.key === 'Escape') {
                    event.preventDefault(); event.stopImmediatePropagation();
                    element.querySelector('.modal__close-button, .close-button, .closebtn, button')?.click();
                }
                if (event.key === 'Tab' && focusable.length) {
                    if (event.shiftKey && document.activeElement === focusable[0]) { event.preventDefault(); focusable.at(-1).focus(); }
                    else if (!event.shiftKey && document.activeElement === focusable.at(-1)) { event.preventDefault(); focusable[0].focus(); }
                }
            }, true);
        }
        const state = dialogs.get(element);
        const style = getComputedStyle(element);
        const open = style.display !== 'none' && style.visibility !== 'hidden' && element.getBoundingClientRect().width > 1 && element.getBoundingClientRect().height > 1;
        if (state.open !== open) {
            state.open = open;
            element.setAttribute('aria-hidden', String(!open));
            if (open) { state.previous = document.activeElement; element.querySelector('button, a[href], [tabindex="0"]')?.focus(); }
            else if (state.previous?.isConnected) state.previous.focus();
        }
    }
    for (const close of document.querySelectorAll('.modal__close-button, a.closebtn')) {
        close.setAttribute('role', 'button'); close.tabIndex = 0; close.setAttribute('aria-label', strings().close);
        if (!close.dataset.keyboard) { close.dataset.keyboard = 'true'; close.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); close.click(); } }); }
    }
    for (const iframe of document.querySelectorAll('iframe:not([title])')) iframe.title = strings().preview;
    for (const input of document.querySelectorAll('input[placeholder], textarea[placeholder]')) { if (!input.getAttribute('aria-label')) input.setAttribute('aria-label', input.placeholder); }
    const heading = document.querySelector('.upper-page > div');
    if (heading && !document.querySelector('h1, [aria-level="1"]')) { heading.setAttribute('role', 'heading'); heading.setAttribute('aria-level', '1'); }
    for (const button of document.querySelectorAll('.user__visible-button, .user__not-visible-button')) {
        if (!button.getAttribute('aria-label')) button.setAttribute('aria-label', button.title || strings().close);
    }
}
window.addEventListener('DOMContentLoaded', () => {
    navigator.serviceWorker?.getRegistration('/togather/').then(registration => registration?.unregister()).catch(() => {});
    enhance();
    new MutationObserver(enhance).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class'] });
});
