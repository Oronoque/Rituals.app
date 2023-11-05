const Sequelize = require('sequelize');

const db = require('../models');
const RitualsSkeletons = db.ritualsSkeletons;
const RitualCategories = db.ritualCategories;
const RitualTasks = db.ritualTasks;
const RitualSkeletonTasks = db.ritualSkeletonTasks;

exports.getRitualSkeletons = async (req, res) => {
  try {
    const ritualsSkeletons = await RitualsSkeletons.findAll({
      // include: [
      //   {
      //     model: RitualCategories,
      //   },
      //   {
      //     model: RitualTasks,
      //   },
      // ],
    });

    return res.send(ritualsSkeletons);
  } catch (error) {
    console.log('error:', error);
    return res.status(500).send({ error });
  }
};

exports.getRitualSkeleton = async (req, res) => {
  try {
    const { ritualId } = req.params;

    const ritualDB = await RitualsSkeletons.findOne({
      where: { id: ritualId },
      include: [{ model: RitualTasks }],
    });

    if (!ritualDB) {
      return res.status(404).send();
    }

    return res.status(200).send(ritualDB);
  } catch (error) {
    console.log('error:', error);
    return res.status(500).send({ error });
  }
};

exports.createRitualSkeleton = async (req, res) => {
  try {
    const { name, categoryId, note, frequency } = req.body;

    if (!name || !categoryId || !frequency) {
      return res.status(400).send('params_missing');
    }

    const ritualDB = await RitualsSkeletons.findOne({ where: { name } });

    if (ritualDB) {
      return res.status(403).send('already_exists');
    }

    const createdRitual = await RitualsSkeletons.create({
      name,
      note,
      frequency,
      ritualCategoryId: categoryId,
    });

    return res.send({ success: true, data: createdRitual });
  } catch (error) {
    console.log('error:', error);
    return res.status(500).send({ error });
  }
};

exports.createSkeletonTasks = async (req, res) => {
  try {
    const { ritualId } = req.params;
    const { tasks } = req.body;

    if (!tasks.length) {
      return res.status(400).send('empty_tasks');
    }

    for (const task of tasks) {
      const createdTask = await RitualSkeletonTasks.create({
        name: task.name,
        ritualSkeletonId: ritualId,
      });
    }

    return res.send({ success: true });
  } catch (error) {
    console.log('error:', error);
    return res.status(500).send({ error });
  }
};

exports.deleteRitualSkeleton = async (req, res) => {
  const { ritualId } = req.params;

  try {
    const ritualDB = await RitualsSkeletons.findOne({ where: { id: ritualId } });

    if (!ritualDB) {
      return res.status(404).send('not_found');
    }

    await RitualsSkeletons.destroy({
      where: {
        id: ritualId,
      },
    });

    return res.send({ success: true });
  } catch (error) {
    console.log('error:', error);
    return res.status(500).send({ error });
  }
};

exports.updateRitualSkeleton = async (req, res) => {};
