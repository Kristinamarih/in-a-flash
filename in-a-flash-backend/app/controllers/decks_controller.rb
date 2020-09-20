class DecksController < ApplicationController

    def index
        decks = Deck.all
        render json: DeckSerializer.new(decks)
    end

    def show
        @deck = Deck.find_by(id: params[:id])
        render json: @deck
    end

    # def new
    #     @deck = Deck.new
    # end

    def create
        deck = Deck.new(deck_params)
        if deck.save
            render json: DeckSerializer.new(deck)
        else
            render json: new
        end
    end

    def edit
        @deck = Deck.find_by(params["id"])
        render json: edit
    end

    def update
        @deck = Deck.find_by(params["id"])
        if @deck.update(deck_params)
            redirect_to deck_path(@deck)
        else
            render json: edit
        end
    end

    def destroy
        @deck = Deck.find_by(id: params[:id])
        @deck.destroy
        redirect_to decks_path
    end

    private
    
    def deck_params
        params.require(:deck).permit(:name, :category, :cards_attributes=>[:id, :term, :description])
    end

end
