import { useQuery, useQueryClient, useMutation } from 'react-query';
import axios from 'axios';
import { useContext } from 'react';
import { setStorageItem } from '../../services/storage';

import { AppContext } from '../../contexts/appContext';

import { API_URL } from '@env';

export const getRitualSkeletons = ({ options }) => {
  return useQuery(
    ['ritualSkeletons'],
    async () => {
      const request = await axios.get(`https://3dfa-173-209-170-146.ngrok.io/api/ritualSkeletons`);

      return request.data;
    },
    options,
  );
};

export const createRitualSkeleton = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ name, categoryId, note, frequency }) => {
      const { data } = await axios.post(
        `https://3dfa-173-209-170-146.ngrok.io/api/ritualSkeletons`,
        {
          name,
          categoryId,
          note,
          frequency,
        },
      );

      return data;
    },
    {
      onSuccess: async (res) => {
        queryClient.invalidateQueries(['ritualSkeletons']);
      },
      onError: (err) => {
        console.log('onError authUser err:', err);
      },
    },
  );
};

export const createTasks = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ ritualId, tasks }) => {
      console.log('CREATE, ritualId, tasks:', ritualId, tasks);
      const { data } = await axios.post(
        `https://3dfa-173-209-170-146.ngrok.io/api/ritualSkeletons/${ritualId}/tasks`,
        {
          tasks,
        },
      );

      return data;
    },
    {
      onSuccess: async (res) => {
        queryClient.invalidateQueries(['ritualSkeletons']);
      },
      onError: (err) => {
        console.log('onError authUser err:', err);
      },
    },
  );
};

export const deleteRitualSkeleton = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ ritualSkeletonId }) => {
      const { data } = await axios.delete(
        `https://3dfa-173-209-170-146.ngrok.io/api/ritualSkeletons/${ritualSkeletonId}`,
      );

      return data;
    },
    {
      onSuccess: async (res) => {
        queryClient.invalidateQueries(['ritualSkeletons']);
      },
      onError: (err) => {
        console.log('onError authUser err:', err);
      },
    },
  );
};
