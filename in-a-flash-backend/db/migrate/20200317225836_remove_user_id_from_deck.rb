class RemoveUserIdFromDeck < ActiveRecord::Migration[6.0]
  def change

    remove_column :decks, :user_id, :bigint
  end
end
