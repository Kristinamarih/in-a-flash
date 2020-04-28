class Card {
    constructor(id, term, description) {
        this.id = id;
        this.term = term;
        this.description = description;
        Card.all.push(this);
    };

    static findCard(id) {
        return this.all.find(card => card.id == id);
    };

    renderCard() {
        return `<div class="card border-primary mb-3" style="max-width: 30rem;">
                    <div class="card-header">Card</div>
                    <div class="card-body">
                        <h4 class="card-title">${this.term}</h4>
                        <p class="card-text">${this.description}</p>
                    </div>
                    <div class="text-center">
                    <button data-id=${this.id} type="button" id="delete-card" class="btn btn-primary" style="max-width: 5rem;">Delete</button>
                    </div>
                </div>`
    };
}

Card.all = []
