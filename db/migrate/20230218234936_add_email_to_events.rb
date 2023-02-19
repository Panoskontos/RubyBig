class AddEmailToEvents < ActiveRecord::Migration[6.1]
  def change
    add_column :events, :email, :string
  end
end
