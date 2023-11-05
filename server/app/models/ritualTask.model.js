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
    },
    isCompleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });

  return RitualTask;
};
