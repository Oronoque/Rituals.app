module.exports = (sequelize, Sequelize) => {
  const Ritual = sequelize.define('ritual', {
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

  return Ritual;
};
