class CardsController < ApplicationController

    def index
        deck = Deck.find_by(id: params[:deck_id])
        cards = deck.cards
        render json: CardSerializer.new(cards)
    end

    def create
        deck = Deck.find_by(id: params[:deck_id])
        card = Card.new(card_params)
        if card.save
            render json: CardSerializer.new(card)
        else
            render json: card
        end
    end

    # def edit
    #     @card = Card.find_by(params["id"])
    #     render json: edit
    # end

    # def update
    #     @card = Card.find_by(params["id"])
    #     if @card.update(card_params)
    #         redirect_to card_path(card)
    #     else
    #         render json: edit
    #     end
    # end

    def destroy
        @card = Card.find_by(id: params[:id])
        deck = Deck.find_by(id: params[:id])
        @card.destroy
        redirect_to new_deck_card_path(deck)
    end

    private
    
    def card_params
        params.require(:card).permit(:term, :description, :deck_id)
    end

end
