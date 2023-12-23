import { useQuery, useQueryClient, useMutation } from 'react-query';
import axios from 'axios';

import { API_URL } from '@env';

export const getRitualSkeletons = ({ options }) => {
  return useQuery(
    ['ritualSkeletons'],
    async () => {
      console.log(API_URL);

      const request = await axios.get(`${API_URL}/ritualSkeletons`);

      return request.data;
    },
    options,
  );
};
export const getRitual = ({ options }) => {
  return useQuery(
    ['rituals'],
    async () => {
      const request = await axios.get(`${API_URL}/rituals`);

      return request.data;
    },
    options,
  );
};

export const createRitualSkeleton = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ name, categoryId, note, frequency }) => {
      const { data } = await axios.post(`${API_URL}/ritualSkeletons`, {
        name,
        categoryId,
        note,
        frequency,
      });

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

export const createSkeletonTasks = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ ritualId, tasks }) => {
      console.log('CREATE, ritualId, tasks:', ritualId, tasks);
      const { data } = await axios.post(`${API_URL}/ritualSkeletons/${ritualId}/skeletonTasks`, {
        tasks,
      });

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
      const { data } = await axios.delete(`${API_URL}/ritualSkeletons/${ritualSkeletonId}`);

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
