class Deck {
    constructor(deckData) {
        this.name = deckData.name
        this.category = deckData.category
        Deck.allDecks.push(this)
    }

    static findDeck(id) {
        return this.allDecks.find((deck) => deck.id === id)
    }

    renderDeck() {
        return `<td id="${this.id}>${this.name}: ${this.category}</td>`
    }

    renderDetails() {
        return `<h2>${this.name}</h2>
               <p>${this.card.term}</p>
               <button type="button" id="next-card" class="btn btn-outline-primary">Submit</button>
               `
    }
}

Deck.allDecks = []

document.addEventListener('DOMContentLoaded', () => {
    const deckList = document.querySelector('#decks-list')
    const deckInfo = document.querySelector('#deck-info')
    const deckFormSubmit = document.querySelector('#submit-button')
    const deckNameInput = document.querySelector('#name')
    const deckCategoryInput = document.querySelector('#category')

    fetch('http://localhost:3000/decks')
    .then(resp => resp.json())
    .then((deckDataJSON) => {
        deckDataJSON.forEach((deck) => {
            const newDeck = new Deck(deck)
            deckList.innerHTML += newDeck.renderDeck()
        })
    })

    deckList.addEventListener('click', (e) => {
        const clickedDeck = parseInt(e.target.dataset.id)
        const foundDeck = Deck.findDeck(clickedDeck)
        deckInfo.innerHTML = foundDeck.renderDetails()
    })
    
    deckFormSubmit.addEventListener('click', (e) => {
        e.preventDefault()
        deckNameInput.value
        deckCategoryInput.value
    
        fetch('http://localhost:3000/decks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                Accept: 'application/json'
            },
            body: JSON.stringify({
                name: deckNameInput,
                category: deckCategoryInput
            }),
        })
        .then(function() {
            return res.json()
        })
        .then(function(deck) {
            const newDeckItem = new Deck(deck)
            newDeckItem.renderDeck()
        })
    })
    
})