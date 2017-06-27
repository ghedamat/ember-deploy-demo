import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('slide');
  },

  actions: {
    goToSlide: function(slide) {
      if (slide) {
        this.transitionTo('slides.slide', slide);
      }
    }
  }
});
