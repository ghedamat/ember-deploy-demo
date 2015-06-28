# Ember Deploy Demo

An example project for deploying ember applications

## Rationale

There are a lot of good resources out there on how to deploy ember apps following the strategy suggested by [Luke Melia at EmberConf 2015](https://www.youtube.com/watch?v=4EDetv_Rw5U).

The [ember-cli-deploy](https://github.com/ember-cli/ember-cli-deploy) addon takes you 99% of the way there and makes this deploy method super simple.

This project puts together all the pieces and show an example workflow that allows you to use Redis/Cloudfront to serve your app in production but also to use Redis in development as well, avoiding the need to proxy from ember to your server side api.

## Live Demo/Slides

The project is currently hosted here: [Live Demo](http://ember-deploy-demo.ghedamat.com/)

The server app serves the `index.html` from `ember-cli` and exposes an API endpoint that returns the slides.

### Feedback

Please let me know what you think!

### Thanks

@lukemelia
@levelbossmike
@elucid
and all the other contributors to ember-cli-deploy
