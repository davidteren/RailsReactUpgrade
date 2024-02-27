require "sidekiq/web"

Rails.application.routes.draw do
  get "test_view_loader/index"
  root "test_view_loader#index"
  get "test_react_loader/index"
end
