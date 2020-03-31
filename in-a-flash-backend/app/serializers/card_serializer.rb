class CardSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :term, :description
end
