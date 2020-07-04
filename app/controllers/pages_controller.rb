class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:login]

  def home
  end

  def settings
  end
end
