const cardsArray = ['./img/c3po.png', './img/chewie.png', './img/darthvader.png', './img/luke.png', './img/leia.png', './img/obiwan.png', './img/r2d2.png', './img/yoda.png'];
const cardsArrayDuplicated = [...cardsArray, ...cardsArray];

let firstCardFlipped = null;
let secondCardFlipped = null;
let hasFlippedFirstCard = false;
let hasFlippedSecondCard = false;
let countMatches = 0;
let countMoves = 0;
let startChronometer = 0;
let countTime = 0;

function startGame() {
    firstCardFlipped = null;
    secondCardFlipped = null;
    hasFlippedFirstCard = false;
    hasFlippedSecondCard = false;
    countMatches = 0;
    countMoves = 0;
    startChronometer = 0;
    countTime = 0;

    clearInterval(startChronometer);
    document.querySelector('.board').innerHTML = '';
    document.querySelector('.moves').innerHTML = countMoves;
    document.querySelector('.time').innerHTML = `${countTime}s`;

    for (let i = cardsArrayDuplicated.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = cardsArrayDuplicated[i];
        cardsArrayDuplicated[i] = cardsArrayDuplicated[j];
        cardsArrayDuplicated[j] = temp;
    }

    const board = document.querySelector('.board');

    for (let i = 0; i < cardsArrayDuplicated.length; i++) {
        const cardContainer = document.createElement('div');
        const card = document.createElement('div');
        const flipCardFront = document.createElement('div');
        const flipCardBack = document.createElement('div');
        const img = document.createElement('img');
        
        card.addEventListener('click', verifyFlippedCard);
        
        cardContainer.setAttribute('class', 'card-container');
        card.setAttribute('class', 'card');
        card.setAttribute('data-image', cardsArrayDuplicated[i]);
        flipCardFront.setAttribute('class', 'flip-card-front');
        flipCardBack.setAttribute('class', 'flip-card-back');
        img.setAttribute('src', cardsArrayDuplicated[i]);

        flipCardBack.appendChild(img);
        card.appendChild(flipCardFront);
        card.appendChild(flipCardBack);
        cardContainer.appendChild(card);
        board.appendChild(cardContainer);
    }
}

function verifyFlippedCard() {
    if (!hasFlippedFirstCard) {
        this.classList.add('is-flipped');
        firstCardFlipped = this;
        hasFlippedFirstCard = true;
        countMoves += 1;
        document.querySelector('.moves').innerHTML = countMoves;
        if (countMoves == 1) {
            startChronometer = setInterval(timer, 1000);
        }
    } else if (!hasFlippedSecondCard) {
        if (this === firstCardFlipped) return;
        this.classList.add('is-flipped');
        secondCardFlipped = this;
        hasFlippedSecondCard = true;
        setTimeout(() => { verifyIfMatched(firstCardFlipped, secondCardFlipped) }, 1000);
    }
}

function verifyIfMatched(card1, card2) {
    if (card1.dataset.image === card2.dataset.image) {
        card1.removeEventListener('click', verifyFlippedCard);
        card2.removeEventListener('click', verifyFlippedCard);

        hasFlippedFirstCard = false;
        hasFlippedSecondCard = false;
        countMatches += 1;

        if (countMatches === cardsArray.length) {
            clearInterval(startChronometer);
        }
    } else {
        card1.classList.remove('is-flipped');
        card2.classList.remove('is-flipped');
        
        hasFlippedFirstCard = false;
        hasFlippedSecondCard = false;
    }
}

function timer() {
    countTime += 1;
    document.querySelector('.time').innerHTML = `${countTime}s`;
}

startGame();