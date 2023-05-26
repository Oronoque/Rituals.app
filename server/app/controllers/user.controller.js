const Sequelize = require('sequelize');

const db = require('../models');

exports.getUsers = async (req, res) => {
  const users = await db.users.findAll({});

  return res.json({ success: true, data: users });
};
