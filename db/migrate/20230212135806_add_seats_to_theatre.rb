class AddSeatsToTheatre < ActiveRecord::Migration[6.1]
  def change
    add_column :theatres, :seats, :integer
  end
end
