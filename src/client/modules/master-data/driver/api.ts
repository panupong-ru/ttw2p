'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { baseHttpClient } from '@/core/libs/axios';
import {
  createDriverSchema,
  updateDriverSchema,
  type DriverSchema,
  type CreateDriverSchema,
  type UpdateDriverSchema,
} from './schema';

type PaginatedResponse<T> = {
  data: T[];
  total: number;
};

type APIResponse<T> = {
  message: string;
  result: T;
};

function useDriverAPI() {
  const queryClient = useQueryClient();
  const getDriverQueryKey = useMemo(() => ['getDriver'], []);
  const api = baseHttpClient['/master-data/driver'];

  // GET all weight types with pagination
  const useGetDrivers = (
    filters: Record<string, DriverSchema>,
    page: number = 1,
    pageSize: number = 10,
    enabled: boolean = true
  ) =>
    useQuery<APIResponse<PaginatedResponse<DriverSchema>>>({
      queryKey: [...getDriverQueryKey, filters, page, pageSize],
      queryFn: async () => {
        const response = await api.get({
          params: { ...filters, page, pageSize },
        });
        return response.data;
      },
      enabled,
    });

  // POST new weight type
  const createDriver = useMutation<DriverSchema, Error, CreateDriverSchema>({
    mutationFn: async (newData) => {
      const validatedData = createDriverSchema.parse(newData);
      const formData = new FormData();

      // Append all fields to FormData
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
      queryClient.invalidateQueries({ queryKey: getDriverQueryKey });
    },
  });

  // PUT update weight type
  const updateDriver = useMutation<DriverSchema, Error, { id: string; data: UpdateDriverSchema }>({
    mutationFn: async ({ id, data }) => {
      const validatedData = updateDriverSchema.parse(data);
      const formData = new FormData();

      // Append all fields to FormData
      Object.entries(validatedData).forEach(([key, value]) => {
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
      queryClient.invalidateQueries({ queryKey: getDriverQueryKey });
    },
  });

  // DELETE weight type
  const deleteDriver = useMutation<DriverSchema, Error, string>({
    mutationFn: async (id) => {
      const response = await api.delete({ params: { id } });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getDriverQueryKey });
    },
  });

  return {
    // Queries
    useGetDrivers,
    // Mutations
    createDriver,
    updateDriver,
    deleteDriver,
  };
}

export { useDriverAPI };
