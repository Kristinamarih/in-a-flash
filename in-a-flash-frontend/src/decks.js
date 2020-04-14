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
        return `<h2>${this.name}</h2>
               <div id="new-cards-container">
                <h5>Create New Cards</h5>
                <form id="new-card-form">
                  <label for='term'>Term:</label>
                  <input type=text name='deck[card][term]' id='term-field' placeholder="Sjokolade" class="form-control">
                  <br>
                  <label for='description'>Description:</label>
                  <input type=text name='deck[card][description]' id='description-field' placeholder="Chocolate" class="form-control">
                  <br>
                  <button type="submit" id="submit-button" class="btn btn-primary">Save</button>
                </form>
              </div>`
    };

    postCardFetch() {
      const cardTermInput = document.querySelector('#term-field');
      const cardDescriptionInput = document.querySelector('#description-field');
      const cardDetails = document.querySelector("#card-details");
      const cardForm = document.querySelector('#new-card-form');
	
      cardForm.addEventListener('submit', e => {
          e.preventDefault();
          fetch(`http://localhost:3000/decks/${this.id}/cards`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    card: {
                        term: cardTermInput.value,
                        description: cardDescriptionInput.value
                    }
                }),
            })
            .then((res) => res.json())
            .then(function(card) {
                const newCardItem = new Card(card.attributes)
                cardDetails.innerHTML = newCardItem.renderCard()
            });
        });
    };

    fetchCards() {
        fetch(`http://localhost:3000/decks/${this.id}/cards`)
        .then(resp => resp.json())
        .then((cardDataJSON) => {
            cardData = cardDataJSON.data
            cardData.forEach((card) => {
                const newCard = new Card(card.id, card.term, card.description)
                cardDetails.innerHTML = newCard.renderCard();
            });
        });
    };
}
    
            
// Deck.prototype.postHTML = function() {
//     let deckCards = this.cards.map(card => {
//         `<div class="card text-white bg-dark mb-3" style="max-width: 20rem;">
//                     <div class="card-header">Card</div>
//                     <div class="card-body">
//                         <h4 class="card-title">${this.term}</h4>
//                         <p class="card-text">${this.description}</p>
//                     </div>
//                 </div>`
//     });
// }

Deck.all = []
