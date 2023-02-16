class TicketsController < ApplicationController
  before_action :set_ticket, only: %i[ show edit update destroy ]
  skip_before_action :verify_authenticity_token


  # GET /tickets or /tickets.json
  def index
    @tickets = Ticket.all
  end

  # GET /tickets/1 or /tickets/1.json
  def show
  end

  # GET /tickets/new
  def new
    @ticket = Ticket.new
  end

  # GET /tickets/1/edit
  def edit
  end

  # POST /tickets or /tickets.json
  def create
    @ticket = Ticket.new(ticket_params)
    @event = Event.find(id=@ticket.event_id)
    puts "pop smoke"
    
    puts @event
    @event.seatsAvailable =  @event.seatsAvailable - 1
    @event.save()

    if Ticket.exists?(event_id: @ticket.event_id)
      @previous_tickets = Ticket.where(event_id: @ticket.event_id).last
      puts @previous_tickets
      # @last_of_previous = @previous_tickets.last
      @ticket.seat = @previous_tickets.seat + 1
    else 
      @ticket.seat = 0
    end

    @ticket.code = rand(10000...100000)
    @ticket.status = "booked"
    respond_to do |format|
      if @ticket.save
        format.html { redirect_to ticket_url(@ticket), notice: "Ticket was successfully created." }
        format.json { render :show, status: :created, location: @ticket }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @ticket.errors, status: :unprocessable_entity }
      end
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
end