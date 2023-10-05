module.exports = (sequelize, Sequelize) => {
  const RitualSkeleton = sequelize.define('ritualSkeleton', {
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
    frequency: {
      type: Sequelize.STRING,
    },
    note: {
      type: Sequelize.STRING,
    },
  });

  return RitualSkeleton;
};
