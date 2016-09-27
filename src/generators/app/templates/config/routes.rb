Rails.application.routes.draw do
  scope 'api' do

  end

  get '*path' => 'client#index'
  root to: 'client#index'
end
