document.addEventListener('DOMContentLoaded', () => {
    // const app = new App();
    // app.attachEventListeners();
    console.log("DOM is loaded");
    getDecks();

    const deckList = document.querySelector('#decks-list')
    deckList.addEventListener("click", (e) => getSelectedDeck(e))

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
    fetch('http://localhost:3000/decks')
        .then(resp => resp.json())
        .then((decks) => {
            decks.data.forEach(deck => {
            let newDeck = new Deck(deck.id, deck.attributes.name, deck.attributes.category)
            // debugger
            document.querySelector('#decks-list').innerHTML += newDeck.renderDeck();
            // debugger
            });
    });
};

function getSelectedDeck(e) {
    if (e.target.className == "btn btn-outline-primary deck-buttons") {
        let id = parseInt(e.target.id.split("-")[2]);
        let foundDeck = Deck.findDeck(id);
        document.querySelector('#deck-info').innerHTML = foundDeck.renderDetails();

        foundDeck.getCards(id);
        // foundDeck.postCardFetch();
        // foundDeck.nextCard();
        // foundDeck.cardDelete();
  
        let modal = document.querySelector(".modal");
        let closebtn = document.querySelector("#close");
        modal.style.display = "block";
          
        closebtn.onclick = function() {
          modal.style.display = "none";
        }
          
        window.onclick = function(e) {
          if (e.target == modal) {
            modal.style.display = "none";
          };
        };
      } else if (e.target.className == "btn btn-outline-primary delete-buttons") {
        // debugger
        let id = parseInt(e.target.id.split("-")[2]);
        fetch(`http://localhost:3000/decks/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(res => {
            res.remove()
        });
      };
}

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
            name,
            category
            }
        }),
    })
    .then((res) => res.json())
    .then(function(deck) {
        const newDeckItem = new Deck(deck.attributes)
        document.querySelector('#decks-list').innerHTML += newDeckItem.renderDeck()
    });
};

function getCards(deckId) {
    fetch(`http://localhost:3000/decks/${deckId}/cards`)
    .then(resp => resp.json())
    .then((cardDataJSON) => {
        const cardData = cardDataJSON.data
        cardData.forEach((card) => {
            fetch(`http://localhost:3000/decks/${deckId}/cards/${card.id}`)
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
                term,
                description
            }
        }),
    })
    .then((res) => res.json())
    .then(function(card) {
        const newCardItem = new Card(card.id, card.term, card.description)
        document.querySelector("#card-details").innerHTML = newCardItem.renderCard()
    });
}

// function nextCardHandler(e) {
//     e.preventDefault()
//     nextCard()
// }

function nextCardHandler(e) {
    e.preventDefault()
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
