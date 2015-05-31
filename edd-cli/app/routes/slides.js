import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('slide');
  },

  actions: {
    goToSlide: function(slide) {
      if (slide) {
        this.transitionTo('slides.slide', slide);
      }
    }
  }
});
