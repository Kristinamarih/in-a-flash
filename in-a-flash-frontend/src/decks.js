class Deck {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.category = data.category;
        Deck.all.push(this);
    }

    static findDeck(id) {
        return this.all.find(deck => deck.id === id);
    }

    renderDeck() {
        return `<tr><td>${this.name}</td><td>${this.category}</td>
        <td><button data-id=${this.id} type="button" id="select-deck" class="btn btn-outline-primary">Select</button></td></tr>`
    }

    renderDetails() {
        return `<h2>${this.name}</h2>
               <p>${this.card.term}</p>
               <button type="button" id="next-card" class="btn btn-outline-primary">Submit</button>
               `
    }
}

Deck.all = []
