module.exports = (app) => {
  const rituals = require('../controllers/ritual.controller.js');

  var router = require('express').Router();

  app.use('/api/rituals', router);

  router.get('/', rituals.getRituals);
  router.get('/:ritualId', rituals.getRitual);
  router.put('/:ritualId/tasks/:taskId', rituals.updateTask);
  router.delete('/:ritualId/tasks/:taskId', rituals.deleteTask);
  router.post('/:ritualId/tasks', rituals.insertTask);
};
