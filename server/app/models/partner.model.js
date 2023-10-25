module.exports = (sequelize, Sequelize) => {
  const Partner = sequelize.define('partner', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    profilePictureURL: {
      type: Sequelize.BLOB,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    youtube: {
      type: Sequelize.STRING,
    },
    facebook: {
      type: Sequelize.STRING,
    },
    twitter: {
      type: Sequelize.STRING,
    },
    instagram: {
      type: Sequelize.STRING,
    },
    websiteUrl: {
      type: Sequelize.STRING,
    },
    order: {
      type: Sequelize.INTEGER,
      unique: true,
    },
  });

  return Partner;
};
