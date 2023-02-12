class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.string :name
      t.belongs_to :theatre, null: false, foreign_key: true
      t.datetime :date

      t.timestamps
    end
  end
end
