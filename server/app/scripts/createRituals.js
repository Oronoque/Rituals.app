const { Op } = require('sequelize');
const moment = require('moment');

const db = require('../models');

const Rituals = db.rituals;
const RitualSkeletons = db.ritualSkeletons;
const TaskSkeletons = db.taskSkeletons;
const Tasks = db.tasks;

const frequencies = [
  {
    name: 'every_monday',
    nextIteration: (i) => moment().day('Monday').add(i, 'weeks').format('YYYY-MM-DD'),
  },
  {
    name: 'every_tuesday',
    nextIteration: (i) => moment().day('Tuesday').add(i, 'weeks').format('YYYY-MM-DD'),
  },
  {
    name: 'every_wednesday',
    nextIteration: (i) => moment().day('Wednesday').add(i, 'weeks').format('YYYY-MM-DD'),
  },
  {
    name: 'every_thursday',
    nextIteration: (i) => moment().day('Thursday').add(i, 'weeks').format('YYYY-MM-DD'),
  },
  {
    name: 'every_friday',
    nextIteration: (i) => moment().day('Friday').add(i, 'weeks').format('YYYY-MM-DD'),
  },
  {
    name: 'every_saturday',
    nextIteration: (i) => moment().day('Saturday').add(i, 'weeks').format('YYYY-MM-DD'),
  },
  {
    name: 'every_sunday',
    nextIteration: (i) => moment().day('Sunday').add(i, 'weeks').format('YYYY-MM-DD'),
  },
  {
    name: 'every_day',
    nextIteration: (i) => moment().add(i, 'days').format('YYYY-MM-DD'),
  },
  {
    name: 'every_week',
    nextIteration: (i) => moment().add(i, 'weeks').format('YYYY-MM-DD'),
  },
  {
    name: 'every_month',
    nextIteration: (i) => moment().add(i, 'months').format('YYYY-MM-DD'),
  },
];

// cron : every hour
const processCreateRituals = async () => {
  try {
    console.log('Success processCreateRituals');

    const ritualSkeletonsDB = await RitualSkeletons.findAll({});

    for (const ritualSkeleton of ritualSkeletonsDB) {
      const nextIterationDates = [];

      for (let i = 0; i < 4; i++) {
        const nextIterationDate = frequencies.find(
          (item) => item.name === ritualSkeleton.frequency,
        );

        nextIterationDates.push(nextIterationDate.nextIteration(i));
      }

      for (const iteration of nextIterationDates) {
        // check if ritual already exists in DB
        const ritualDB = await Rituals.findOne({
          where: {
            startDate: {
              [Op.between]: [`${iteration} 00:00:00`, `${iteration} 23:59:59`],
            },
            ritualSkeletonId: ritualSkeleton.id,
          },
        });

        if (!ritualDB) {
          // create ritual
          const createdRitual = await Rituals.create(
            {
              startDate: iteration,
              ritualSkeletonId: ritualSkeleton.id,
            },
            { returning: true },
          );

          const skeletonTasksDB = await TaskSkeletons.findAll({
            where: {
              ritualSkeletonId: ritualSkeleton.id,
            },
          });

          for (const skeletonTask of skeletonTasksDB) {
            await Tasks.create({
              name: skeletonTask.name,
              taskSkeletonId: skeletonTask.id,
              ritualId: createdRitual.id,
              startDate: createdRitual.startDate,
            });
          }
        }
      }
    }

    console.log('ritualSkeletonsDB:', ritualSkeletonsDB.length);
  } catch (error) {
    console.log('Error processCreateRituals', error);
  }
};

processCreateRituals();

module.exports = processCreateRituals;
