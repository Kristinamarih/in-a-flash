class App {
    attachEventListeners() {
      document.querySelector('#decks-list').addEventListener('click', e => {
        if (e.target.className == "btn btn-outline-primary deck-buttons") {
          const id = parseInt(e.target.id.split("-")[2]);
          const foundDeck = Deck.findDeck(id);
          const deckInfo = document.querySelector('#deck-info');
          deckInfo.innerHTML = foundDeck.renderDetails();
    
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
        };
      });
    };
  }
