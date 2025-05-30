let deckId;

const drawCardsBtn = document.getElementById("draw-cards-btn");

drawCardsBtn.disabled = true;
drawCardsBtn.style.cursor = "not-allowed";
drawCardsBtn.style.opacity = "0.5";

function drawCards() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            const cards = data.cards;
            let cardsHtml = "";
            cards.forEach(card => {
                cardsHtml += `
                    <img src="${card.image}" alt="${card.code}">
                `;
            });
            document.getElementById("cards-container").innerHTML = cardsHtml;
        });
}

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id;

            if (deckId !== undefined) {
                drawCardsBtn.disabled = false;
                drawCardsBtn.style.cursor = "pointer";
                drawCardsBtn.style.opacity = "1";
            }
        });
}

document.getElementById("new-deck").addEventListener("click", handleClick);
drawCardsBtn.addEventListener("click", drawCards);
