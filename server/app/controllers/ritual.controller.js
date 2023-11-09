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

    rituals.forEach((ritual) => {
      ritual.tasks.sort((a, b) => a.id - b.id);
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

exports.updateTask = async (req, res) => {
  const { ritualId, taskId } = req.params;
  const { isCompleted, name } = req.body;

  try {
    const ritualDB = await Rituals.findOne({
      where: { id: ritualId },
    });

    if (!ritualDB) {
      return res.status(404).send();
    }

    const taskDB = await Tasks.findOne({
      where: { id: taskId },
    });

    if (!taskDB) {
      return res.status(404).send();
    }

    const [, updatedArray] = await Tasks.update(
      { name, isCompleted },
      {
        where: {
          id: taskId,
        },
        returning: true,
      },
    );

    return res.send(updatedArray[0]);
  } catch (error) {
    console.log('error:', error);
    return res.status(500).send({ error });
  }
};

exports.deleteTask = async (req, res) => {
  const { ritualId, taskId } = req.params;

  try {
    const ritualDB = await Rituals.findOne({
      where: { id: ritualId },
    });

    if (!ritualDB) {
      return res.status(404).send();
    }

    const taskDB = await Tasks.findOne({
      where: { id: taskId },
    });

    if (!taskDB) {
      return res.status(404).send();
    }

    await Tasks.destroy({
      where: {
        id: taskId,
      },
      returning: true,
    });

    return res.send({ success: true });
  } catch (error) {
    console.log('error:', error);
    return res.status(500).send({ error });
  }
};

exports.insertTask = async (req, res) => {
  const { ritualId } = req.params;
  const { name } = req.body;

  try {
    const ritualDB = await Rituals.findOne({
      where: { id: ritualId },
    });

    if (!ritualDB) {
      return res.status(404).send();
    }

    await Tasks.create({
      name,
      taskSkeletonId: null,
      ritualId: ritualId,
      startDate: new Date(),
    });

    return res.send({ success: true });
  } catch (error) {
    console.log('error:', error);
    return res.status(500).send({ error });
  }
};
