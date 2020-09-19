class Card {
    constructor(id, term, description, deck_id, created_at) {
        this.id = id;
        this.term = term;
        this.description = description;
        this.deck_id = deck_id;
        this.created_at = created_at;
        Card.all.push(this);
    };

    static findCard(id) {
        return this.all.find(card => card.id == id);
    };

    renderCard() {
        return `<div class="card border-primary mb-3" style="max-width: 30rem;">
                    <div class="card-header">Card</div>
                    <div class="card-body">
                        <h4 class="card-term">${this.term}</h4>
                        <p class="card-description">${this.description}</p>
                    </div>
                    <div class="text-center">
                    <button data-id=${this.id} type="button" id="previous-card" class="btn btn-outline-primary">Previous card</button>
                    <button data-id=${this.id} type="button" id="delete-card" class="btn btn-primary" style="max-width: 5rem;">Delete</button>
                    <button data-id=${this.id} type="button" id="next-card" class="btn btn-outline-primary">Next card</button>
                    </div>
                </div>`
    };
}

Card.all = []
