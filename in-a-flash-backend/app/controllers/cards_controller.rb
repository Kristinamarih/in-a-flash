class CardsController < ApplicationController
    # before_action :get_deck
    # before_action :set_card

    def index
        deck = Deck.find_by(id: params[:deck_id])
        cards = deck.cards
        render json: CardSerializer.new(cards)
    end

    def show	
        @card = Card.find_by(id: params[:id])
        @deck = Deck.find(params[:deck_id])	
        render json: @card	
    end

    def new
        card = deck.cards.build
    end

    def create
        deck = Deck.find(params[:deck_id])
        card = deck.cards.build(card_params)
        if card.save
            render json: CardSerializer.new(card)
        else
            render json: new
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
        card = Card.find_by(deck_id: params[:deck_id])
        card.destroy
    end

    private

    # def get_deck
    #     deck = Deck.find(params[:deck_id])
    # end

    # def set_card
    #     card = deck.cards.find(params[:id])
    # end
    
    def card_params
        params.require(:card).permit(:term, :description, :deck_id)
    end

end
