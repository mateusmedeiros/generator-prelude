class ClientController < ActionController::Base
  def index
    expires_in 1.week, public: true
    render
  end
end
