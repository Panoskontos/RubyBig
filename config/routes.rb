Rails.application.routes.draw do
#   devise_for :users, controllers: { 
#   omniauth_callbacks: 'users/omniauth_callbacks', 
# }
#   # sessions: 'users/sessions',
#   # registrations: 'users/registrations'

  resource :users, only: [:create]
  post "/login", to: "users#login"

  resources :comments
  resources :products
  resources :posts
  get 'pages/home'
  get 'pages/contact'
  get 'about',to: 'pages#about'
  get 'gal', to: 'pages#gal'
  # get '/auth/:provider/callback' => 'sessions#omniauth'

  get 'api/allusers', to: 'pages#allusers'

  root 'pages#home'
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
