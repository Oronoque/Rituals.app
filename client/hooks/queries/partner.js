import { useQuery } from 'react-query';
import axios from 'axios';

import { API_URL } from '@env';

export const getPartners = ({ options }) => {
  return useQuery(
    ['partners'],
    async () => {
      console.log('hey!');
      const request = await axios.get(`http://localhost:9999/api/partners`);

      return request?.data?.data;
    },
    options,
  );
};
