const body = document.querySelector('body');
const checkbox = document.querySelector('input[type="checkbox"]');
const section = document.querySelector('#section-switch');
const footer = document.querySelector('#footer-switch');
const buttonDay = document.querySelector('#button-color-day');
const buttonWeek = document.querySelector('#button-color-week');

checkbox.addEventListener('change', () => {
  if (checkbox.checked) {
    localStorage.setItem('Current theme', true);
    onDarkSwitchClick();
  } else if (!checkbox.checked) {
    localStorage.setItem('Current theme', false);
    onLightSwitchClick();
  }
});
const stat = JSON.parse(localStorage.getItem('Current theme'));

if (stat) {
  checkbox.checked = stat;
  onDarkSwitchClick();
} else {
  checkbox.checked = false;
  onLightSwitchClick();
}

function onDarkSwitchClick() {
  const movieTitles = document.querySelectorAll('.main__movie-title');

  body.classList.add('dark-theme');
  body.classList.remove('light-theme');
  movieTitles.forEach(movieTitle => (movieTitle.style.color = '#fff'));
  section.classList.add('dark-on');
  section.classList.remove('light-on');
  buttonDay.classList.add('button-dark');
  buttonDay.classList.remove('button-ligh');
  buttonWeek.classList.add('button-dark');
  buttonWeek.classList.remove('button-ligh');
  footer.classList.add('footer-dark');
  footer.classList.remove('footer-light');
}
function onLightSwitchClick() {
  const movieTitles = document.querySelectorAll('.main__movie-title');

  body.classList.add('light-theme');
  body.classList.remove('dark-theme');
  movieTitles.forEach(movieTitle => (movieTitle.style.color = '#333'));
  section.classList.add('light-on');
  section.classList.remove('dark-on');
  buttonDay.classList.add('button-ligh');
  buttonDay.classList.remove('button-dark');
  buttonWeek.classList.add('button-ligh');
  buttonWeek.classList.remove('button-dark');
  footer.classList.add('footer-light');
  footer.classList.remove('footer-dark');
}
