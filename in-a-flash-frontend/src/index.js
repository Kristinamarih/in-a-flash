document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.attachEventListeners();
    
    let deckData = []
    const deckList = document.querySelector('#decks-list')
    const deckDelete = document.querySelector('#delete-deck')
    const deckForm = document.querySelector('#new-deck-form')
    const cardForm = document.querySelector('#new-card-form')
    const cardTermInput = document.querySelector('#term-field')
    const cardDescriptionInput = document.querySelector('#description-field')
    const cardDetails = document.querySelector("#card-details")
    const deckNameInput = document.querySelector('#name-field')
    const deckCategoryInput = document.querySelector('#category-field')

    fetch('http://localhost:3000/decks')
    .then(resp => resp.json())
    .then((deckDataJSON) => {
        deckData = deckDataJSON.data
        deckData.forEach((deck) => {
        const newDeck = new Deck(deck.id, deck.attributes.name, deck.attributes.category)
            deckList.innerHTML += newDeck.renderDeck();
        });
    });

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

    if (cardForm) {
        addEventListener('submit', e => {
            e.preventDefault();

            fetch(`http://localhost:3000/decks/${deck.id}/cards`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    deck: {
                        card: {
                            term: cardTermInput.value,
                            description: cardDescriptionInput.value
                        }
                    }
                }),
            })
            .then((res) => res.json())
            .then(function(card) {
                const newCardItem = new Card(card.attributes)
                cardDetails.innerHTML += newCardItem
            });
        });
    }

    // deckDelete.addEventListener('click', (e) => {

    //     fetch('http://localhost:3000/decks', {
    //         method: 'DELETE'
    //     });
    // });
})