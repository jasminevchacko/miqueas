// next.config.js
const withOffline = require('next-offline')
const dotEnv = require("dotenv");
dotEnv.config();
const withStyledIcons = require('next-plugin-styled-icons')

const nextConfig = {
  env: {
    DB_PASS : process.env.DB_PASS
  },
  target: 'serverless',
  transformManifest: manifest => ['/'].concat(manifest), // add the homepage to the cache
  // Trying to set NODE_ENV=production when running yarn dev causes a build-time error so we
  // turn on the SW in dev mode so that we can actually test it
  generateInDevMode: true,
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
  webpack: (config) => {
    config.plugins.push(
      new FilterWarningsPlugin({ 
        exclude: /chunk styles [mini-css-extract-plugin][^]*Conflicting order between:/, 
      })
    );
    return config;
  }
};

module.exports = withStyledIcons(withOffline({nextConfig}));
