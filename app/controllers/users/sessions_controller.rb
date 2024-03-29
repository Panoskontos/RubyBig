class Users::SessionsController < Devise::SessionsController
  skip_before_action :verify_authenticity_token  
  respond_to :json
    private
    def respond_with(resource, _opts = {})
    if current_user
      render json: {message: "success"}, status: :ok
    else 
      render json: { message: 'Please Login.'}, status: :unauthorized
    end
  end
    def respond_to_on_destroy
      current_user ? log_out_success : log_out_failure
    end
    def log_out_success
      render json: { message: "Logged out." }, status: :ok
    end
    def log_out_failure
      render json: { message: "Logged out failure."}, status: :unauthorized
    end
  end