Rails.application.routes.draw do
  devise_for :users

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      namespace :current_user do
        resources :playlists, only: :index do
          resources :songs, only: :index
        end
      end
    end
  end

  resources :downloads, only: [:new, :index]

  get '/settings', to: "pages#settings"
  get '/auth/:provider/callback', to: 'spotify_sessions#create', as: "create_spotify_session"
  root to: 'pages#home'
end
