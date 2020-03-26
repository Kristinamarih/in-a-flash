class App {
    attachEventListeners() {
      document.querySelector('#decks-list').addEventListener('click', e => {
        const id = parseInt(e.target.dataset.id);
        const deck = Deck.findDeck(id);
        const deckInfo = document.querySelector('#deck-info');
        // let newDeck = new Deck(deck.id, deck.name, deck.category);
        // newDeck.renderDetails();
        deckInfo.innerHTML += deck.renderDetails();
      });
    };
  };
