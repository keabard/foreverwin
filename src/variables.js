var path = require('path');

module.exports = {
  downloads : {
    phone : path.join(__dirname, '..', 'downloads', 'phone'),
    internet : path.join(__dirname, '..', 'downloads', 'internet')
  },
  firefox : {
    config : path.join(__dirname, '..', 'firefox', 'config'),
    session : path.join(__dirname, '..', 'firefox', 'session')
  }
};