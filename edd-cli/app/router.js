import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('slides', {path: '/'}, function() {
    this.route('slide', {path: '/:slide_id'});
  });
});

export default Router;
