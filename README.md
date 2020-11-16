# NOTE:
This repository is DEPRECATED

the code is stil valid but the app is no longer hosted and Rails has been updated serveral times since when this was built

that said you can still look at it and explore the implementation!

# Ember Deploy Demo

An example project for deploying Ember applications.

## Rationale

There are a lot of good resources out there on how to deploy ember apps following the strategy suggested by [Luke Melia at EmberConf 2015](https://www.youtube.com/watch?v=4EDetv_Rw5U).

The [ember-cli-deploy](https://github.com/ember-cli/ember-cli-deploy) addon takes you 99% of the way there and makes this deploy method super simple.

This project puts together all the pieces and show an example workflow that allows you to use Redis/Cloudfront to serve your app in production but also to use Redis in development as well, avoiding the need to proxy from ember to your server side API.

## Live Demo/Slides


The server app serves the `index.html` from `ember-cli` and exposes an API endpoint that returns the slides.

## Running the Project(s)

Dependencies:

* NPM
* Bower
* Redis

Switch into the Rails project and install dependencies:

    $ cd edd-rails
    $ bundle install

Start the server:

    $ bundle exec rails server

Looking at http://localhost:3000, you should see "INDEX NOT FOUND" displayed. This is because we've yet to deploy an index to Redis in development. 

Switch into the Ember project and install dependencies:

    $ cd ../edd-cli
    $ npm install
    $ bower install

Start the server:
    
    $ ember server

After the initial build, you'll see a line line:

    - ✔ Activated revision `__development__`

in the console. This means that the index has been pushed to Redis. Let's check Redis:

    $ redis-cli
    > KEYS edd-cli*
    1) "edd-cli:current"
    2) "edd-cli:revisions"
    3) "edd-cli:__development__"

Looks like Ember CLI Deploy pushed the indexes in. Go ahead and head back to the Rails app at http://localhost:3000 to see the `__development` index "running" inside the Rails app via Redis.

### Feedback

Please let me know what you think!

### Thanks

@lukemelia
@levelbossmike
@elucid
and all the other contributors to ember-cli-deploy
