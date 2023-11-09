module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define('task', {
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
    startDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });

  return Task;
};
