module.exports = (sequelize, Sequelize) => {
  const Ritual = sequelize.define('ritual', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: Sequelize.DATE,
    },
    note: {
      type: Sequelize.STRING,
    },
    startDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });

  return Ritual;
};
