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
db.ritualCategories = require('./ritualCategory.model.js')(sequelize, Sequelize);
db.ritualSkeletons = require('./ritualSkeleton.model.js')(sequelize, Sequelize);
db.rituals = require('./ritual.model.js')(sequelize, Sequelize);
db.taskSkeletons = require('./taskSkeleton.model.js')(sequelize, Sequelize);
db.tasks = require('./task.model.js')(sequelize, Sequelize);
db.partners = require('./partner.model.js')(sequelize, Sequelize);

// RITUALS - TASKS
db.rituals.hasMany(db.tasks, {
  allowNull: false,
  foreignKey: 'ritualId',
  onDelete: 'CASCADE',
});
db.tasks.belongsTo(db.rituals);

// RITUALSKELETONS - TASKSKELETONS
db.ritualSkeletons.hasMany(db.taskSkeletons, {
  allowNull: false,
  foreignKey: 'ritualSkeletonId',
  onDelete: 'CASCADE',
});

db.taskSkeletons.belongsTo(db.ritualSkeletons);
// RITUALSKELETONS - RITUALS
db.ritualSkeletons.hasMany(db.rituals, {
  allowNull: false,
  foreignKey: 'ritualSkeletonId',
  onDelete: 'CASCADE',
});
db.rituals.belongsTo(db.ritualSkeletons);

// TASKSKELETONS - RITUALS
db.taskSkeletons.hasMany(db.tasks, {
  allowNull: false,
  foreignKey: 'taskSkeletonId',
  onDelete: 'CASCADE',
});
db.tasks.belongsTo(db.taskSkeletons);

// RITUALCATEGORIES - TASKSKELETONS
db.ritualCategories.hasMany(db.ritualSkeletons, {
  allowNull: false,
  foreignKey: 'ritualCategoryId',
  onDelete: 'CASCADE',
});
db.ritualSkeletons.belongsTo(db.ritualCategories);

module.exports = db;
