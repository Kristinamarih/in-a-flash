document.addEventListener('DOMContentLoaded', () => {
    // const app = new App();
    // app.attachEventListeners();
    getDecks();

    const deckList = document.querySelector('#decks-list')
    deckList.addEventListener("click", (e) => getSelectedDeck(e))

    const deckForm = document.querySelector('#new-deck-form')
    deckForm.addEventListener("submit", (e) => deckFormHandler(e))

    const deleteCard = document.querySelector("#delete-card")
    deleteCard && deleteCard.addEventListener("click", (e) => deleteCardHandler(e))
});

function getDecks() {
    fetch('http://localhost:3000/decks')
        .then(resp => resp.json())
        .then((decks) => {
            decks.data.forEach(deck => {
            let newDeck = new Deck(deck.id, deck.attributes.name, deck.attributes.category)
            document.querySelector('#decks-list').innerHTML += newDeck.renderDeck();
            });
    });
};

function getSelectedDeck(e) {
    if (e.target.className == "btn btn-outline-primary deck-buttons") {
        let id = parseInt(e.target.id.split("-")[2]);
        let foundDeck = Deck.findDeck(id);
        document.querySelector('#deck-info').innerHTML = foundDeck.renderDetails();

        getCards(id);

        const cardForm = document.querySelector('#new-card-form')
        cardForm.addEventListener("submit", (e) => cardFormHandler(e, id))
  
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
        let id = parseInt(e.target.id.split("-")[2]);
        deleteDeck(id)
      };
}

function deleteDeck(id) {
    fetch(`http://localhost:3000/decks/${id}`, { method: 'DELETE' })
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(res.status);
        }
    })
    .then(res => console.log(res))
    .catch(err => console.log(`Error with message: ${err}`));
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
        const newDeckItem = new Deck(deck.data.id, deck.data.attributes.name, deck.data.attributes.category)
        document.querySelector('#decks-list').innerHTML += newDeckItem.renderDeck()
    });
};

function getCards(id) {
    fetch(`http://localhost:3000/decks/${id}/cards`)
    .then(resp => resp.json())
    .then((cardDataJSON) => {
        const cardData = cardDataJSON.data
        cardData.forEach((card) => {
            fetch(`http://localhost:3000/decks/${id}/cards/${card.id}`)
            .then(resp => resp.json())
            .then(card => {  
                const newCard = new Card(card.id, card.term, card.description, card.deck_id)
                document.querySelector("#card-details").innerHTML = newCard.renderCard()
                
                const nextCard = document.querySelector('#next-card')
                nextCard.addEventListener("click", (e) => {
                    
                })
                // nextCard.addEventListener("click", (e) => nextCardHandler(e, id))
            });
        });
    });
};

function cardFormHandler(e, id) {
    e.preventDefault()
    const cardTermInput = document.querySelector('#term-field').value;
    const cardDescriptionInput = document.querySelector('#description-field').value;
    postCard(id, cardTermInput, cardDescriptionInput)
}

function postCard(deck_id, term, description) {
    fetch(`http://localhost:3000/decks/${deck_id}/cards`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'},
        body: JSON.stringify({
            card: {
                term,
                description,
                deck_id
            }
        }),
    })
    .then((res) => res.json())
    .then((card) => {
        const newCardItem = new Card(card.data.id, card.data.attributes.term, card.data.attributes.description, card.data.attributes.deck_id)
        document.querySelector("#card-details").innerHTML = newCardItem.renderCard()
    });
}

function nextCardHandler(e, deck_id) {
    e.preventDefault()
    deck_id && card.deck_id.map(card => {
        document.querySelector("#card-details").innerHTML = card.renderCard();
    })
    // fetch(`http://localhost:3000/decks/${id}/cards`)
    // .then(resp => resp.json())
    // .then((cardDataJSON) => {
    //     debugger
    //     const cardData = cardDataJSON.data
    //     cardData.forEach((card) => {
    //         fetch(`http://localhost:3000/decks/${id}/cards/${card.id}`)
    //         .then(resp => resp.json())
    //         .then((card) => {
    //             const newCard = new Card(card.id, card.term, card.description)
    //             document.querySelector("#card-details").innerHTML = newCard.renderCard();
    //         });
    //     });
    // });
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
