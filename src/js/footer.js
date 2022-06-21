const refs = {
btnOpen: document.querySelector('[data-modal-footer-open]'),
btnClose: document.querySelector('[data-modal-footer-close]'),
modalFooter: document.querySelector('.footer-backdrop'),
}

refs.btnOpen.addEventListener('click', onClickOpenModalFooter);
refs.btnClose.addEventListener('click',  onClickCloseModalFooter);
refs.modalFooter.addEventListener('click', onBackdropFooterClick)

function onClickOpenModalFooter() {
refs.modalFooter.classList.remove('is-hidden');
}
function onClickCloseModalFooter() {
refs.modalFooter.classList.add('is-hidden');
}


function onBackdropFooterClick (e){
    console.log(e.target);
    console.log(e.currentTarget);
    if (e.target === e.currentTarget) {
        onClickCloseModalFooter();
    }
}

window.addEventListener("keydown", onModalFooterEscpe);
function onModalFooterEscpe(event) {
const key = event.code;
    if (key === 'Escape') {
        onClickCloseModalFooter();
    }
}

