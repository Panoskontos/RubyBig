class ApplicationController < ActionController::Base
    # before_action :authenticate_user!

    def encode_token(payload)
        JWT.encode(payload,'secret')
    end

    def decode_token
        # eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4fQ.anR-qOM-rZa7vfuShh4f_5rGDgKtK3LZFulKnL4kt6M
        auth_header = request.headers['Authorization']
        if auth_header
            token = auth_header.split(' ')[1]
            begin
                puts JWT.decode(token, 'secret', true, algorithm: 'HS256')
                puts "User exists, token is correct"
                return JWT.decode(token, 'secret', true, algorithm: 'HS256')
            rescue JWT::DecodeError
                puts "Can't Decode this"
                return false
                nil
            end
        end

    end

    def auth_user
        decoded_token= decode_token()
        puts decoded_token
        if decoded_token
            user_id = decoded_token[0]['user_id']
            @user = User.find_by(id: user_id)
        end
    end

    def authorize
        render json: {message: 'You have to log in'}, status: :unauthorized unless auth_user
    end


end
