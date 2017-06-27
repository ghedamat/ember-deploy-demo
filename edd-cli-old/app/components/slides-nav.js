import Ember from 'ember';

export default Ember.Component.extend({
  tagName:          'nav',
  elementId:        'slides-nav',
  visitedSlides:    Ember.computed.filterBy('slidesProxy', 'visited', true),
  showProgressBar:  false,
  showSlideNumber:  false,

  slidesProxy: function() {
    var currentSlideIndex = this.get('currentSlideIndex'),
        slides            = this.get('slides'),
        markerWidth       = 100 / (slides.length - 1);

    return slides.map(function(slide, index){
      slide                 = {id: slide};
      slide['visited']      = (index <= currentSlideIndex) ? true : false;
      slide['markerStyle']  = (index > 0) ? "width: %@%".fmt(markerWidth) : "width: 0px";
      return slide;
    });
  }.property('slides', 'currentSlideIndex'),

  currentSlideIndex: function() {
    return this.get('slides').indexOf(this.get('currentSlide'));
  }.property('slides', 'currentSlide.id'),

  currentSlideHumanizedIndex: function() {
    return this.get('currentSlideIndex') + 1;
  }.property('currentSlideIndex'),

  nextSlideId: function() {
    return this.get('slides').objectAt(this.get('currentSlideIndex') + 1);
  }.property('slides', 'currentSlideIndex'),

  prevSlideId: function() {
    return this.get('slides').objectAt(this.get('currentSlideIndex') - 1);
  }.property('slides', 'currentSlideIndex'),

  progress: function() {
    return (this.get('visitedSlides.length') / this.get('slides.length')) * 100;
  }.property('slides.length', 'visitedSlides.length'),

  didInsertElement: function() {
    var component = this;

    Ember.$(document).on('keyup.slides-nav', function(event) {
      var slides = component.get('slides');

      switch (event.which) {
        case 48:  // 0
          component.sendAction('goToSlide', slides.objectAt(9));
          break;
        case 49:  // 1
          component.sendAction('goToSlide', slides.objectAt(0));
          break;
        case 50:  // 2
          component.sendAction('goToSlide', slides.objectAt(1));
          break;
        case 51:  // 3
          component.sendAction('goToSlide', slides.objectAt(2));
          break;
        case 52:  // 4
          component.sendAction('goToSlide', slides.objectAt(3));
          break;
        case 53:  // 5
          component.sendAction('goToSlide', slides.objectAt(4));
          break;
        case 54:  // 6
          component.sendAction('goToSlide', slides.objectAt(5));
          break;
        case 55:  // 7
          component.sendAction('goToSlide', slides.objectAt(6));
          break;
        case 56:  // 8
          component.sendAction('goToSlide', slides.objectAt(7));
          break;
        case 57:  // 9
          component.sendAction('goToSlide', slides.objectAt(8));
          break;
        case 37:  // left arrow
        case 38:  // up arrow
        case 72:  // h
        case 75:  // k
        case 188: // comma/less-than
          component.sendAction('goToSlide', component.get('prevSlideId'));
          break;
        case 32:  // spacebar
        case 39:  // right arrow
        case 40:  // down arrow
        case 74:  // j
        case 76:  // l
        case 190: // dot/more-than
          component.sendAction('goToSlide', component.get('nextSlideId'));
          break;
        case 78:  // n
          component._toggleSlideNumber();
          break;
        case 80:  // p
          component._toggleProgressBar();
          break;
      }
    });
  },

  willDestroyElement: function() {
    Ember.$(document).off('keyup.slides-nav');
  },

  _toggleSlideNumber: function() {
    this._toggleChild('#current-slide-number', 'showSlideNumber');
  },

  _toggleProgressBar: function() {
    this._toggleChild('ul', 'showProgressBar');
  },

  _toggleChild: function(childSelector, property) {
    if (this.get(property) === true) {
      this.$(childSelector).addClass('hidden');
      Ember.run.later(this, function() {
        this.set(property, false);
      }, 250);
    }
    else {
      this.set(property, true);
      Ember.run.next(this, function() {
        this.$(childSelector).removeClass('hidden');
      });
    }
  }
});
