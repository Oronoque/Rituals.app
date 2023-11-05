import { useQuery } from 'react-query';
import axios from 'axios';

import { API_URL } from '@env';

export const getRitualCategories = ({ options }) => {
  return useQuery(
    ['ritualCategories'],
    async () => {
      const request = await axios.get(`${API_URL}/ritualCategories`);

      return request.data;
    },
    options,
  );
};
