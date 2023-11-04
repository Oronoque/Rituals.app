import { useQuery, useQueryClient, useMutation } from 'react-query';
import axios from 'axios';
import { useContext } from 'react';
import { setStorageItem } from '../../services/storage';

import { AppContext } from '../../contexts/appContext';

import { API_URL } from '@env';

export const getRituals = ({ options }) => {
  return useQuery(
    ['rituals'],
    async () => {
      const request = await axios.get(`http://localhost:9999/api/rituals`);

      return request.data;
    },
    options,
  );
};
