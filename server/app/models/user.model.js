module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      profileImgUrl: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      isDarkMode: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isNotificationsAllowed: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      onboardedAt: {
        type: Sequelize.DATE,
      },
    },
    {
      defaultScope: {
        attributes: {
          exclude: ['password'],
        },
      },
      scopes: {
        auth: {
          attributes: {
            include: ['password'],
          },
        },
      },
    },
  );

  return User;
};
