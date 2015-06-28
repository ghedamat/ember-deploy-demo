class Api::SlidesController < ActionController::Base

  def index
    render json: {data: Slide.all.map(&method(:serialize))}
  end

  private

  def serialize(slide)
    {
      type: "slides",
      id: slide.id,
      attributes: {
        body: slide.body
      }
    }
  end
end

