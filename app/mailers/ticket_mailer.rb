class TicketMailer < ApplicationMailer
    def new_ticket
        puts "zzzzzzzzzzzzzz"
        @ticket = params[:ticket]
        @event = params[:event]
        puts @ticket
        mail(
            to: @ticket.email, 
            subject: 'New ticket purchase')
    end
end
