const path = require('path');

module.exports = {
  webpack(config) {
    config.resolve.alias['@myAlias'] = path.resolve(__dirname, 'src');
    return config;
  }
};
