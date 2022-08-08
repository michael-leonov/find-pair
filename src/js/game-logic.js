import { countCards } from './generate-cards';
import { stopwatch, stop } from './stopwatch';

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

export function gameLogic() {
  const cards = document.querySelectorAll('.card-wrapper');

  shuffle();

  allFlip().then(() => {
    stopwatch();
  });

  cards.forEach((card) => card.addEventListener('click', flipCard));
}

function flipCard() {
  const cards = document.querySelectorAll('.card-wrapper');
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
  if (winGame) {
    statusGame('/static/win-game.png', 'Вы выйграли');
  }
}

function allFlip() {
  return new Promise((resolve) => {
    const cards = document.querySelectorAll('.card-wrapper');
    cards.forEach((el) => {
      el.classList.add('flip');
      el.style.pointerEvents = 'none';

      setTimeout(() => {
        el.classList.remove('flip');
        el.style.pointerEvents = 'auto';

        resolve();
      }, 5000);
    });
  });
}

function checkForMatch() {
  firstCard.dataset.rang === secondCard.dataset.rang
    ? disableCards()
    : statusGame('/static/lose-game.png', 'Вы проиграли!');
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function statusGame(imgUrl, status) {
  const varStatusGame = document.querySelector('.status-popup');
  const textStatus = document.querySelector('.status-game-text');
  const imgStatus = document.querySelector('.status-game__img');
  const overlay = document.querySelector('.bg-overlay');
  stop();
  imgStatus.src = imgUrl;
  textStatus.textContent = status;
  varStatusGame.classList.add('active');
  overlay.classList.add('active');
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  const cards = document.querySelectorAll('.card-wrapper');
  cards.forEach((card) => {
    const randomPos = Math.floor(
      Math.random() * countCards * window.statusComplexity.status
    );
    card.style.order = randomPos;
  });
}
