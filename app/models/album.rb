class Album < ApplicationRecord
  validates :name, presence: true

  has_many :songs
  has_many :artists, through: :songs
end
