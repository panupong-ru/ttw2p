'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { baseHttpClient } from '@/core/libs/axios';
import {
  createTransporterSchema,
  updateTransporterSchema,
  type TransporterSchema,
  type CreateTransporterSchema,
  type UpdateTransporterSchema,
} from './schema';

type PaginatedResponse<T> = {
  data: T[];
  total: number;
};

type APIResponse<T> = {
  message: string;
  result: T;
};

function useTransporterAPI() {
  const queryClient = useQueryClient();
  const getTransporterQueryKey = useMemo(() => ['getTransporter'], []);
  const api = baseHttpClient['/master-data/transporter'];

  // GET all weight types with pagination
  const useGetTransporters = (page: number = 1, pageSize: number = 10) =>
    useQuery<APIResponse<PaginatedResponse<TransporterSchema>>>({
      queryKey: [...getTransporterQueryKey, page, pageSize],
      queryFn: async () => {
        const response = await api.get({
          params: { page, pageSize },
        });
        return response.data;
      },
    });

  // GET single weight type by ID
  const useGetTransporterById = (id: string) => {
    return useQuery<{ data: TransporterSchema }>({
      queryKey: [...getTransporterQueryKey, id],
      queryFn: async () => {
        const { data } = await api.get({ params: { id } });
        return data;
      },
      enabled: !!id,
    });
  };

  // POST new weight type
  const createTransporter = useMutation<TransporterSchema, Error, CreateTransporterSchema>({
    mutationFn: async (newData) => {
      const validatedData = createTransporterSchema.parse(newData);
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
      queryClient.invalidateQueries({ queryKey: getTransporterQueryKey });
    },
  });

  // PUT update weight type
  const updateTransporter = useMutation<TransporterSchema, Error, { id: string; data: UpdateTransporterSchema }>({
    mutationFn: async ({ id, data }) => {
      const validatedData = updateTransporterSchema.parse(data);
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
      queryClient.invalidateQueries({ queryKey: getTransporterQueryKey });
    },
  });

  // DELETE weight type
  const deleteTransporter = useMutation<TransporterSchema, Error, string>({
    mutationFn: async (id) => {
      const response = await api.delete({ params: { id } });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getTransporterQueryKey });
    },
  });

  return {
    // Queries
    useGetTransporters,
    useGetTransporterById,
    // Mutations
    createTransporter,
    updateTransporter,
    deleteTransporter,
  };
}

export { useTransporterAPI };
