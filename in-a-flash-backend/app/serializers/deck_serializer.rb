class DeckSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :category
  has_many :cards
end
