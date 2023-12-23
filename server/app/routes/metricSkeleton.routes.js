module.exports = (app) => {
  const metricSkeletons = require('../controllers/metricSkeleton.controller.js');

  var router = require('express').Router();

  router.get('/', metricSkeletons.getMetricSkeletons);
  router.post('/', metricSkeletons.createMetricSkeleton);
  router.get('/:metricId', metricSkeletons.getMetricSkeleton);
  router.patch('/:metricId', metricSkeletons.updateMetricSkeleton);
  router.delete('/:metricId', metricSkeletons.deleteMetricSkeleton);
  router.post('/:metricId/skeletonMetrics', metricSkeletons.createSkeletonMetrics);

  app.use('/api/metricSkeletons', router);
};
