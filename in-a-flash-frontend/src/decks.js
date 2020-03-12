class Deck {
    constructor(deckData) {
        this.name = deckData.name
        this.category = deckData.category
        Deck.all.push(this)
    }

    static findDeck(id) {
        return this.allDecks.find((deck) => deck.id === id)
    }

    renderDeck() {
        return `<tr><td id="${this.id}>${this.name}: ${this.category}</td><tr>`
    }

    renderDetails() {
        return `<h2>${this.name}</h2>
               <p>${this.card.term}</p>
               <button type="button" id="next-card" class="btn btn-outline-primary">Submit</button>
               `
    }
}

Deck.all = []