import httpRequest from './http-request';

export default function restart() {
  const btnRestart = document.querySelectorAll('.restart');
  btnRestart.forEach((el) => {
    el.addEventListener('click', (event) => {
      event.preventDefault();
      httpRequest({
        url: '../index.html',
        type: 'text',
        onSuccess: (data) => {
          document.documentElement.innerHTML = data;

          window.statusComplexity.status = 0;
        },
      });
      const href = '';
      history.pushState(null, null, href);
    });
  });
}
