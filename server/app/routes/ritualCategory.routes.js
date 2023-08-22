module.exports = (app) => {
  const ritualCategories = require('../controllers/ritualCategory.controller.js');

  var router = require('express').Router();

  app.use('/api/ritualCategories', router);

  router.get('/', ritualCategories.getRitualCategories);
  router.get('/:ritualCategoryId', ritualCategories.getRitualCategory);
  router.post('/', ritualCategories.createRitualCategory);
  router.patch('/:ritualCategoryId', ritualCategories.updateRitualCategory);
  router.delete('/:ritualCategoryId', ritualCategories.deleteRitualCategory);
};
