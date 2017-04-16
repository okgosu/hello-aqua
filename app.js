'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
module.exports = app; // for testing

var config = {
  appRoot: __dirname, // required config

  swaggerSecurityHandlers: {
    api_key: function (req, authOrSecDef, scopesOrApiKey, cb) {
      // your security code
      if ('1234' === scopesOrApiKey) {
        cb();
      } else {
        cb(new Error('access denied!'));
      }
    }
  }

};

var SwaggerUi = require('swagger-tools/middleware/swagger-ui');

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // add swagger-ui (/docs)
  app.use(SwaggerUi(swaggerExpress.runner.swagger));

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
