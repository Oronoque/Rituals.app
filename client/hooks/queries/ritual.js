import { useQuery, useQueryClient, useMutation } from 'react-query';
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

export const updateTask = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ ritualId, taskId, name, isCompleted }) => {
      const { data } = await axios.put(
        `http://localhost:9999/api/rituals/${ritualId}/tasks/${taskId}`,
        {
          name,
          isCompleted,
        },
      );

      return data;
    },
    {
      onSuccess: async (res) => {
        queryClient.invalidateQueries(['rituals']);
      },
      onError: (err) => {
        console.log('onError authUser err:', err);
      },
    },
  );
};
export const deleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ ritualId, taskId }) => {
      const { data } = await axios.delete(
        `http://localhost:9999/api/rituals/${ritualId}/tasks/${taskId}`,
      );

      return data;
    },
    {
      onSuccess: async (res) => {
        queryClient.invalidateQueries(['rituals']);
      },
      onError: (err) => {
        console.log('onError authUser err:', err);
      },
    },
  );
};

export const insertTask = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ ritualId, name }) => {
      const { data } = await axios.post(`http://localhost:9999/api/rituals/${ritualId}/tasks`, {
        name,
      });

      return data;
    },
    {
      onSuccess: async (res) => {
        queryClient.invalidateQueries(['rituals']);
      },
      onError: (err) => {
        console.log('onError authUser err:', err);
      },
    },
  );
};
