class App {
    attachEventListeners() {
      document.querySelector('#decks-list').addEventListener('click', e => {
        const id = parseInt(e.target.dataset.id);
        const deck = Deck.findDeck(id);
        const deckInfo = document.querySelector('#deck-info');
        // let newDeck = new Deck(deck.id, deck.name, deck.category);
        // newDeck.renderDetails();
        deckInfo.innerHTML += deck.renderDetails();

        let modal = document.querySelector(".modal");
    
        // document.querySelector('#decks-list').addEventListener("click", e => {
        let btn = e.target;
        let closebtn = document.querySelector("#close");
        
        btn.onclick = function() {
          modal.style.display = "block";
        }
        
        closebtn.onclick = function() {
          modal.style.display = "none";
        }
        
        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = "none";
          };
        };
      });
      // });
    };
  }
