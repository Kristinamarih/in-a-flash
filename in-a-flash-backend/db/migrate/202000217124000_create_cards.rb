class CreateCards < ActiveRecord::Migration[6.0]
  def change
    create_table :cards do |t|
      t.string :term
      t.string :description
      t.references :deck, null: false, foreign_key: true

      t.timestamps
    end
  end
end
