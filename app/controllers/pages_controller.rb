class PagesController < ApplicationController
  def home
  end

  def gal
  # render html:"hello maaan"
  @users =  ["joe","nik","johny"] 
  @problems = ['money','sleep']
  render template: "pages/gal"
  end  

  def contact
  end

  # json data
  def allusers
    @allusers = [
      {
        :name => "Panos",
        :age => 26,
        :location => "ATH"
      },
      {
        :name => "Nik",
        :age => 26,
        :location => "ATH"
      }
    ]
    render json: @allusers
  end

  def about
  end
end
