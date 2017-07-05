/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var env = EmberApp.env()|| 'development';
  var isProdBuild = 'production' === env;

  var fingerprintOptions = {
    enabled: true,
    extensions: ['js', 'css', 'png', 'jpg', 'gif']
  };

  switch (env) {
    case 'development':
      fingerprintOptions.prepend = 'http://localhost:4200/';
    break;
    case 'production':
      fingerprintOptions.prepend = 'https://d34ffs4dj251fe.cloudfront.net/';
    break;
  }

  var app = new EmberApp(defaults, {
    fingerprint: fingerprintOptions,
    emberCLIDeploy: {
      runOnPostBuild: (env === 'development') ? 'development-postbuild' : false,
      shouldActivate: true
    },
    sourcemaps: {
      enabled: !isProdBuild,
    },
    minifyCSS: { enabled: isProdBuild },
    minifyJS: { enabled: isProdBuild },

    tests: process.env.EMBER_CLI_TEST_COMMAND || !isProdBuild,
    hinting: process.env.EMBER_CLI_TEST_COMMAND || !isProdBuild
  });

  return app.toTree();
};
