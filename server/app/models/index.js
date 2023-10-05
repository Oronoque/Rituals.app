const { Sequelize } = require('sequelize');

const DB_HOST = 'localhost';
const DB_USERNAME = 'me';
const DB_PASSWORD = 'password';
const DB_NAME = 'ritualapp';

const OPTIONS = {
  host: DB_HOST,
  dialect: 'postgres',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, OPTIONS);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user.model.js')(sequelize, Sequelize);
db.ritualsSkeletons = require('./ritualSkeleton.model.js')(sequelize, Sequelize);
db.rituals = require('./ritual.model.js')(sequelize, Sequelize);
db.ritualCategories = require('./ritualCategory.model.js')(sequelize, Sequelize);
db.ritualTasks = require('./ritualTask.model.js')(sequelize, Sequelize);

db.ritualCategories.hasMany(db.ritualsSkeletons, {
  allowNull: false,
  foreignKey: 'ritualCategoryId',
  onDelete: 'CASCADE',
});
db.ritualsSkeletons.belongsTo(db.ritualCategories);

db.ritualsSkeletons.hasMany(db.rituals, {
  allowNull: false,
  foreignKey: 'ritualSkeletonId',
  onDelete: 'CASCADE',
});
db.rituals.belongsTo(db.ritualsSkeletons);

db.ritualsSkeletons.hasMany(db.ritualTasks, {
  allowNull: false,
  foreignKey: 'ritualSkeletonId',
  onDelete: 'CASCADE',
});
db.ritualTasks.belongsTo(db.ritualsSkeletons);

module.exports = db;
