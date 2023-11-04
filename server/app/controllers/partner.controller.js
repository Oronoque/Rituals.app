const { sendNotification } = require('../services/notifications');

const Sequelize = require('sequelize');

const db = require('../models');
const Partners = db.partners;

// this is how to create infite scroll behavior
exports.getPartners = async (req, res) => {
  const { page = 1, limit = 3 } = req.query;

  const partners = await Partners.findAll({
    order: [['id', 'ASC']],
    limit: limit,
    offset: (page - 1) * limit,
  });

  return res.json({ success: true, data: partners });
};

exports.getPartner = async (req, res) => {
  const { partnerId } = req.params;

  try {
    const partnerDB = await Partners.findOne({ where: { id: partnerId } });

    if (!partnerDB) {
      return res.status(404).send();
    }
    return res.status(200).send(partnerDB);
  } catch (error) {
    console.log('something bad happened', error);
    return res.status(500).send();
  }
};

exports.createPartner = async (req, res) => {
  console.log('req.body', req.body);

  const { name, description, email, youtube, facebook, twitter, instagram, order, websiteUrl } =
    req.body;

  if (!name || !description || !email || !order) {
    return res.status(400).json({ error: 'missing_parameters' });
  }

  try {
    const partnerDB = await Partners.findOne({ where: { order } });

    if (partnerDB) {
      return res.status(409).json({ error: 'conflict_already_exists' });
    }

    const createdPartner = await Partners.create({
      name,
      description,
      email,
      youtube,
      facebook,
      twitter,
      instagram,
      websiteUrl,
      order,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log('something bad happened', error);
    return res.status(500).send();
  }
};

exports.updatePartner = async (req, res) => {
  const { partnerId } = req.params;
  const { name, description, email, youtube, facebook, twitter, instagram, order, websiteUrl } =
    req.body;

  try {
    const partnerDB = await Partners.findOne({ where: { id: partnerId } });

    if (!partnerDB) {
      return res.status(404).send('not_found');
    }

    await Partners.update(
      { name, description, email, youtube, facebook, twitter, instagram, order, websiteUrl },
      {
        where: {
          id: partnerId,
        },
      },
    );

    return res.send({ success: true });
  } catch (error) {
    console.log('error:', error);
    return res.status(500).send({ error });
  }
};

exports.deletePartner = async (req, res) => {
  const { partnerId } = req.params;

  try {
    const partnerDB = await Partners.findOne({ where: { id: partnerId } });
    console.log('partnerDB', partnerDB);

    if (!partnerDB) {
      return res.status(404).send('not_found');
    }

    await Partners.destroy({
      where: {
        id: partnerId,
      },
    });

    await sendNotification({ title: 'partner deleted', body: 'partner is deleted from db' });

    return res.send({ success: true });
  } catch (error) {
    console.log('error:', error);
    return res.status(500).send({ error });
  }
};
