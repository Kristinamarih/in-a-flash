Rails.application.routes.draw do

  resources :decks do
    resources :cards
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
