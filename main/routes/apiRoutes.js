
'use strict';
module.exports = function(app) {
  var data = require('../controllers/apiController');

  // todoList Routes
  app.route('/getdata/:ID')
    .get(data.datatoJSON2);
  // app.route('/getdata')
    // .get(data.datatoJSON);
  app.route('/')
    .get(data.infopage);
  app.route('/putdata')
    .post(data.putdata);
  app.route('/show')
    .get(data.conform);

};


