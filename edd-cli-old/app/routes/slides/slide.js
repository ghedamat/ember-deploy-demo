import Ember from 'ember';

export default Ember.Route.extend({
  currentSlide: Ember.inject.service(),
  afterModel: function(model) {
    this.set('currentSlide.slide', model);
  }
});
