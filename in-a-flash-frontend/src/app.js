class App {
    attachEventListeners() {
      document.querySelector('#decks-list').addEventListener('click', e => {
        const id = parseInt(e.target.dataset.id);
        const deck = Deck.findDeck(id);
        deck.renderDetails;
      });
    }
  }