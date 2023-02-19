class TheatresController < ApplicationController
  before_action :authorize
  before_action :set_theatre, only: %i[ show edit update destroy ]
  skip_before_action :verify_authenticity_token


  # GET /theatres or /theatres.json
  def index
    @theatres = Theatre.all
    render json:@theatres
  end

  # GET /theatres/1 or /theatres/1.json
  def show
    render json:@theatre
  end

  # GET /theatres/new
  def new
    @theatre = Theatre.new
  end

  # GET /theatres/1/edit
  def edit
  end

  # POST /theatres or /theatres.json
  def create
    @theatre = Theatre.new(theatre_params)
      if @theatre.save
        render json: { theatre: @theatre } 
      else
        render json: @theatre.errors, status: :unprocessable_entity 
    end
  end

  # PATCH/PUT /theatres/1 or /theatres/1.json
  def update
    respond_to do |format|
      if @theatre.update(theatre_params)
        format.html { redirect_to theatre_url(@theatre), notice: "Theatre was successfully updated." }
        format.json { render :show, status: :ok, location: @theatre }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @theatre.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /theatres/1 or /theatres/1.json
  def destroy
    @theatre.destroy

    respond_to do |format|
      format.html { redirect_to theatres_url, notice: "Theatre was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_theatre
      @theatre = Theatre.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def theatre_params
      params.require(:theatre).permit(:name, :location,:seats, :image)
    end
end
