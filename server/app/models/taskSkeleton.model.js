module.exports = (sequelize, Sequelize) => {
  const TaskSkeleton = sequelize.define('taskSkeleton', {
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

  return TaskSkeleton;
};
