const { Op } = require('sequelize');
const moment = require('moment');

const db = require('../models');
const RitualSkeletons = db.ritualSkeletons;
const RitualCategories = db.ritualCategories;
const RitualTasks = db.ritualTasks;
const Rituals = db.rituals;
const Tasks = db.tasks;

exports.getRituals = async (req, res) => {
  // const { day = moment().format('YYYY-MM-DD') } = req.query;
  const { day } = req.query;

  try {
    const queryQuery = {};

    if (day) {
      queryQuery.startDate = {
        [Op.between]: [`${day} 00:00:00`, `${day} 23:59:59`],
      };
    }

    const rituals = await Rituals.findAll({
      where: queryQuery,

      include: [
        {
          model: RitualSkeletons,
        },
        {
          model: Tasks,
        },
      ],
    });

    return res.send(rituals);
  } catch (error) {
    console.log('error:', error);
    return res.status(500).send({ error });
  }
};
exports.getRitual = async (req, res) => {
  const { ritualId } = req.params;

  try {
    const ritualDB = await Rituals.findOne({
      where: { id: ritualId },

      include: [
        {
          model: RitualSkeletons,
          include: [{ model: RitualCategories }, { model: RitualTasks }],
        },
      ],
    });

    return res.send(ritualDB);
  } catch (error) {
    console.log('error:', error);
    return res.status(500).send({ error });
  }
};
