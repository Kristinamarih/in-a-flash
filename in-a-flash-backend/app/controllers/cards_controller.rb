class CardsController < ApplicationController

    def index
        @cards = Card.all 
        render json: @cards
    end

    def show
        @card = Card.find_by(id: params[:id])
        render json: @card
    end

    def new
        @card = Card.new
    end

    def create
        @card = Card.new(card_params)
        if @card.save
            render json: @card
        else
            render json: new
        end
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
        params.require(:card).require(:term, :description)
    end

end
