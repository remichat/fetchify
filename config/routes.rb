Rails.application.routes.draw do
  devise_for :users

  get '/settings', to: "pages#settings"
  root to: 'pages#home'
end
