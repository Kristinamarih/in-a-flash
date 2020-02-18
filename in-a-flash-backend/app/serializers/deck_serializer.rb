class DeckSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :category
end
