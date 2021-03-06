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

    // toggleText() {
    //     debugger
    //     const cardText = this.description
    //     cardText.toggle()
    // };

    renderCard() {
        return `<div id="delete-data-${this.id}" class="card border-primary mb-3" style="max-width: 30em; min-height: 15em">
                <div class="card-header">Card</div>
                    <div class="card-body text-center">
                        <h4 class="card-title">${this.term}</h4>
                        <style><p class="card-text" id="card-text">${this.description}</p></style>
                    </div>
                    <div class="text-align: center">
                        <div class="btn-group" role="group">
                        <button data-id=${this.id} type="button" id="previous-card" style="width: 7em" class="btn btn-outline-primary">Previous</button>
                        <button data-id=${this.id} type="button" id="delete-card" style="width: 7em" class="btn btn-primary">Delete</button>
                        <button data-id=${this.id} type="button" id="next-card" style="width: 7em" class="btn btn-outline-primary">Next</button>
                        </div>
                    </div>
                    <br>
                </div>`
    };
}

Card.all = []
