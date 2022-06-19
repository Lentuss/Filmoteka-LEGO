const upBtnEl = document.querySelector(".upBtn");

upBtnEl.addEventListener('click', topFunction);

// Коли користувач скролить на 100px вниз, то з'являється кнопка
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        upBtnEl.style.display = "block";
    } else {
        upBtnEl.style.display = "none";
    }
}

// Повернення до початку сторінки по кліку
function topFunction() {
    document.body.scrollTo({
        top: 0,
        behavior: "smooth"
    }); // Для Safari
    document.documentElement.scrollTo({
        top: 0,
        behavior: "smooth"
    }); // Для Chrome, Firefox, IE and Opera   
}