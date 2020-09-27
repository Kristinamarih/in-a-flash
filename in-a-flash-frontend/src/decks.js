class Deck {
    constructor(id, name, category, cards=null) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.cards = cards;
        Deck.all.push(this);
    };

    static findDeck(id) {
        return this.all.find(deck => deck.id == id);
    };

    renderDeck() {
        return `<tr><td>${this.name}</td><td>${this.category}</td>
        <td><button data-id=${this.id} type="button" id="select-deck-${this.id}" class="btn btn-outline-primary deck-buttons">Select</button></td>
        <td><button data-id=${this.id} type="button" id="delete-deck-${this.id}" class="btn btn-outline-primary delete-buttons">Delete</button></td></tr>`
    };

    renderDetails() {
        return `<div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="customSwitch">
                <label class="custom-control-label" for="customSwitch">Study or play deck!</label>
                </div>
                <br>
            <h2>${this.name}</h2>
               <div id="new-cards-container">
                <h5>Create New Cards</h5>
                <form action="http://localhost:3000/decks/${this.id}/cards" id="new-card-form">
                  <label for='term'>Term:</label>
                  <input type=text name='deck[card][term]' id='term-field' placeholder="Sjokolade" class="form-control">
                  <br>
                  <label for='description'>Description:</label>
                  <input type=text name='deck[card][description]' id='description-field' placeholder="Chocolate" class="form-control">
                  <br>
                  <button type="submit" id="submit-card-${this.id}" class="btn btn-primary">Save</button>
                </form>
              </div>`
    };
}

Deck.all = []
