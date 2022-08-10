import { countCards } from './generate-cards';
import { stopwatch, stop } from './stopwatch';

let hasFlippedCard: boolean = false;
let lockBoard: boolean = false;
let firstCard: {
    dataset: { rang: any };
    removeEventListener: (arg0: string, arg1: (this: any) => void) => void;
  },
  secondCard: {
    dataset: { rang: any };
    removeEventListener: (arg0: string, arg1: (this: any) => void) => void;
  };

export function gameLogic(): void {
  const cards: NodeListOf<Element> = document.querySelectorAll('.card-wrapper');

  shuffle();

  allFlip().then(() => {
    stopwatch();
  });

  cards.forEach((card) => card.addEventListener('click', flipCard));
}

function flipCard(this: any): void {
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
      }, 5000);
    });
  });
}

function checkForMatch(): void {
  firstCard.dataset.rang === secondCard.dataset.rang
    ? disableCards()
    : statusGame('/static/lose-game.png', 'Вы проиграли!');
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

  stop();

  (imgStatus as HTMLImageElement).src = imgUrl;
  textStatus!.textContent = status;
  varStatusGame!.classList.add('active');
  overlay!.classList.add('active');
}

function resetBoard(): void {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [
    { dataset: { rang: null }, removeEventListener(arg0, arg1) {} },
    { dataset: { rang: null }, removeEventListener(arg0, arg1) {} },
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