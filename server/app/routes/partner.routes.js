module.exports = (app) => {
  const partners = require('../controllers/partner.controller.js');

  var router = require('express').Router();

  app.use('/api/partners', router);

  router.get('/', partners.getPartners);
  router.post('/', partners.createPartner);
  router.patch('/:partnerId', partners.updatePartner);
  router.get('/:partnerId', partners.getPartner);
  router.delete('/:partnerId', partners.deletePartner);
};
