class App {

    attachEventListeners() {
      document.querySelector('#decks-list').addEventListener('click', e => {
        if (e.target.className == "btn btn-outline-primary deck-buttons") {
          let id = parseInt(e.target.id.split("-")[2]);
          let foundDeck = Deck.findDeck(id);
          const deckInfo = document.querySelector('#deck-info');
          deckInfo.innerHTML = foundDeck.renderDetails();

          foundDeck.fetchCards();
          foundDeck.postCardFetch();
          foundDeck.nextCard();
          foundDeck.cardDelete();
    
          let modal = document.querySelector(".modal");
          let closebtn = document.querySelector("#close");
        
          modal.style.display = "block";
            
          closebtn.onclick = function() {
            modal.style.display = "none";
          }
            
          window.onclick = function(e) {
            if (e.target == modal) {
              modal.style.display = "none";
            };
          };
        }

        else if (e.target.className == "btn btn-outline-primary delete-buttons") {
          // debugger
          let id = parseInt(e.target.id.split("-")[2]);
          fetch(`http://localhost:3000/decks/${id}`, { method: 'DELETE' })
          .then(res => res.json())
          .then(res => {
              res.remove()
          });
        };
      });
    };
  }
