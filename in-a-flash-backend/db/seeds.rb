# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

deck_1 = Deck.create(name: 'Norsk101', category: 'Languages')
# Card.create(term: 'Spring', description: 'a card about spring', deck_id: deck_1)
Deck.create(name: 'JavaScript101', category: 'Web development')
