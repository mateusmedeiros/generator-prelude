Rails.application.routes.draw do
  scope 'api' do

  end

  match '*path' => 'client#index'
end
