Rails.application.routes.draw do
  resources :cards
  resources :users
  resources :decks
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
