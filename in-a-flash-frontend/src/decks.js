class DeckAdapter {
    constructor() {
        this.baseURL = 'http://localhost:3000/decks'
    }

    getDeck() {
        return fetch(this.baseURL).then(res => res.json())
    }
}

class Deck {
    constructor(deckJSON) {
        this.id = deckJSON.id 
        this.name = deckJSON.name 
        this.category = deckJSON.category
    }

    renderLi() {
        return `<li>${this.name}</li>`
    }
}

class Decks {
    constructor() {
        this.decks = []
        this.adapter = new DecksAdapter()
        this.bindEventListeners()
        this.fetchAndLoadDecks()
    }

    bindEventListeners() {
        this.decksContainer = document.getElementById('decks-container')
    }

    fetchAndLoadDecks() {
        this.adapter
        .getDecks()
        .then(decks => {
            decks.forEach(deck => this.decks.push(new Deck(deck)))
        })
        .then(() => {
            this.render()
        })
    }

    render() {
        decksContainer.innerHTML = this.decks.map(deck => deck.renderLi().join(''))
    }
}