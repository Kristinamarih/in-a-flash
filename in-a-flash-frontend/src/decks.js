class Deck {
    constructor(id, name, category) {
        this.id = id;
        this.name = name;
        this.category = category;
        Deck.all.push(this);
    }

    static findDeck(id) {
        return this.all.find(deck => deck.id == id);
    }

    renderDeck() {
        return `<tr><td>${this.name}</td><td>${this.category}</td>
        <td><button data-id=${this.id} type="button" id="select-deck-${this.id}" class="btn btn-outline-primary">Select</button></td>
        <td><button data-id=${this.id} type="button" id="delete-deck" class="btn btn-outline-primary">Delete</button></td></tr>`
    }

    renderDetails() {
        return `<h2>${this.name}</h2>
               
               <button type="button" id="next-card" class="btn btn-outline-primary">Next card</button>`
    }
}

Deck.all = []

{/* <p>${this.card.term}</p> */}