class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:login]

  def home
    Song.find(100027627600)
  end

  def settings
  end
end
