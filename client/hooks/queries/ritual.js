import { useQuery, useQueryClient, useMutation } from 'react-query';
import axios from 'axios';
import { useContext } from 'react';
import { setStorageItem } from '../../services/storage';

import { AppContext } from '../../contexts/appContext';

import { API_URL } from '@env';

export const createRitual = () => {
  return useMutation(
    async ({ name }) => {
      const { data } = await axios.post(`${API_URL}/rituals`, {
        name,
      });

      return data;
    },
    {
      onSuccess: async (res) => {},
      onError: (err) => {
        console.log('onError authUser err:', err);
      },
    },
  );
};
