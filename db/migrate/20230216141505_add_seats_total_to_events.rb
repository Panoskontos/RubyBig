class AddSeatsTotalToEvents < ActiveRecord::Migration[6.1]
  def change
    add_column :events, :seatsTotal, :integer
  end
end
