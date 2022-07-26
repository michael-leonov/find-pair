import './css/style.css';
import { httpRequest } from './js/http-request.js';

window.statusComplexity = {
  status: 0,
};

const cardPrefixSpades = '../static/spades_img/';
const cardPostfixSpades = '_spades.jpg';

const cardsSpades = {
  ace: `${cardPrefixSpades}ace${cardPostfixSpades}`,
  king: `${cardPrefixSpades}king${cardPostfixSpades}`,
  queen: `${cardPrefixSpades}queen${cardPostfixSpades}`,
  jack: `${cardPrefixSpades}jack${cardPostfixSpades}`,
  ten: `${cardPrefixSpades}ten${cardPostfixSpades}`,
  nine: `${cardPrefixSpades}nine${cardPostfixSpades}`,
  eight: `${cardPrefixSpades}eight${cardPostfixSpades}`,
  seven: `${cardPrefixSpades}seven${cardPostfixSpades}`,
  six: `${cardPrefixSpades}six${cardPostfixSpades}`,
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

        const fieldCards = document.querySelector('.field__main');
        const countStatus = window.statusComplexity.status;

        (function generateCards() {
          for (let i = 0; i < 3 * countStatus; i++) {
            for (let j = 0; j < 2; j++) {
              const cardWrapper = document.createElement('div');
              cardWrapper.classList.add('card-wrapper');
              cardWrapper.dataset.rang = Object.keys(cardsSpades)[i];

              const frontCardImg = new Image();
              frontCardImg.src = Object.values(cardsSpades)[i];
              frontCardImg.classList.add('shirt-front');

              cardWrapper.appendChild(frontCardImg);

              const backCardImg = new Image();
              backCardImg.src = '../static/shirt-card.jpg';
              backCardImg.classList.add('shirt-back');

              cardWrapper.appendChild(backCardImg);

              fieldCards.appendChild(cardWrapper);
            }
          }
        })();

        const cards = document.querySelectorAll('.card-wrapper');

        cards.forEach((el) => {
          el.classList.add('flip');
          el.style.pointerEvents = 'none';

          setTimeout(() => {
            el.classList.remove('flip');
            el.style.pointerEvents = 'auto';
          }, 5000);
        });

        let hasFlippedCard = false;
        let lockBoard = false;
        let firstCard, secondCard;

        function flipCard() {
          if (lockBoard) return;

          if (this === firstCard) return;

          this.classList.add('flip');

          if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
          }

          secondCard = this;

          checkForMatch();

          const winGame = Array.from(cards).every((card) =>
            card.classList.contains('flip')
          );
          if (winGame) alert('Победили!');
        }

        function checkForMatch() {
          firstCard.dataset.rang === secondCard.dataset.rang
            ? disableCards()
            : unflipCards();
        }

        function disableCards() {
          firstCard.removeEventListener('click', flipCard);
          secondCard.removeEventListener('click', flipCard);

          resetBoard();
        }

        function unflipCards() {
          lockBoard = true;
          setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetBoard();

            alert('Проиграли!');
          }, 500);
        }

        function resetBoard() {
          [hasFlippedCard, lockBoard] = [false, false];
          [firstCard, secondCard] = [null, null];
        }

        (function shuffle() {
          cards.forEach((card) => {
            const randomPos = Math.floor(Math.random() * (3 * countStatus));
            card.style.order = randomPos;
          });
        })();

        cards.forEach((card) => card.addEventListener('click', flipCard));
      },
    });
  }
});
