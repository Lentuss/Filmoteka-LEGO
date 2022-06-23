import { API_KEY, TREND_URL, IMAGE_URL } from './apiVariables';

let position = 0;
let slidesToShow = 6;
const slidesToScroll = 2;
const container = document.querySelector('.slider-container');
const track = document.querySelector('.slider-track');
let items = document.querySelectorAll('.slider-item');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let itemsCount = items.length;
let itemWidth = container.clientWidth / slidesToShow;
const movePosition = slidesToScroll * itemWidth;

let isPaused = false;
let sliderInterval = null;

container.addEventListener('mouseenter', e => {
  isPaused = true;
});
container.addEventListener('mouseleave', e => {
  isPaused = false;
});

const sliderTimeout = window.setTimeout(() => {
  sliderInterval = window.setInterval(() => {
    if (isPaused) {
      return;
    }
    position -= 2;
    setPositon();

    if (position <= -(itemsCount - slidesToShow) * itemWidth) {
      clearInterval(sliderInterval);
    }
    checkBtns();
  }, 50);
}, 2000);

items.forEach(el => {
  el.style.minWidth = `${itemWidth}px`;
});

btnNext.addEventListener('click', () => {
  clearTimeout(sliderTimeout);
  clearInterval(sliderInterval);
  mediaMatching();
  itemWidth = container.clientWidth / slidesToShow;
  const itemsLeft =
    itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
  position -=
    itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

  setPositon();
  checkBtns();
});

btnPrev.addEventListener('click', () => {
  clearTimeout(sliderTimeout);
  clearInterval(sliderInterval);
  mediaMatching();
  itemWidth = container.clientWidth / slidesToShow;
  const itemsLeft = Math.abs(position) / itemWidth;
  position +=
    itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

  setPositon();
  checkBtns();
});

function setPositon() {
  track.style.transform = `translateX(${position}px)`;
}

function checkBtns() {
  btnPrev.disabled = position === 0;
  btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
}
getTrendingFilmsForSlider();
checkBtns();

async function getTrendingFilmsForSlider() {
  const sliderMovies = await fetch(`${TREND_URL}?api_key=${API_KEY}`)
    .then(r => r.json())
    .then(r => {
      const sliderFetchResult = r.results
        .map(
          el => `<div class="slider-item" data-MovieId="${el.id}">
            <img src="${IMAGE_URL + el.poster_path}" alt="${
            el.name
          }" class="slider-images">
            </div>`
        )
        .join('');
      track.innerHTML = sliderFetchResult;
    })
    .then(r => {
      items = document.querySelectorAll('.slider-item');
      itemsCount = items.length;
      checkBtns();
    });
}

function mediaMatching() {
  if (window.matchMedia('(min-width: 1024px)').matches) {
    slidesToShow = 6;
  }
  if (window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches) {
    slidesToShow = 4.5;
  }
  if (window.matchMedia('(max-width: 767px)').matches) {
    slidesToShow = 2.1;
  }
}
