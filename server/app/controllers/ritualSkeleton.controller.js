const Sequelize = require('sequelize');

const db = require('../models');
const RitualSkeletons = db.ritualSkeletons;
const RitualCategories = db.ritualCategories;
const Tasks = db.tasks;
const TaskSkeletons = db.taskSkeletons;

exports.getRitualSkeletons = async (req, res) => {
  try {
    const ritualsSkeletons = await RitualSkeletons.findAll({
      // include: [
      //   {
      //     model: RitualCategories,
      //   },
      //   {
      //     model: Tasks,
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

    const ritualDB = await RitualSkeletons.findOne({
      where: { id: ritualId },
      include: [{ model: Tasks }],
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

    const ritualDB = await RitualSkeletons.findOne({ where: { name } });

    if (ritualDB) {
      return res.status(403).send('already_exists');
    }

    const createdRitual = await RitualSkeletons.create({
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
      const createdTask = await TaskSkeletons.create({
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
    const ritualDB = await RitualSkeletons.findOne({ where: { id: ritualId } });

    if (!ritualDB) {
      return res.status(404).send('not_found');
    }

    await RitualSkeletons.destroy({
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
