document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.attachEventListeners();
    getDecks(); 

    const deckForm = document.querySelector('#new-deck-form')
    deckForm.addEventListener("submit", (e) => deckFormHandler(e))

    const cardForm = document.querySelector('#new-card-form')
    cardForm && cardForm.addEventListener("submit", (e) => cardFormHandler(e))

    const nextCard = document.querySelector('#next-card')
    nextCard && nextCard.addEventListener("click", (e) => nextCardHandler(e))

    const deleteCard = document.querySelector("#delete-card")
    deleteCard && deleteCard.addEventListener("click", (e) => deleteCardHandler(e))
});

function getDecks() {
    let deckData = []
    fetch('http://localhost:3000/decks')
        .then(resp => resp.json())
        .then((deckDataJSON) => {
            deckData = deckDataJSON.data
            deckData.forEach((deck) => {
            let newDeck = new Deck(deck.id, deck.attributes.name, deck.attributes.category)
            document.querySelector('#decks-list').innerHTML += newDeck.renderDeck();
            });
    });
};

function deckFormHandler(e) {
    e.preventDefault()
    const deckNameInput = document.querySelector('#name-field').value;
    const deckCategoryInput = document.querySelector('#category-field').value;
    postDeck(deckNameInput, deckCategoryInput)
}

function postDeck(name, category) {
    fetch('http://localhost:3000/decks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'},
        body: JSON.stringify({
            deck: {
            name: name,
            category: category
            }
        }),
    })
    .then((res) => res.json())
    .then(function(deck) {
        const newDeckItem = new Deck(deck.attributes)
        document.querySelector('#decks-list').innerHTML += newDeckItem.renderDeck()
    });
};

function getCards() {
    fetch(`http://localhost:3000/decks/${this.id}/cards`)
    .then(resp => resp.json())
    .then((cardDataJSON) => {
        const cardData = cardDataJSON.data
        cardData.forEach((card) => {
            fetch(`http://localhost:3000/decks/${this.id}/cards/${card.id}`)
            .then(resp => resp.json())
            .then((card) => {
                const newCard = new Card(card.id, card.term, card.description)
                document.querySelector("#card-details").innerHTML = newCard.renderCard();
            });
        });
    });
};

function cardFormHandler(e) {
    e.preventDefault()
    const cardTermInput = document.querySelector('#term-field').value;
    const cardDescriptionInput = document.querySelector('#description-field').value;
    postCard(cardTermInput, cardDescriptionInput)
}

function postCard(term, description) {
    fetch(`http://localhost:3000/decks/${this.id}/cards`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'},
        body: JSON.stringify({
            card: {
                term: term,
                description: description
            }
        }),
    })
    .then((res) => res.json())
    .then(function(card) {
        const newCardItem = new Card(card.id, card.term, card.description)
        document.querySelector("#card-details").innerHTML = newCardItem.renderCard()
    });
}

function nextCardHandler(e) {
    e.preventDefault()
    nextCard()
}

function nextCard() {
        fetch(`http://localhost:3000/decks/${this.id}/cards`)
        .then(resp => resp.json())
        .then((cardDataJSON) => {
            const cardData = cardDataJSON.data
            cardData.forEach((card) => {
                fetch(`http://localhost:3000/decks/${this.id}/cards/${card.id}`)
                .then(resp => resp.json())
                .then((card) => {
                    const newCard = new Card(card.id, card.term, card.description)
                    document.querySelector("#card-details").innerHTML = newCard.renderCard();
                });
            });
        });
    }

function deleteCardHandler(e) {
    e.preventDefault()
    cardDelete()
}

function cardDelete() {
        fetch(`http://localhost:3000/decks/${this.id}/cards/${card.id}`, { method: 'DELETE' })
            .then(res => res.json())
            .then(res => {
                console.log('Deleted:', res.message)
                return res
            });
    }

    // deckList.addEventListener('click', e => {
    //     e.preventDefault();
    //     if (e.target.className == "btn btn-outline-primary deck-buttons") {
    //         let id = parseInt(e.target.id.split("-")[2]);
    //         let deck = Deck.findDeck(id);
    //         deck.nextCard()
    //     };
    // });
