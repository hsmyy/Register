'use strict';

var regService = require('../controllers/registerService.js');

module.exports = function(System, app, auth, database) {

  // Home route
  var index = require('../controllers/index');
  app.route('/')
    .get(index.render);

  app.route('/reg/reg').post(regService.register);
  app.route('/reg/find').get(regService.findAll);
    app.route('/reg/update').post(regService.update);
    app.route('/reg/export').get(regService.export);
};
