import Ember from 'ember';

export default Ember.Route.extend({
  redirect: function() {
    this.replaceWith('slides.slide', this.modelFor('slides').get('firstObject'));
  }
});

