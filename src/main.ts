import './css/style.css';
import httpRequest from './js/http-request';
import { generateCards } from './js/generate-cards';
import { gameLogic } from './js/game-logic';
import restart from './js/restart';

declare global {
  interface Window {
    statusComplexity: { status: number };
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

  interface Del {
    status?: number;
  }

  (function chooseComplexity(types: any[]) {
    types.forEach(
      (element: {
        addEventListener: (arg0: string, arg1: () => void) => any;
        classList: {
          toggle: (arg0: string) => void;
          contains: (arg0: string) => string;
        };
        dataset: { complexity: string };
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
            (function delComplexity(complexity: Del): void {
              delete complexity.status;
            })(window.statusComplexity);
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
