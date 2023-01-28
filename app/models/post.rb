class Post < ApplicationRecord
    validates :name, presence: true, length: { maximum: 5 }
end
