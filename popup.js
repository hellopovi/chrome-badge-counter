const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');

increaseBtn.addEventListener('click', function () {
  chrome.runtime.getBackgroundPage(({ updateCounter }) => {
    updateCounter('+');
  });
});

decreaseBtn.addEventListener('click', function () {
  chrome.runtime.getBackgroundPage(({ updateCounter }) => {
    updateCounter('-');
  });
});
