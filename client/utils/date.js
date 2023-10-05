import moment from 'moment';

export const generateDatesArray = () => {
  const currentDate = moment();
  const daysBefore = [];
  const futureDays = [];

  for (let i = 3; i >= 1; i--) {
    daysBefore.push({
      dayNumber: currentDate.clone().subtract(i, 'days').format('D'),
      dayString: currentDate.clone().subtract(i, 'days').format('ddd'),
    });
  }

  for (let i = 1; i <= 10; i++) {
    futureDays.push({
      dayNumber: currentDate.clone().add(i, 'days').format('D'),
      dayString: currentDate.clone().add(i, 'days').format('ddd'),
    });
  }

  const currentDateInfo = {
    dayNumber: currentDate.format('D'),
    dayString: currentDate.format('ddd'),
  };

  const dateArray = [...daysBefore, currentDateInfo, ...futureDays];
  return dateArray;
};
