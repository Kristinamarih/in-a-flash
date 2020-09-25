class Card {
    constructor(id, term, description, deck_id) {
        this.id = id;
        this.term = term;
        this.description = description;
        this.deck_id = deck_id;
        Card.all.push(this);
    };

    static findCard(id) {
        return this.all.find(card => card.id == id);
    };

    renderCard() {
        return `<div class="card border-primary mb-3" style="max-width: 30em;">
        <div class="card-header">Card</div>
                    <div class="card-body text-center">
                        <h4 class="card-title">${this.term}</h4>
                        <p class="card-text">${this.description}</p>
                    </div>
                    <div class="btn-group" role="group" style="width: 33% text-align: center">
                    <button data-id=${this.id} type="button" id="previous-card" class="btn btn-outline-primary">Previous</button>
                    <button data-id=${this.id} type="button" id="delete-card" class="btn btn-primary">Delete</button>
                    <button data-id=${this.id} type="button" id="next-card" class="btn btn-outline-primary">Next</button>
                    </div>
                </div>`
    };
}

Card.all = []
