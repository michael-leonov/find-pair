const statusComplexity = {
  status: 0,
};

const complexityTypes = [].map.call(
  document.querySelectorAll('[data-complexity]'),
  (el) => {
    return el;
  }
);

function chooseComplexity(types) {
  types.forEach((element) =>
    element.addEventListener('click', () => {
      types.forEach((element) => {
        element.classList.remove('choosen');
      });
      element.classList.toggle('choosen');
      if (element.classList.contains('choosen')) {
        statusComplexity.status =
          Array.from(types).findIndex((i) => i === element) + 1;
      } else {
        delete statusComplexity.status;
      }
    })
  );
}

chooseComplexity(complexityTypes);

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
        document.body.innerHTML = data;
      },
    });
  }
});
