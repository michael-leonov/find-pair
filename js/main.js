const statusComplexity = {
  status : 0
};
const complexityTypes = document.getElementsByClassName('complexity__type');
const choosenComplexity = document.getElementsByClassName('choosen');

for (let i = 0; complexityTypes.length > i; i++) {
    complexityTypes[i].onclick = function() {
    let currentChoosen = choosenComplexity[0];
    if (currentChoosen) {
      currentChoosen.classList.remove('choosen');
      delete statusComplexity;
    }
      
    if (currentChoosen !== this) {
      this.classList.add('choosen');
      statusComplexity.status = i + 1;
    }
  };
}

const startBtn = document.querySelector('.start-btn');

startBtn.addEventListener('click', event => {
  event.preventDefault();
  if(statusComplexity.status == 0) {
    this.disabled = true;
    document.querySelector('.complexity__inner').append('Сложность не выбрана');
  } else {
    httpRequest({
      url: '/field.html',
      type: 'text',
      onSuccess: (data) => {            
        document.querySelector('body').innerHTML = data;
      }           
    });
  }
  
})
 