class DecksAdapter {
    constructor() {
        this.baseURL = 'http://localhost:3000/decks'
    }

    getDecks() {
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
        this.deckForm = document.getElementById('new-deck-form')
        this.deckForm.addEventListener('submit', this.createDeck)
    }

    createDeck(e) {
        e.preventDefault()
        this.deckForm.value
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