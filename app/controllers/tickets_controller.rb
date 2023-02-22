class TicketsController < ApplicationController
  before_action :authorize
  before_action :set_ticket, only: %i[ show edit update destroy ]
  skip_before_action :verify_authenticity_token


  # GET /tickets or /tickets.json
  def index
    @tickets = Ticket.all
  end

  # GET /tickets/1 or /tickets/1.json
  def show
    @ticket = Ticket.find(params[:id])
    render json: @ticket 
  end

  # GET /tickets/new
  def new
    @ticket = Ticket.new
  end

  def get_tickets_for_event
    @tickets = Ticket.where(event_id: ticket_params_only_event[:event_id])
    render json: @tickets
  end

  # GET /tickets/1/edit
  def edit
  end

  # POST /tickets or /tickets.json
  def create
    @ticket = Ticket.new(ticket_params)
    @event = Event.find(id=@ticket.event_id)    
    puts @event
    if @event.seatsAvailable - 1 < 0
      return render json: { msg: "Can't create more tickets availability is full" } 
    end
    @event.seatsAvailable =  @event.seatsAvailable - 1
    @event.save()

    if Ticket.exists?(event_id: @ticket.event_id)
      @previous_tickets = Ticket.where(event_id: @ticket.event_id).last
      puts @previous_tickets
      # @last_of_previous = @previous_tickets.last
      @ticket.seat = @previous_tickets.seat + 1
    else 
      @ticket.seat = 1
    end

    @ticket.code = rand(10000...100000)
    @ticket.status = "booked"
    if @ticket.save
      TicketMailer.with(ticket: @ticket, event: @event).new_ticket.deliver_now
        # format.json { render :show, status: :created, location: @ticket }
        render json: { ticket: @ticket } 
        # format.html { redirect_to ticket_url(@ticket), notice: "Ticket was successfully created." }      
    else
        render json: @ticket.errors, status: :unprocessable_entity 
    end
  end

  # PATCH/PUT /tickets/1 or /tickets/1.json
  def update
    respond_to do |format|
      if @ticket.update(ticket_params)
        format.html { redirect_to ticket_url(@ticket), notice: "Ticket was successfully updated." }
        format.json { render :show, status: :ok, location: @ticket }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @ticket.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tickets/1 or /tickets/1.json
  def destroy
    @ticket.destroy

    respond_to do |format|
      format.html { redirect_to tickets_url, notice: "Ticket was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ticket
      @ticket = Ticket.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def ticket_params
      params.require(:ticket).permit(:event_id, :fname, :lname, :email)
    end



    def ticket_params_only_event
      params.permit(:event_id)
    end

end
