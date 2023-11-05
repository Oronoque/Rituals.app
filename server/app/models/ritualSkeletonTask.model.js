module.exports = (sequelize, Sequelize) => {
  const RitualSkeletonTask = sequelize.define('ritualSkeletonTask', {
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
  });

  return RitualSkeletonTask;
};
