class AddSeatsAvailableToEvents < ActiveRecord::Migration[6.1]
  def change
    add_column :events, :seatsAvailable, :integer
  end
end
