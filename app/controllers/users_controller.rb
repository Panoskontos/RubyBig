class UsersController < ApplicationController
    skip_before_action :verify_authenticity_token  
    
    def create
        @user = User.create(user_params)
        puts @user
        
        if @user.valid?
            token = encode_token({user_id: @user.id})
            render json: {user: @user, token: token}, status: :ok
        else
            render json: { error: 'Invalid'}, status: :unprocessable_entity
        end
    end

    def login
            @user = User.find_by(email: user_params[:email])
            decode_token
            if @user && @user.valid_password?(user_params[:password])
                token = encode_token({user_id: @user.id})
                render json: {user: @user,token: token}, status: :ok
            else
                render json: { error: 'User does not exist'}, status: :unprocessable_entity
            end

    end

    def change_role
        @user = User.find_by(email: user_params_change_role[:email])
        @user.update(role:  user_params_change_role[:role])
        @user.save()
        render json: {message: "User with this mail has changed role new role is", new_role: @user.role}, status: :ok
    end

    def user_params_change_role
        params.permit(:email, :role)
    end

    def user_params
        params.require(:user).permit(:email, :password)
    end

end