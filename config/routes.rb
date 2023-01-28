Rails.application.routes.draw do
  devise_for :users
  resources :comments
  resources :products
  resources :posts
  get 'pages/home'
  get 'pages/contact'
  get 'about',to: 'pages#about'
  get 'gal', to: 'pages#gal'

  get 'api/allusers', to: 'pages#allusers'

  root 'pages#home'
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
