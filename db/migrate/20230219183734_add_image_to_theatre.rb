class AddImageToTheatre < ActiveRecord::Migration[6.1]
  def change
    add_column :theatres, :image, :string
  end
end
