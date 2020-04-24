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
        return `<div class="card text-white bg-dark mb-3" style="max-width: 20rem;">
                    <div class="card-header">Card</div>
                    <div class="card-body">
                        <h4 class="card-title">${this.term}</h4>
                        <p class="card-text">${this.description}</p>
                    </div>
                    <button data-id=${this.id} type="button" id="delete-card" class="btn btn-outline-primary">Delete</button>
                </div>`
    };
}

Card.all = []
