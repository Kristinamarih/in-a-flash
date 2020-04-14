class CardsController < ApplicationController

    def index
        @cards = Card.all 
        serialized_data = CardSerializer.new(@cards)
        render json: serialized_data
    end

    def show
        @card = Card.find_by(id: params[:id])
        @deck = Deck.find(params[:deck_id])
        render json: @card
    end

    def create
        # byebug
        @card = Card.new(card_params)
        if @card.save
            render json: CardSerializer.new(@card)
        else
            render json: @card
        end
        # @deck = Deck.find(params[:deck_id])
        # @card = @deck.cards.create(card_params)
    end

    def edit
        @card = Card.find_by(params["id"])
        render json: edit
    end

    def update
        @card = Card.find_by(params["id"])
        if @card.update(card_params)
            redirect_to card_path(card)
        else
            render json: edit
        end
    end

    def destroy
        @card = Card.find_by(params["id"])
        @card.delete
        redirect_to card_path
    end

    private
    
    def card_params
        params.require(:card).permit(:term, :description, :deck_id)
    end

end
