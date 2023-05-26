module.exports = (app) => {
  const rituals = require('../controllers/ritual.controller.js');

  var router = require('express').Router();

  app.use('/api/rituals', router);

  router.get('/', rituals.getRituals);
  router.get('/:ritualId', rituals.getRitual);
  router.post('/', rituals.createRitual);
  router.delete('/:ritualId', rituals.deleteRitual);
  router.patch('/:ritualId', rituals.updateRitual);
};
