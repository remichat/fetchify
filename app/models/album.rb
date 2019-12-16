class Album < ApplicationRecord
  validates :name, presence: true

  has_many :songs, dependent: :destroy
  has_many :artists, through: :songs
end
