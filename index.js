let deckId;

const newDeckBtn = document.getElementById("new-deck");
const drawCardsBtn = document.getElementById("draw-cards-btn");

function renderCardSlots(data) {
    const cardSlots = document.getElementById("cards-container").children;
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
            let winningCard = determineWinningCard(data.cards[0].value, data.cards[1].value);
            console.log(winningCard);
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

    console.log(`Card 1: ${card1Value}`);
    console.log(`Card 2: ${card2Value}`);

    if (card1Value < card2Value) {
        console.log("Card 2 won");
        return card2Value;
    } else if (card1Value > card2) {
        console.log("Card 1 won");
        return card1Value;
    } else {
        console.log("It's a tie");
        return null;
    }
}
