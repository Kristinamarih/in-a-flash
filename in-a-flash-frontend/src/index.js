document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.attachEventListeners();
    getDecks();
    
});

function getDecks() {
    let deckData = []
    const deckList = document.querySelector('#decks-list');

    fetch('http://localhost:3000/decks')
        .then(resp => resp.json())
        .then((deckDataJSON) => {
            deckData = deckDataJSON.data
            deckData.forEach((deck) => {
            const newDeck = new Deck(deck.id, deck.attributes.name, deck.attributes.category)
                deckList.innerHTML += newDeck.renderDeck();
            });
         });
};

function postDeck() {
    const deckForm = document.querySelector('#new-deck-form');
    const deckNameInput = document.querySelector('#name-field');
    const deckCategoryInput = document.querySelector('#category-field');

    deckForm.addEventListener('submit', e => {
        e.preventDefault();
        fetch('http://localhost:3000/decks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                deck: {
                name: deckNameInput.value,
                category: deckCategoryInput.value
                }
            }),
        })
        .then((res) => res.json())
        .then(function(deck) {
            const newDeckItem = new Deck(deck.attributes)
            deckList.innerHTML += newDeckItem.renderDeck()
        });
    });
};

    // deckList.addEventListener('click', e => {
    //     e.preventDefault();
    //     if (e.target.className == "btn btn-outline-primary deck-buttons") {
    //         let id = parseInt(e.target.id.split("-")[2]);
    //         let deck = Deck.findDeck(id);
    //         deck.nextCard()
    //     };
    // });
