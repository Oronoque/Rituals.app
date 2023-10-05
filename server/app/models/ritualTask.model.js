module.exports = (sequelize, Sequelize) => {
  const RitualTask = sequelize.define('ritualTask', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },

    isCompleted: {
      type: Sequelize.BOOLEAN,
    },
  });

  return RitualTask;
};
