module.exports = function(app) {
  var cors       = require('cors');

  app.use(cors());


  // proxy expects a stream, but express will have turned
  // the request stream into an object because bodyParser
  // has run. We have to convert it back to stream:
  // https://github.com/nodejitsu/node-http-proxy/issues/180
  app.use(require('connect-restreamer')());
};
