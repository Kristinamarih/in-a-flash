document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.attachEventListeners();
    
    let deckData = []
    const deckList = document.querySelector('#decks-list')
    const deckDelete = document.querySelector('#delete-deck')
    // const deckInfo = document.querySelector('#deck-info')
    const deckForm = document.querySelector('#new-deck-form')
    const deckNameInput = document.querySelector('#name-field')
    const deckCategoryInput = document.querySelector('#category-field')

    fetch('http://localhost:3000/decks')
    .then(resp => resp.json())
    .then((deckDataJSON) => {
        deckData = deckDataJSON.data
        deckData.forEach((deck) => {
            // debugger
        const newDeck = new Deck(deck.id, deck.attributes.name, deck.attributes.category)
            deckList.innerHTML += newDeck.renderDeck();
        })
    })

    deckForm.addEventListener('submit', (e) => {
        e.preventDefault()
    
        fetch('http://localhost:3000/decks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                deck: {
                name: deckNameInput.value,
                category: deckCategoryInput.value
                }
            }),
        })
        .then((res) => res.json())
        .then(function(deck) {
            // debugger
            const newDeckItem = new Deck(deck.attributes)
            deckList.innerHTML += newDeckItem.renderDeck()
        })
    })

    // deckDelete.addEventListener('click', (e) => {
    //     e.preventDefault()

    //     fetch('http://localhost:3000/decks', {
    //         method: 'DELETE'
    //     })
    // })

    // deckList.addEventListener('click', (e) => {
    //     const clickedDeck = parseInt(e.target.dataset.id)
    //     const foundDeck = deckData.findDeck(clickedDeck)
    //     deckInfo.innerHTML = foundDeck.renderDetails()
    // }) 
})