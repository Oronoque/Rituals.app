import { useQuery } from 'react-query';
import axios from 'axios';

import { API_URL } from '@env';

export const getRitualCategories = ({ options }) => {
  return useQuery(
    ['ritualCategories'],
    async () => {
      const request = await axios.get(`http://3dfa-173-209-170-146.ngrok.io/api/ritualCategories`);

      return request.data;
    },
    options,
  );
};
