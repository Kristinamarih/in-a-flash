class DecksAdapter {
    constructor() {
        this.baseURL = 'http://localhost:300/decks'
    }

    getDecks() {
        return fetch(this.baseURL).then(res => res.json())
    }
}
