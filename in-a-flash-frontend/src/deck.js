// Get modal
let modal = document.getElementsByClassName("modal");

document.querySelector('#decks-list').addEventListener('click', e => {
  e.preventDefault();
  let deckId = parseInt(e.target.dataset.id)
  let btn = document.querySelector(`#select-deck-${deckId}`);
  let closebtn = document.getElementsByClassName("close");
  btn.onclick = function() {
    modal.style.display = "block";
  }
  
  // When user clicks on close, close modal
  closebtn.onclick = function() {
    modal.style.display = "none";
  }
  
  // When user clicks outside of modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  
})

// Get button that opens modal
// let btn = document.querySelector(`#select-deck-${deckId}`);

// Get element that closes modal
// let closebtn = document.getElementsByClassName("close");

// // When user clicks on button, open the modal
// // debugger
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// // When user clicks on close, close modal
// closebtn.onclick = function() {
//   modal.style.display = "none";
// }

// // When user clicks outside of modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

