'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { baseHttpClient } from '@/core/libs/axios';

import {
  createTruckSchema,
  updateTruckSchema,
  type TruckSchema,
  type CreateTruckSchema,
  type UpdateTruckSchema,
} from './schema';

type PaginatedResponse<T> = {
  data: T[];
  total: number;
};

type APIResponse<T> = {
  message: string;
  result: T;
};

function useTruckAPI() {
  const queryClient = useQueryClient();
  const getTruckQueryKey = useMemo(() => ['getTruck'], []);
  const api = baseHttpClient['/master-data/truck'];

  // GET all weight types with pagination
  const useGetTrucks = (page: number = 1, pageSize: number = 10) =>
    useQuery<APIResponse<PaginatedResponse<TruckSchema>>>({
      queryKey: [...getTruckQueryKey, page, pageSize],
      queryFn: async () => {
        const response = await api.get({
          params: { page, pageSize },
        });
        return response.data;
      },
    });

  // GET single weight type by ID
  const useGetTruckById = (id: string) => {
    return useQuery<{ data: TruckSchema }>({
      queryKey: [...getTruckQueryKey, id],
      queryFn: async () => {
        const { data } = await api.get({ params: { id } });
        return data;
      },
      enabled: !!id,
    });
  };

  // POST new weight type
  const createTruck = useMutation<TruckSchema, Error, CreateTruckSchema>({
    mutationFn: async (newData) => {
      const validatedData = createTruckSchema.parse(newData);
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
      queryClient.invalidateQueries({ queryKey: getTruckQueryKey });
    },
  });

  // PUT update truck
  const updateTruck = useMutation<TruckSchema, Error, { id: string; data: UpdateTruckSchema }>({
    mutationFn: async ({ id, data }) => {
      const validatedData = updateTruckSchema.parse(data);
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
      queryClient.invalidateQueries({ queryKey: getTruckQueryKey });
    },
  });

  // DELETE weight type
  const deleteTruck = useMutation<TruckSchema, Error, string>({
    mutationFn: async (id) => {
      const response = await api.delete({ params: { id } });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getTruckQueryKey });
    },
  });

  return {
    // Queries
    useGetTrucks,
    useGetTruckById,
    // Mutations
    createTruck,
    updateTruck,
    deleteTruck,
  };
}

export { useTruckAPI };
