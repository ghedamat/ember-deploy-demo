class Api::SlidesController < ActionController::Base

  def index
    render json: {slides: Slide.all.map(&method(:serialize))}
  end

  private

  def serialize(slide)
    {
      id: slide.id,
      body: slide.body
    }
  end
end

