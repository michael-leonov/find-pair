import './css/style.css';
import httpRequest from './js/http-request';
import { generateCards } from './js/generate-cards';
import { gameLogic } from './js/game-logic';
import restart from './js/restart';

declare global {
  interface Window {
    statusComplexity?: any;
  }
}

window.statusComplexity = {
  status: 0,
};

export default function startGame(): void {
  const complexityTypes = [].map.call(
    document.querySelectorAll('[data-complexity]'),
    (el) => {
      return el;
    }
  );

  const startBtn: HTMLButtonElement | null =
    document.querySelector('.start-btn');

  (function chooseComplexity(types: any[]) {
    types.forEach(
      (element: {
        addEventListener: (arg0: string, arg1: () => void) => any;
        classList: {
          toggle: (arg0: string) => void;
          contains: (arg0: string) => any;
        };
        dataset: { complexity: any };
      }) =>
        element.addEventListener('click', () => {
          types.forEach(
            (element: { classList: { remove: (arg0: string) => void } }) => {
              element.classList.remove('choosen');
            }
          );
          element.classList.toggle('choosen');
          if (element.classList.contains('choosen')) {
            window.statusComplexity.status = Number(element.dataset.complexity);
            startBtn!.disabled = false;
          } else {
            delete window.statusComplexity.status;
          }
        })
    );
  })(complexityTypes);

  startBtn!.addEventListener('click', (event) => {
    event.preventDefault();
    if (window.statusComplexity.status === 0) {
      document
        .querySelector('.complexity__inner')!
        .append('Сложность не выбрана');
      (event.target as HTMLButtonElement).disabled = true;
    } else {
      httpRequest({
        method: 'GET',
        url: './field.html',
        type: 'text',
        onSuccess: (data) => {
          document.documentElement.innerHTML = data;

          generateCards();
          gameLogic();

          restart();
        },
        onError: () => {},
      });
    }
  });
}

startGame();
