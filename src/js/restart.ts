import httpRequest from './http-request';
import startGame from '../main';
// import { stop } from './stopwatch';

export default function restart() {
  const btnRestart = document.querySelectorAll('.restart');
  btnRestart.forEach((el) => {
    el.addEventListener('click', (event) => {
      event.preventDefault();
      httpRequest({
        method: 'GET',
        url: '../index.html',
        type: 'text',
        onSuccess: (data) => {
          document.documentElement.innerHTML = data;
          // stop();
          startGame();
        },
        onError: () => {},
      });
    });
  });
}
