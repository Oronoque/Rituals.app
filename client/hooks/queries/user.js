import { useQuery, useQueryClient, useMutation } from 'react-query';
import axios from 'axios';
import { useContext } from 'react';

import { AppContext } from '../../contexts/appContext';

export const getAllUsers = ({ options }) => {
  return useQuery(
    ['users'],
    async () => {
      const request = await axios.get('http://localhost:3009/api/users');
      const { data: results } = request;
      return results.data;
    },
    options,
  );
};

export const register = () => {
  const queryClient = useQueryClient();
  const { updateAppData } = useContext(AppContext);

  return useMutation(
    async ({ email, password }) => {
      const { data } = await axios.post(`http://localhost:3009/api/register`, {
        email,
        password,
      });

      return data;
    },
    {
      onSuccess: async (res) => {
        updateAppData({
          // id: data.id,
          isAuth: true,
          // token,
        });

        // const { success, data, token } = res;
      },
      onError: (err) => {
        console.log('onError authUser err:', err);
      },
    },
  );
};
