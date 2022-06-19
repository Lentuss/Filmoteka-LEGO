const refs = {
btnOpen: document.querySelector('[data-modal-footer-open]'),
btnClose: document.querySelector('[data-modal-footer-close]'),
modalFooter: document.querySelector('.footer-backdrop'),
}

refs.btnOpen.addEventListener('click', onClickBtnModalFooter);
refs.btnClose.addEventListener('click', onClickBtnModalFooter);

function onClickBtnModalFooter() {
refs.modalFooter.classList.toggle('is-hidden');
}

        window.addEventListener("keydown", onModalFooterEscpe);
        function onModalFooterEscpe(event) {
        const key = event.code;
            if (key === 'Escape') {
               refs.modalFooter.classList.toggle('is-hidden');
            }
        }
