class CardSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :term, :description, :deck_id
  belongs_to :deck
end
