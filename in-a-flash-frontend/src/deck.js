// Get modal
let modal = document.getElementsByClassName("modal");

// Get button that opens modal
let btn = document.querySelectorAll("#select-deck");

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


















// const newDeckButton = document.getElementsByClassName("btn btn-primary")
// const newDeckForm = document.getElementById('new-deck-form')
// const deckNameInput = newDeckForm.getElementById("name").value
// const deckCategoryInput = newDeckForm.getElementById('category').value

// newDeckForm.addEventListener("submit", function(e) {
//     e.preventDefault()
//     deckNameInput.value
//     deckCategoryInput.value

//     fetch('http://localhost:3000/decks', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json', 
//             Accept: 'application/json'
//         },
//         body: JSON.stringify({
//             name: deckNameInput,
//             category: deckCategoryInput
//         }),
//     })
//     .then(function() {
//         return res.json()
//     })
//     .then(function(deck) {
//         const newDeckItem = document.createElement('td')
//         newDeckItem.innerText = deck
//         decksList.appendChild(newDeckItem)
//     })
// })

// newDeckButton.addEventListener("submit", function(e) {
//     fetch('http://localhost:3000/decks')
//     .then(function(res) {
//         return res.json()
//     })
//     .then(function(decks) {
//         const decksList = document.getElementById('decks-list')
//         decks.data.forEach(function(deck) {
//             const newDeckItem = document.createElement('td')
//             newDeckItem.innerHTML = deck.name
//             decksList.appendChild(newDeckItem)
//         })
//     })
// })




// class DecksAdapter {
//     constructor() {
//         this.baseURL = 'http://localhost:3000/decks'
//     }

//     getDecks() {
//         return fetch(this.baseURL).then(res => res.json())
//     }
// }
// // Deck class: represents a deck
// class Deck {
//     constructor(deckJSON) {
//         this.id = deckJSON.id;
//         this.name = deckJSON.name;
//         this.category = deckJSON.category;
//     }
// }

// class Decks {
//     constructor() {
//         this.decks = []
//         this.adapter = new DecksAdapter()
//         this.bindEventListeners()
//         this.fetchAndLoadDecks()
//     }

//     bindEventListeners() {
//         this.decksList = document.getElementById('decks-list')
//         this.newDeckName = document.getElementById('name')
//         this.newDeckCategory = document.getElementById('category')
//         this.deckForm = document.getElementById('new-deck-form')
//         this.deckForm.addEventListener('submit', this.createDeck.bind(this))
//     }

//     createDeck(e) {
//         e.preventDefault()
//         const nameValue = this.newDeckName.value
//         const categoryValue = this.newDeckCategory.value
//         this.adapter.createDeck(nameValue, categoryValue).then(deck => {
//             this.decks.push(new Deck(deck))
//             this.newDeckName.value = ''
//             this.newDeckCategory.value = ''
//             this.render()
//         })
//     }

//     fetchAndLoadDecks() {
//         this.adapter
//         .getDecks()
//         .then(decks => {
//             decks.forEach(deck => this.decks.push(new Deck(deck)))
//         })
//         .then(() => {
//             this.render()
//         })
//     }

//     render() {
//         this.decksList.innerHTML = this.decks.map(deck => deck.renderLi().join(''))
//     }
// }