class EventsController < ApplicationController
  # before_action :authorize
  before_action :set_event, only: %i[ show edit update destroy ]
  skip_before_action :verify_authenticity_token


  # GET /events or /events.json
  def index
    @events = Event.all
    # render json: @events
  end

  # GET /events/1 or /events/1.json
  def show
  end

  def get_events_for_theatre
    @events = Event.where(theatre_id: event_params_only_theatre[:theatre_id])
    render json: @events
  end

  # GET /events/new
  def new
    @event = Event.new
  end

  # GET /events/1/edit
  def edit
  end

  # POST /events or /events.json
  def create
    @event = Event.new(event_params)

    @theatres = Theatre.find(id=@event.theatre_id)
    @event.seatsAvailable = @theatres.seats
    @event.seatsTotal = @theatres.seats
    if @event.save
      render json: { ticket: @event } 
  else
      render json: @event.errors, status: :unprocessable_entity 
  end
    
  end

  # PATCH/PUT /events/1 or /events/1.json
  def update
    respond_to do |format|
      if @event.update(event_params)
        format.html { redirect_to event_url(@event), notice: "Event was successfully updated." }
        format.json { render :show, status: :ok, location: @event }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /events/1 or /events/1.json
  def destroy
    @event.destroy
    render json: { ticket: "Event was destroyed" } 
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find(params[:id])
    end

    # def set_theatre
    #   @theatre = Theatre.find(id = params[:theatre_id])
    # end
    # save 1 seat method


    # Only allow a list of trusted parameters through.
    def event_params
      params.require(:event).permit(:name, :theatre_id, :date, :price, :image, :email)
    end

    def event_params_only_theatre
      params.permit(:theatre_id, :event)
    end
end
