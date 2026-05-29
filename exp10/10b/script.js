const button = document.getElementById('colorButton');
const message = document.getElementById('message');

const themes = ['flash-one', 'flash-two', 'flash-three'];
const messages = [
  'Background changed successfully.',
  'Page color updated.',
  'Button click received and applied.'
];

let themeIndex = 0;

button.addEventListener('click', () => {
  document.body.classList.remove(...themes);
  document.body.classList.add(themes[themeIndex]);

  message.textContent = messages[themeIndex];
  message.classList.remove('show');
  void message.offsetWidth;
  message.classList.add('show');

  themeIndex = (themeIndex + 1) % themes.length;
});
