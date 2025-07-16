'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { baseHttpClient } from '@/core/libs/axios';

import {
  createWeightSchema,
  updateWeightSchema,
  type WeightSchema,
  type CreateWeightSchema,
  type UpdateWeightSchema,
} from './schema';

type PaginatedResponse<T> = {
  data: T[];
  total: number;
};

type APIResponse<T> = {
  message: string;
  result: T;
};

function useWeightAPI() {
  const queryClient = useQueryClient();
  const getWeightQueryKey = useMemo(() => ['getWeight'], []);
  const api = baseHttpClient['/master-data/weight'];

  // GET all weight types with pagination
  const useGetWeights = (page: number = 1, pageSize: number = 10) =>
    useQuery<APIResponse<PaginatedResponse<WeightSchema>>>({
      queryKey: [...getWeightQueryKey, page, pageSize],
      queryFn: async () => {
        const response = await api.get({
          params: { page, pageSize },
        });
        return response.data;
      },
    });

  // GET single weight type by ID
  const useGetWeightById = (id: string) => {
    return useQuery<{ data: WeightSchema }>({
      queryKey: [...getWeightQueryKey, id],
      queryFn: async () => {
        const { data } = await api.get({ params: { id } });
        return data;
      },
      enabled: !!id,
    });
  };

  // POST new weight type
  const createWeight = useMutation<WeightSchema, Error, CreateWeightSchema>({
    mutationFn: async (newData) => {
      const validatedData = createWeightSchema.parse(newData);
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
      queryClient.invalidateQueries({ queryKey: getWeightQueryKey });
    },
  });

  // PUT update truck
  const updateWeight = useMutation<WeightSchema, Error, { id: string; data: UpdateWeightSchema }>({
    mutationFn: async ({ id, data }) => {
      const validatedData = updateWeightSchema.parse(data);
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
      queryClient.invalidateQueries({ queryKey: getWeightQueryKey });
    },
  });

  // DELETE weight type
  const deleteWeight = useMutation<WeightSchema, Error, string>({
    mutationFn: async (id) => {
      const response = await api.delete({ params: { id } });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getWeightQueryKey });
    },
  });

  return {
    // Queries
    useGetWeights,
    useGetWeightById,
    // Mutations
    createWeight,
    updateWeight,
    deleteWeight,
  };
}

export { useWeightAPI };
