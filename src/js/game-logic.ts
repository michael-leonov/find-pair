import { countCards } from './generate-cards';
import { stopwatch, stopTime } from './stopwatch';

let hasFlippedCard: boolean = false;
let lockBoard: boolean = false;
let firstCard: {
    dataset: { rang: string };
    removeEventListener: (
      arg0: string,
      arg1: (this: {
        classList: DOMTokenList;
        dataset: { rang: string };
        removeEventListener: (arg0: string, arg1: () => void) => void;
      }) => void
    ) => void;
  },
  secondCard: {
    dataset: { rang: string };
    removeEventListener: (
      arg0: string,
      arg1: (this: {
        classList: DOMTokenList;
        dataset: { rang: string };
        removeEventListener: (arg0: string, arg1: () => void) => void;
      }) => void
    ) => void;
  };

export function gameLogic(): void {
  const cards: NodeListOf<Element> = document.querySelectorAll('.card-wrapper');

  shuffle();

  allFlip().then(() => {
    stopwatch();
  });

  cards.forEach((card) => card.addEventListener('click', flipCard));
}

function flipCard(this: {
  classList: DOMTokenList;
  dataset: { rang: string };
  removeEventListener: (arg0: string, arg1: () => void) => void;
}): void {
  const cards: NodeListOf<Element> = document.querySelectorAll('.card-wrapper');
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

function allFlip(): Promise<void> {
  return new Promise<void>((resolve) => {
    const cards: NodeListOf<Element> =
      document.querySelectorAll('.card-wrapper');
    cards.forEach((el) => {
      el.classList.add('flip');
      (el as HTMLElement).style.pointerEvents = 'none';

      setTimeout(() => {
        el.classList.remove('flip');
        (el as HTMLElement).style.pointerEvents = 'auto';

        resolve();
      }, 1000);
    });
  });
}

function checkForMatch(): void {
  firstCard.dataset.rang === secondCard.dataset.rang
    ? disableCards()
    : (statusGame('/static/lose-game.png', 'Вы проиграли!'), resetBoard());
}

function disableCards(): void {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function statusGame(imgUrl: string, status: string | null): void {
  const varStatusGame = document.querySelector('.status-popup');
  const textStatus = document.querySelector('.status-game-text');
  const imgStatus = document.querySelector('.status-game__img');
  const overlay = document.querySelector('.bg-overlay');

  stopTime();

  (imgStatus as HTMLImageElement).src = imgUrl;
  textStatus!.textContent = status;
  varStatusGame!.classList.add('active');
  overlay!.classList.add('active');
}

function resetBoard(): void {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [
    { dataset: { rang: '' }, removeEventListener() {} },
    { dataset: { rang: '' }, removeEventListener() {} },
  ];
}

function shuffle(): void {
  const cards: NodeListOf<Element> = document.querySelectorAll('.card-wrapper');
  cards.forEach((card) => {
    const randomPos: number = Math.floor(
      Math.random() * countCards * window.statusComplexity.status
    );
    (card as HTMLElement).style.order = randomPos.toString();
  });
}
