// const yargs = require('yargs');

const db = require('./app/models');

// const options = {
//   mode: {
//     describe: 'Mode',
//     type: 'string',
//     choices: ['update', 'delete'],
//     default: 'update',
//   },
// };

// const params = yargs.options(options).argv;

// if (params.mode === 'delete') {
//   db.sequelize.sync({ force: true }).then(() => {
//     console.log('Drop and re-sync db.');
//   });
// }

// if (params.mode === 'update') {
//   db.sequelize.sync({ alter: true }).then(() => {
//     console.log('Alter and re-sync db.');
//   });
// }

db.sequelize.sync({ alter: true }).then(() => {
  console.log('Alter and re-sync db.');
});
