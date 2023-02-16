class CreateTickets < ActiveRecord::Migration[6.1]
  def change
    create_table :tickets do |t|
      t.string :code
      t.belongs_to :event, null: false, foreign_key: true
      t.string :fname
      t.string :lname
      t.string :email
      t.integer :seat
      t.string :status

      t.timestamps
    end
  end
end
