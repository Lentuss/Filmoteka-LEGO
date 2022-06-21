document.body.onload = function (ses) {
  setTimeout(function () {
    let preloader = document.getElementById('preloader');
    if (!preloader.classList.contains('done')) {
      // preloader.classList.add('visually-hidden');
      preloader.classList.add('done');
    }
  }, 2150);
};
