document.addEventListener('DOMContentLoaded', () => {
    getDecks();
    
    const deckList = document.querySelector('#decks-list')
    deckList.addEventListener("click", (e) => getSelectedDeck(e))

    const deckForm = document.querySelector('#new-deck-form')
    deckForm.addEventListener("submit", (e) => deckFormHandler(e))
});

const url = 'http://localhost:3000/decks'

function getDecks() {
    fetch(url)
        .then(resp => resp.json())
        .then((decks) => {
        debugger
           decks.data.sort((a, b) => (a.attributes.name > b.attributes.name ? 1 : -1))
           debugger
            decks.data.forEach(deck => {
                let newDeck = new Deck(deck.id, deck.attributes.name, deck.attributes.category, deck.relationships.cards)
                document.querySelector('#decks-list').innerHTML += newDeck.renderDeck();
            });  
    });
};

function getSelectedDeck(e) {
    if (e.target.className == "btn btn-outline-primary deck-buttons") {
        let id = parseInt(e.target.id.split("-")[2]);
        let deck = Deck.findDeck(id);
        document.querySelector('#deck-info').innerHTML = deck.renderDetails()
        
        // if (deck.cards.data.length > 0) {
            getCards(deck)
        // }
    
        const cardForm = document.querySelector('#new-card-form')
        cardForm.addEventListener("submit", (e) => cardFormHandler(e, id))

        let modal = document.querySelector(".modal");
        let closebtn = document.querySelector("#close")
        modal.style.display = "block";
        closebtn.onclick = function() {
          modal.style.display = "none";
        }
        window.onclick = function(e) {
          if (e.target == modal) {
            modal.style.display = "none";
          };
        };

        const toggleCards = document.querySelector('.custom-control-input')
        toggleCards.addEventListener("click", (e) => toggleHandler(deck, e))

      } else if (e.target.className == "btn btn-outline-primary delete-buttons") {
        let id = parseInt(e.target.id.split("-")[2]);
        let deck = Deck.findDeck(id);
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
    let deckDelete = document.querySelector(`#delete-data-${id}`)
    deckDelete.remove()
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
        document.querySelector('#name-field').value = ''
        document.querySelector('#category-field').value = ''
        document.querySelector('#decks-list').innerHTML += newDeckItem.renderDeck()
    });
};

// function toggleHandler(deck, e) {
//     e.preventDefault()
//     toggledCards = []
//     deck.cards.data.forEach(card => {
//         const toggleCard = Card.findCard(card.id)
//         toggledCards.push(toggleCard)

//         toggledCards.forEach(c => {
//         let cardText = document.querySelector("#card-text").innerHTML
//         debugger
        
//         cardText.style.display = "none"
//         })
//     })
// }

function getCards(deck, getSpecificCard=0) {
    fetch(`http://localhost:3000/decks/${deck.id}/cards`)
    .then(resp => resp.json())
    .then(cardJSON => {
        let cards = cardJSON.data
        let card = cards[getSpecificCard]
        let newCard = new Card(card.attributes.id, card.attributes.term, card.attributes.description)
        
        document.querySelector("#card-details").innerHTML = newCard.renderCard()
        document.querySelector("#delete-card").addEventListener("click", (e) => deleteCardHandler(e, deck))

        document.querySelector('#next-card').addEventListener("click", (e) => {
            e.preventDefault()
            ++getSpecificCard
            getCards(deck, getSpecificCard)
        })

        document.querySelector('#previous-card').addEventListener("click", (e) => {
            e.preventDefault()
            --getSpecificCard
            getCards(deck, getSpecificCard)

        })
    })
}

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
                description
            }
        }),
    })
    .then((res) => res.json())
    .then((card) => {
        const newCardItem = new Card(card.data.id, card.data.attributes.term, card.data.attributes.description)
        document.querySelector('#term-field').value = ''
        document.querySelector('#description-field').value = ''
        document.querySelector("#card-details").innerHTML = newCardItem.renderCard()
    });
}

function deleteCardHandler(e, deck) {
    e.preventDefault()
    const id = parseInt(e.target.dataset.id);
    cardDelete(deck, id)
}

function cardDelete(deck, id) {
    fetch(`http://localhost:3000/decks/${deck.id}/cards/${id}`, { method: 'DELETE' })
    let cardDelete = document.querySelector(`#delete-data-${id}`)
    cardDelete.remove()
    getCards(deck)
    // .then(res => {
    //     if (res.ok) {
    //         return res.json();
    //     } else {
    //         return Promise.reject(res.status);
    //     }
    // })
    // .then(res => console.log(res))
    // .catch(err => console.log(`Error with message: ${err}`));
}

// function cardHandler(deck) {
//     document.querySelector('#next-card').addEventListener("click", (e) => {
//         e.preventDefault()
//         debugger
//         let nextCard = deck.cards[+1]
//         nextCard.renderCard()
//     })
        
//     document.querySelector('#previous-card').addEventListener("click", (e) => {
//         e.preventDefault()
//         let previousCard = deck.cards[-1]
//         previousCard.renderCard()
//     })
// }

// document.querySelector('#next-card').addEventListener("click", (e) => {
//     e.preventDefault()
//     ++addCard
//     getCards(id, addCard)
//  })

// document.querySelector('#previous-card').addEventListener("click", (e) => {
//     e.preventDefault()
//     --addCard
//     getCards(id, addCard)
//  })

// document.querySelector("#delete-card").addEventListener("click", (e) => deleteCardHandler(e, id, card))
//     

//     const nextCardButton = document.querySelector('#next-card')
//     nextCardButton.addEventListener("click", (e) => { nextCard(e, cardsArray)})

// const previousCardButton = document.querySelector('#previous-card')
//     previousCardButton.addEventListener("click", (e) => { previousCard(e, cardsArray)})

// function nextCard(e, cardsArray) {
//     e.preventDefault()
//     const nextCardId = cardsArray[ + 1 ].id
//     debugger
//     const nextCard = Card.findCard(nextCardId)
//     document.querySelector("#card-details").innerHTML = nextCard.renderCard()
// }

// function previousCard(e, cardsArray) {
//     e.preventDefault()
//     debugger
//     const previousCardId = cardsArray[ - 1 ].id
//     const previousCard = Card.findCard(previousCardId)
//     document.querySelector("#card-details").innerHTML = previousCard.renderCard()
// }       

// document.querySelector('#previous-card').addEventListener("click", (e) => {
//     e.preventDefault()
//     const previousCardId = cardData[ - 1 ].id
//     const newCard = Card.findCard(previousCardId)
//     // const futureCard = new Card(newCard.id, newCard.term, newCard.description, newCard.deck_id)
//     document.querySelector("#card-details").innerHTML = newCard.renderCard()
// })

// const minCard = cardData.reduce((prev, curr) => (prev.id < curr.id ? prev : curr), cardData[0].id)
// function getSpecificCard(id, minCard) {
//     // cardData.forEach((card) => {
//         fetch(`http://localhost:3000/decks/${id}/cards/${minCard.id}`)
//         .then(resp => resp.json())
//             .then(card => { 
//                 debugger
//                 const newCard = new Card(card.id, card.term, card.description, card.deck_id)
//                 debugger
//                 document.querySelector("#card-details").innerHTML = newCard.renderCard()
                
//                 const nextCard = document.querySelector('#next-card')
//                 nextCard.addEventListener("click", (e) => {
//                     e.preventDefault()
//                     const cardId = card.id + 1
//                     const currentCard = findCard(cardId)
//                     const futureCard = new Card(currentCard.id, currentCard.term, currentCard.description, currentCard.deck_id)
//                     document.querySelector("#card-details").innerHTML = futureCard.renderCard()
//                 }

//                 })
//                 //
//             // });
//         // });
// };