const Sequelize = require('sequelize');

const db = require('../models');

const { generateId } = require('../utils/string');

const ritualCategories = [
  {
    id: generateId(),
    name: 'fitness',
  },
  {
    id: generateId(),
    name: 'daily',
  },
  {
    id: generateId(),
    name: 'deep work',
  },
];

exports.getRitualCategories = async (req, res) => {
  return res.send(ritualCategories);
};

exports.getRitualCategory = async (req, res) => {
  const { ritualCategoryId } = req.params;

  const category = ritualCategories.find((category) => category.id === ritualCategoryId);

  if (category) {
    return res.send(category);
  }

  return res.status(404).send();
};

exports.createRitualCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('params_missing');
  }

  ritualCategories.push({
    id: generateId(),
    name,
  });

  return res.send({ success: true, data: ritualCategories });
};

exports.updateRitualCategory = async (req, res) => {
  const { ritualCategoryId } = req.params;

  const { name } = req.body;

  const categoryIndex = ritualCategories.findIndex((category) => category.id === ritualCategoryId);

  if (categoryIndex === -1) {
    return res.status(404).send();
  }

  let matchingRitualCategory = ritualCategories[categoryIndex];

  const updatedCategory = {
    id: matchingRitualCategory.id,
    name: name || matchingRitualCategory.name,
  };

  return res.send({ success: true, data: updatedCategory });
};

exports.deleteRitualCategory = async (req, res) => {
  const { ritualCategoryId } = req.params;

  const matchingIndex = ritualCategories.findIndex((ritual) => ritual.id === ritualCategoryId);

  if (matchingIndex !== -1) {
    ritualCategories.splice(matchingIndex, 1);
    return res.send({ success: true, data: ritualCategories });
  }

  return res.status(404).send();
};
