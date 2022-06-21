import throttle from 'lodash.throttle';

const describeModal = document.querySelector('.describe-modal');
const describeCloseBtn = document.querySelector('.describe-modal__close');

setTimeout(() => {
  describeModal.classList.remove('isHidden');
}, 8000);

function closeModal() {
  describeModal.classList.add('isHidden');
}

function closeByEscape(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}

describeCloseBtn.addEventListener('click', closeModal);
window.addEventListener('keydown', closeByEscape);

const KEY = 'describe-form';
const inputData = {};

const form = document.querySelector('.describe-form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

updateForm();

function updateForm() {
  const savedData = localStorage.getItem(KEY);
  if (savedData) {
    const { username, email } = JSON.parse(savedData);
    form.username.value = username;
    form.email.value = email;
    inputData.username = username;
    inputData.email = email;
  }
}

function onFormInput(event) {
  inputData.username = form.elements.username.value;
  inputData.email = form.elements.email.value;

  localStorage.setItem(KEY, JSON.stringify(inputData));
}

function onFormSubmit(event) {
  event.preventDefault();

  const formDataToSend = new FormData(event.currentTarget);
  formDataToSend.forEach((value, name) => {
    inputData[name] = value;
  });

  event.currentTarget.reset();
  localStorage.removeItem(KEY);

  console.log(inputData);
}
