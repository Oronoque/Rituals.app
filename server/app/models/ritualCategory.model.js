module.exports = (sequelize, Sequelize) => {
  const RitualCategory = sequelize.define('ritualCategory', {
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
    pictureName: {
      type: Sequelize.STRING,
    },
    order: {
      type: Sequelize.INTEGER,
    },
  });

  return RitualCategory;
};
