module.exports = (sequelize, Sequelize) => {
  const MetricSkeleton = sequelize.define('metricSkeleton', {
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

  return MetricSkeleton;
};
