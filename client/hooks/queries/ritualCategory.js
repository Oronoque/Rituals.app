import { useQuery } from 'react-query';
import axios from 'axios';

import { API_URL } from '@env';

export const getRitualCategories = ({ options }) => {
  return useQuery(
    ['ritualCategories'],
    async () => {
      const request = await axios.get(`http://localhost:9999/api/ritualCategories`);

      return request.data;
    },
    options,
  );
};
