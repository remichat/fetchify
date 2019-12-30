Rails.application.routes.draw do
  devise_for :users

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      namespace :current_user do
        resources :playlists, only: :index do
          resources :songs, only: :index
        end
        resources :downloads, only: [:create, :index]
      end
    end
  end

  require "sidekiq/web"
  authenticate :user, lambda { |u| u.admin } do
    mount Sidekiq::Web => '/sidekiq'
  end

  get '/auth/:provider/callback', to: 'spotify_sessions#create', as: "create_spotify_session"

  get '/downloads/new', to: "pages#home"
  get '/downloads', to: "pages#home"
  get '/settings', to: "pages#home"
  root to: 'pages#home'
end
