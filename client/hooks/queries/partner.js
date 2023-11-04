import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

import { API_URL } from '@env';

export const getPartners = ({ options }) => {
  return useQuery(
    ['partners'],
    async () => {
      const request = await axios.get(`http://localhost:9999/api/partners`);

      return request?.data?.data;
    },
    options,
  );
};

export const createPartner = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({
      name,
      description,
      email,
      youtube,
      facebook,
      twitter,
      instagram,
      order,
      websiteUrl,
    }) => {
      const { data } = await axios.post(`http://localhost:9999/api/partners`, {
        name,
        description,
        email,
        youtube,
        facebook,
        twitter,
        instagram,
        order,
        websiteUrl,
      });

      return data;
    },
    {
      onSuccess: async (res) => {
        queryClient.invalidateQueries(['partners']);
      },
      onError: (err) => {
        console.log('onError authUser err:', err);
      },
    },
  );
};

export const updatePartner = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({
      partnerId,
      name,
      description,
      email,
      youtube,
      facebook,
      twitter,
      instagram,
      order,
      websiteUrl,
    }) => {
      console.log('HEY');

      const { data } = await axios.patch(`http://localhost:9999/api/partners/${partnerId}`, {
        name,
        description,
        email,
        youtube,
        facebook,
        twitter,
        instagram,
        order,
        websiteUrl,
      });

      return data;
    },
    {
      onSuccess: async (res) => {
        queryClient.invalidateQueries(['partners']);
      },
      onError: (err) => {
        console.log('onError authUser err:', err);
      },
    },
  );
};

export const deletePartner = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ partnerId }) => {
      const { data } = await axios.delete(`http://localhost:9999/api/partners/${partnerId}`);

      return data;
    },
    {
      onSuccess: async (res) => {
        queryClient.invalidateQueries(['partners']);
      },
      onError: (err) => {
        console.log('onError authUser err:', err);
      },
    },
  );
};
