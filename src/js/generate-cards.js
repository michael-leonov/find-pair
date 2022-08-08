export const countCards = 3;

export function generateCards() {
  const fieldCards = document.querySelector('.field__main');
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

  for (let i = 0; i < countCards * window.statusComplexity.status; i++) {
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
}
