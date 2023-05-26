module.exports = (app) => {
  const auth = require('../controllers/auth.controller.js');

  var router = require('express').Router();

  app.use('/api/auth', router);

  router.post('/login', auth.login);
  router.post('/register', auth.register);
  router.post('/ping', auth.ping);
};
