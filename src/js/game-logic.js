export function gameLogic() {
  const cards = document.querySelectorAll('.card-wrapper');

  cards.forEach((el) => {
    el.classList.add('flip');
    el.style.pointerEvents = 'none';

    setTimeout(() => {
      el.classList.remove('flip');
      el.style.pointerEvents = 'auto';
    }, 1000);
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
      const randomPos = Math.floor(
        Math.random() * (3 * window.statusComplexity.status)
      );
      card.style.order = randomPos;
    });
  })();

  cards.forEach((card) => card.addEventListener('click', flipCard));
}
