'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { baseHttpClient } from '@/core/libs/axios';

import {
  createWaitWeightSchema,
  updateWaitWeightSchema,
  type WaitWeightSchema,
  type CreateWaitWeightSchema,
  type UpdateWaitWeightSchema,
} from './schema';

type PaginatedResponse<T> = {
  data: T[];
  total: number;
};

type APIResponse<T> = {
  message: string;
  result: T;
};

function useWaitWeightAPI() {
  const queryClient = useQueryClient();
  const getWaitWeightQueryKey = useMemo(() => ['getWaitWeight'], []);
  const api = baseHttpClient['/master-data/wait-weight'];

  // GET all weight types with pagination
  const useGetWaitWeights = (page: number = 1, pageSize: number = 10) =>
    useQuery<APIResponse<PaginatedResponse<WaitWeightSchema>>>({
      queryKey: [...getWaitWeightQueryKey, page, pageSize],
      queryFn: async () => {
        const response = await api.get({
          params: { page, pageSize },
        });
        return response.data;
      },
    });

  // GET single weight type by ID
  const useGetWaitWeightById = (id: string) => {
    return useQuery<{ data: WaitWeightSchema }>({
      queryKey: [...getWaitWeightQueryKey, id],
      queryFn: async () => {
        const { data } = await api.get({ params: { id } });
        return data;
      },
      enabled: !!id,
    });
  };

  // POST new weight type
  const createWaitWeight = useMutation<WaitWeightSchema, Error, CreateWaitWeightSchema>({
    mutationFn: async (newData) => {
      const validatedData = createWaitWeightSchema.parse(newData);
      const formData = new FormData();

      Object.entries(validatedData).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      const { data } = await api.post(formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getWaitWeightQueryKey });
    },
  });

  // PUT update truck
  const updateWaitWeight = useMutation<WaitWeightSchema, Error, { id: string; data: UpdateWaitWeightSchema }>({
    mutationFn: async ({ id, data }) => {
      const validatedData = updateWaitWeightSchema.parse(data);
      const formData = new FormData();

      // Append all fields to FormData
      Object.entries(validatedData).forEach(([key, value]) => {
        // Check if it's a file field
        formData.append(key, value as string);
      });

      const response = await api.put(formData, {
        params: { id },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getWaitWeightQueryKey });
    },
  });

  // DELETE weight type
  const deleteWaitWeight = useMutation<WaitWeightSchema, Error, string>({
    mutationFn: async (id) => {
      const response = await api.delete({ params: { id } });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getWaitWeightQueryKey });
    },
  });

  return {
    // Queries
    useGetWaitWeights,
    useGetWaitWeightById,
    // Mutations
    createWaitWeight,
    updateWaitWeight,
    deleteWaitWeight,
  };
}

export { useWaitWeightAPI };
