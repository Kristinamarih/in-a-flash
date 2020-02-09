class DecksController < ApplicationController

    def index
        decks = Deck.all 
        render json: decks
    end

    def show
        deck = Deck.find_by(id: params[:id])
        render json: deck
    end

    def new
        deck = Deck.new
    end

    def create
        deck = Deck.new(deck_params)
        if deck.save
            render json: deck
        else
            render: new
        end
    end

    def edit
        deck = Deck.find_by(params["id"])
        render: edit
    end

    def update
        deck = Deck.find_by(params["id"])
        if deck.update(deck_params)
            redirect_ to deck_path(deck)
        else
            render: edit
        end
    end

    def destroy
        deck = Deck.find_by(params["id"])
        deck.delete
        redirect_to deck_path
    end

    private
    
    def deck_params
        params.require(:deck).require(:name, :category)
    end

end
