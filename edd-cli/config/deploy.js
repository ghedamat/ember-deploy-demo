require('dotenv').load();
module.exports = {
  development: {
    buildEnv: 'development',
    store: {
      type: 'redis',  // this can be omitted because it is the default
      host: 'localhost',
      port: 6379
    }
  },

  staging: {
    buildEnv: 'staging', // Override the environment passed to the ember asset build. Defaults to 'production'
    store: {
      type: 'redis',
      host: process.env['STAGING_HOST'],
      port: process.env['STAGING_PORT'],
      ssh: {
        username: process.env['STAGING_USERNAME'],
        privateKey: process.env['STAGING_KEY_PATH']
      }
    },
    assets: {
      accessKeyId: process.env['AWS_ACCESS_KEY'],
      secretAccessKey: process.env['AWS_SECRET_KEY'],
      bucket: 'edd-staging'
    }
  },

  production: {
    buildEnv: 'production', // Override the environment passed to the ember asset build. Defaults to 'production'
    store: {
      type: 'redis',
      host: process.env['PRODUCTION_HOST'],
      port: process.env['PRODUCTION_PORT'],
      ssh: {
        username: process.env['PRODUCTION_USERNAME'],
        privateKey: process.env['PRODUCTION_KEY_PATH']
      }
    },
    assets: {
      accessKeyId: process.env['AWS_ACCESS_KEY'],
      secretAccessKey: process.env['AWS_SECRET_KEY'],
      bucket: 'edd-production'
    }

  }
};
