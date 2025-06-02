let deckId;
let computerScore = 0;
let myScore = 0;

const newDeckBtn = document.getElementById("new-deck");
const drawCardsBtn = document.getElementById("draw-cards-btn");
const header = document.getElementById("header");
const remainingCards = document.getElementById("remaining-cards");
const computerScoreEl = document.getElementById("computer-score");
const myScoreEl = document.getElementById("my-score");
const cardSlots = document.getElementById("cards-container").children;

function renderCardSlots(data) {
    for (let i = 0; i < cardSlots.length; i++) {
        cardSlots[i].innerHTML = "";
        cardSlots[i].innerHTML = `<img src="${data.cards[i].image}" alt="The code of the card is: ${data.cards[i].code}">`;
    }
}

function getNewDeck() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id;
            remainingCards.textContent = `${data.remaining}`;

            computerScore = 0;
            myScore = 0;
            computerScoreEl.textContent = computerScore;
            myScoreEl.textContent = myScore;

            header.textContent = "Game of War";
            for (let i = 0; i < cardSlots.length; i++) {
                cardSlots[i].innerHTML = "";
            }

            drawCardsBtn.disabled = false;
            drawCardsBtn.style.cursor = "pointer";
            drawCardsBtn.style.opacity = "1";
        });
}

function drawCards() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            renderCardSlots(data);
            header.textContent = determineWinningCard(data.cards[0].value, data.cards[1].value);
            remainingCards.textContent = `${data.remaining}`;

            if (data.remaining === 0) {
                drawCardsBtn.disabled = true;
                drawCardsBtn.style.cursor = "not-allowed";
                drawCardsBtn.style.opacity = "0.5";

                if (computerScore > myScore) {
                    header.textContent = "The computer won the game!";
                } else if (computerScore < myScore) {
                    header.textContent = "You won the game!";
                } else {
                    header.textContent = "There is no winner. It's a tie!"
                }
            }
        });
}

newDeckBtn.addEventListener("click", getNewDeck);
drawCardsBtn.addEventListener("click", drawCards);

function determineWinningCard(card1, card2) {
    const cardValues = {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: 10,
        JACK: 11,
        QUEEN: 12,
        KING: 13,
        ACE: 14
    };
    
    const card1Value = cardValues[card1];
    const card2Value = cardValues[card2];

    if (card1Value > card2Value) {
        computerScore++;
        computerScoreEl.textContent = computerScore;
        return `Computer wins!`;
    } else if (card1Value < card2Value) {
        myScore++;
        myScoreEl.textContent = myScore;
        return `You win!`;
    } else {
        return `War!`;
    }
}
