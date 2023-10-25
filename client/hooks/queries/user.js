import { useQuery, useQueryClient, useMutation } from 'react-query';
import axios from 'axios';
import { useContext } from 'react';
import { setStorageItem } from '../../services/storage';

import { AppContext } from '../../contexts/appContext';

import { API_URL } from '@env';

export const getAllUsers = ({ options }) => {
  return useQuery(
    ['users'],
    async () => {
      const request = await axios.get(`https://3dfa-173-209-170-146.ngrok.io/api/users`);
      const { data: results } = request;
      return results.data;
    },
    options,
  );
};

export const register = () => {
  const { updateAppData } = useContext(AppContext);

  return useMutation(
    async ({ email, password }) => {
      console.log('hey', `https://3dfa-173-209-170-146.ngrok.io/api/auth/register`);

      const { data } = await axios.post(`https://3dfa-173-209-170-146.ngrok.io/api/auth/register`, {
        email,
        password,
      });

      return data;
    },
    {
      onSuccess: async (res) => {
        console.log('res:', res);

        if (res.success) {
          await setStorageItem('token', res.token);

          updateAppData({
            isAuth: true,
          });
        }
      },
      onError: (err) => {
        console.log('onError authUser err:', err);
      },
    },
  );
};

export const login = () => {
  const { updateAppData } = useContext(AppContext);

  return useMutation(
    async ({ email, password }) => {
      console.log('email', email);
      console.log('password', password);

      console.log('API_URL useMutation:', API_URL);

      const { data } = await axios.post(`http://localhost:9999/api/auth/login`, {
        email,
        password,
      });

      return data;
    },
    {
      onSuccess: async (res) => {
        console.log('res:', res);

        if (res.success) {
          // store the token inside the mobile storage
          await setStorageItem('token', res.token);

          updateAppData({
            // id: data.id,
            isAuth: true,
            // token,
          });
        }

        // const { success, data, token } = res;
      },
      onError: (err) => {
        console.log('onError authUser err:', err);
      },
    },
  );
};
