const Sequelize = require('sequelize');

const db = require('../models');

const { generateId } = require('../utils/string');

const rituals = [
  {
    id: generateId(),
    name: 'chest day',
    category: 'fitness',
  },
  {
    id: generateId(),
    name: 'morning',
    category: 'daily',
  },
  {
    id: generateId(),
    name: 'research reading',
    category: 'deep work',
  },
];

exports.getRituals = async (req, res) => {
  return res.send(rituals);
};

exports.getRitual = async (req, res) => {
  const { ritualId } = req.params;

  const ritual = rituals.find((ritual) => ritual.id === ritualId);

  if (ritual) {
    return res.send(ritual);
  }

  return res.status(404).send();
};

exports.createRitual = async (req, res) => {
  const { name, category } = req.body;

  if (!name) {
    return res.status(400).send('params_missing');
  }

  rituals.push({
    id: generateId(),
    name,
    category: 'hard coded category',
  });

  return res.send({ success: true, data: rituals });
};

exports.deleteRitual = async (req, res) => {
  const { ritualId } = req.params;

  const matchingIndex = rituals.findIndex((ritual) => ritual.id === ritualId);

  if (matchingIndex !== -1) {
    rituals.splice(matchingIndex, 1);
    return res.send({ success: true, data: rituals });
  }

  return res.status(404).send();
};

exports.updateRitual = async (req, res) => {
  const { ritualId } = req.params;
  const { name, category } = req.body;

  const ritualIndex = rituals.findIndex((ritual) => ritual.id === ritualId);

  if (ritualIndex === -1) {
    return res.status(404).send();
  }

  let matchingRitual = rituals[ritualIndex];

  const updatedRitual = {
    id: matchingRitual.id,
    name: name || matchingRitual.name,
    category: category || matchingRitual.category,
  };

  matchingRitual = updatedRitual;

  return res.send({ success: true, data: updatedRitual });
};
