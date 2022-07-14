const statusComplexity = {
  status: 0,
};

const complexityTypes = document.querySelectorAll('.complexity__type');

complexityTypes.forEach((e) =>
  e.addEventListener('click', () => {
    complexityTypes.forEach((el) => {
      el.classList.remove('choosen');
    });
    e.classList.toggle('choosen');
    if (e.classList.contains('choosen')) {
      statusComplexity.status =
        Array.from(complexityTypes).findIndex((i) => i === e) + 1;
    } else {
      delete statusComplexity.status;
    }
  })
);

const startBtn = document.querySelector('.start-btn');

startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  if (statusComplexity.status === 0) {
    this.disabled = true;
    document.querySelector('.complexity__inner').append('Сложность не выбрана');
  } else {
    // eslint-disable-next-line no-undef
    httpRequest({
      url: '/field.html',
      type: 'text',
      onSuccess: (data) => {
        document.querySelector('body').innerHTML = data;
      },
    });
  }
});
