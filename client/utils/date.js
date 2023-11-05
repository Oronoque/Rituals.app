import moment from 'moment';

export const generateDatesArray = () => {
  const currentDate = moment();
  const daysBefore = [];
  const futureDays = [];

  for (let i = 3; i >= 1; i--) {
    daysBefore.push({
      dayNumber: currentDate.clone().subtract(i, 'days').format('D'),
      dayString: currentDate.clone().subtract(i, 'days').format('ddd'),
      formattedDate: currentDate.clone().subtract(i, 'days').format('YYYY-MM-DD'),
    });
  }

  for (let i = 1; i <= 10; i++) {
    futureDays.push({
      dayNumber: currentDate.clone().add(i, 'days').format('D'),
      dayString: currentDate.clone().add(i, 'days').format('ddd'),
      formattedDate: currentDate.clone().add(i, 'days').format('YYYY-MM-DD'),
    });
  }

  const currentDateInfo = {
    dayNumber: currentDate.format('D'),
    dayString: currentDate.format('ddd'),
    formattedDate: currentDate.format('YYYY-MM-DD'),
  };

  const dateArray = [...daysBefore, currentDateInfo, ...futureDays];
  return dateArray;
};
