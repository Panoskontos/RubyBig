class AddPriceToEvents < ActiveRecord::Migration[6.1]
  def change
    add_column :events, :price, :integer
  end
end
