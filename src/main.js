import './css/style.css';
import { httpRequest } from './js/http-request.js';
import { generateCards } from './js/generate-cards';
import { gameLogic } from './js/game-logic';

window.statusComplexity = {
  status: 0,
};

const complexityTypes = [].map.call(
  document.querySelectorAll('[data-complexity]'),
  (el) => {
    return el;
  }
);

const startBtn = document.querySelector('.start-btn');

function chooseComplexity(types) {
  types.forEach((element) =>
    element.addEventListener('click', () => {
      types.forEach((element) => {
        element.classList.remove('choosen');
      });
      element.classList.toggle('choosen');
      if (element.classList.contains('choosen')) {
        window.statusComplexity.status = Number(element.dataset.complexity);
        startBtn.disabled = false;
      } else {
        delete window.tatusComplexity.status;
      }
    })
  );
}

chooseComplexity(complexityTypes);

startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  if (window.statusComplexity.status === 0) {
    document.querySelector('.complexity__inner').append('Сложность не выбрана');
    event.target.disabled = true;
  } else {
    // eslint-disable-next-line no-undef
    httpRequest({
      url: './field.html',
      type: 'text',
      onSuccess: (data) => {
        document.body.innerHTML = data;

        generateCards();
        gameLogic();
      },
    });
  }
});
