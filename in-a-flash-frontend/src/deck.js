// Get modal
let modal = document.getElementsByClassName("modal");

// Get button that opens modal
let btn = document.querySelector("#select-deck");

// Get element that closes modal
let closebtn = document.getElementsByClassName("close");

// When user clicks on button, open the modal
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

