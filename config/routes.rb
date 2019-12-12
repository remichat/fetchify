Rails.application.routes.draw do
  devise_for :users

  get '/settings', to: "pages#settings"
  get '/auth/:provider/callback', to: 'spotify_sessions#create', as: "create_spotify_session"
  root to: 'pages#home'
end
