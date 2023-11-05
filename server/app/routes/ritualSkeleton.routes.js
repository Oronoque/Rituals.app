module.exports = (app) => {
  const ritualSkeletons = require('../controllers/ritualSkeleton.controller.js');

  var router = require('express').Router();

  app.use('/api/ritualSkeletons', router);

  router.get('/:ritualId', ritualSkeletons.getRitualSkeleton);
  router.post('/', ritualSkeletons.createRitualSkeleton);
  router.delete('/:ritualId', ritualSkeletons.deleteRitualSkeleton);
  router.patch('/:ritualId', ritualSkeletons.updateRitualSkeleton);
  router.post('/:ritualId/skeletonTasks', ritualSkeletons.createSkeletonTasks);
  router.get('/', ritualSkeletons.getRitualSkeletons);
};
