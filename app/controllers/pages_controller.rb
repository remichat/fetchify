class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:login]

  def home
    Song.find(1000000000)
  end

  def settings
  end
end
