let deckId;

const drawCardsBtn = document.getElementById("draw-cards-btn");

function handleClick() {
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
            const cardSlots = document.getElementById("cards-container").children;
            for (let i = 0; i < cardSlots.length; i++) {
                cardSlots[i].innerHTML = "";
                cardSlots[i].innerHTML = `<img src="${data.cards[i].image}" alt="The code of the card is: ${data.cards[i].code}">`;
            }
        });
}

document.getElementById("new-deck").addEventListener("click", handleClick);
drawCardsBtn.addEventListener("click", drawCards);
