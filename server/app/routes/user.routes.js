module.exports = (app) => {
  const users = require('../controllers/user.controller.js');

  var router = require('express').Router();

  app.use('/api/users', router);

  router.get('/', users.getUsers);
};
