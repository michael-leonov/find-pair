import httpRequest from './http-request';
import startGame from '../main';

export default function restart() {
  const btnRestart = document.querySelectorAll('.restart');
  btnRestart.forEach((el) => {
    el.addEventListener('click', (event) => {
      httpRequest({
        method: 'GET',
        url: '../index.html',
        type: 'text',
        onSuccess: (data) => {
          document.documentElement.innerHTML = data;

          startGame();
        },
        onError: () => {},
      });
    });
  });
}
