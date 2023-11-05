import { useQuery } from 'react-query';
import axios from 'axios';

import { API_URL } from '@env';

export const getRituals = ({ options, day }) => {
  return useQuery(
    ['rituals'],
    async () => {
      const request = await axios.get(`${API_URL}/rituals?day=${day}`);

      return request.data;
    },
    options,
  );
};

export const getRitual = ({ options, ritualId }) => {
  return useQuery(
    ['rituals', { ritualId }],
    async () => {
      const request = await axios.get(`${API_URL}/rituals/${ritualId}`);

      return request.data;
    },
    options,
  );
};
