class Slide
  attr_reader :id, :body

  def initialize(id: 1, body: '')
    @id = id
    @body = body
  end

  def self.all
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML.new)
    slides_path = [Rails.root, 'public/slides'].join('/')
    Dir.entries(slides_path).select do |e|
      e.match(/md\z/)
    end.map do |e|
      self.new(
        id: e,
        body: markdown.render(File.read("#{slides_path}/#{e}"))
      )
    end.sort { |a,b| a.id <=> b.id }
  end

end
