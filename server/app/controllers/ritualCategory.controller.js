const Sequelize = require('sequelize');

const db = require('../models');
const RitualCategories = db.ritualCategories;

exports.getRitualCategories = async (req, res) => {
  const ritualCatogories = await RitualCategories.findAll({
    order: [['order', 'ASC']],
  });

  return res.send(ritualCatogories);
};

exports.getRitualCategory = async (req, res) => {
  const { ritualCategoryId } = req.params;

  const ritualCategoryDB = await RitualCategories.findOne({ where: { id: ritualCategoryId } });

  if (!ritualCategoryDB) {
    return res.status(404).send();
  }

  return res.status(200).send(ritualCategoryDB);
};

exports.createRitualCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const ritualCategoryDB = await RitualCategories.findOne({ where: { name } });

    if (ritualCategoryDB) {
      return res.status(409).send('already_exists');
    }

    if (!name) {
      return res.status(400).send('params_missing');
    }

    const createdRitualCategory = await RitualCategories.create({ name });

    return res.send({ success: true, data: createdRitualCategory });
  } catch (error) {
    console.log('error:', error);
    return res.status(500).send({ error });
  }
};

exports.updateRitualCategory = async (req, res) => {
  try {
    const { ritualCategoryId } = req.params;
    const { name, order } = req.body;

    if (!name) {
      return res.status(400).send('params_missing');
    }

    const ritualCategoryDB = await RitualCategories.findOne({ where: { id: ritualCategoryId } });

    if (!ritualCategoryDB) {
      return res.status(404).send('not_found');
    }

    await RitualCategories.update(
      { name, order },
      {
        where: {
          id: ritualCategoryId,
        },
      },
    );

    return res.send({ success: true });
  } catch (error) {
    console.log('error:', error);
    return res.status(500).send({ error });
  }
};

exports.deleteRitualCategory = async (req, res) => {
  const { ritualCategoryId } = req.params;
  console.log('ritualCategoryId:', ritualCategoryId);

  try {
    const ritualCategoryDB = await RitualCategories.findOne({ where: { id: ritualCategoryId } });

    if (!ritualCategoryDB) {
      return res.status(404).send('not_found');
    }

    await RitualCategories.destroy({
      where: {
        id: ritualCategoryId,
      },
    });

    return res.send({ success: true });
  } catch (error) {
    console.log('error:', error);
    return res.status(500).send({ error });
  }
};
