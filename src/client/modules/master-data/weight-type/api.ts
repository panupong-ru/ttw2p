'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { baseHttpClient } from '@/core/libs/axios';
import {
  createWeightTypeSchema,
  updateWeightTypeSchema,
  type WeightTypeSchema,
  type CreateWeightTypeSchema,
  type UpdateWeightTypeSchema,
} from './schema';

type PaginatedResponse<T> = {
  data: T[];
  total: number;
};

type APIResponse<T> = {
  message: string;
  result: T;
};

function useWeightTypeAPI() {
  const queryClient = useQueryClient();
  const getWeightTypeQueryKey = useMemo(() => ['getWeightType'], []);
  const api = baseHttpClient['/master-data/weight-type'];

  // GET all weight types with pagination
  const useGetWeightTypes = (page: number = 1, pageSize: number = 10) =>
    useQuery<APIResponse<PaginatedResponse<WeightTypeSchema>>>({
      queryKey: [...getWeightTypeQueryKey, page, pageSize],
      queryFn: async () => {
        const response = await api.get({
          params: { page, pageSize },
        });
        return response.data;
      },
    });

  // GET single weight type by ID
  const useGetWeightTypeById = (id: string) => {
    return useQuery<{ data: WeightTypeSchema }>({
      queryKey: [...getWeightTypeQueryKey, id],
      queryFn: async () => {
        const { data } = await api.get({ params: { id } });
        return data;
      },
      enabled: !!id,
    });
  };

  // POST new weight type
  const createWeightType = useMutation<WeightTypeSchema, Error, CreateWeightTypeSchema>({
    mutationFn: async (newData) => {
      const validatedData = createWeightTypeSchema.parse(newData);
      const formData = new FormData();

      // Append all fields to FormData
      Object.entries(validatedData).forEach(([key, value]) => {
        // Check if it's a file field
        const fileFields = [
          'FileRegisterTicketIn',
          'FileRegisterTicketOut',
          'FileAutoRegisterTicketIn',
          'FileAutoRegisterTicketOut',
          'FileTicketIn',
          'FileTicketOut',
          'FileAutoTicketIn',
          'FileAutoTicketOut',
          'FileTicketRFIDTag',
        ];

        if (fileFields.includes(key) && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value as string);
        }
      });

      const { data } = await api.post(formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getWeightTypeQueryKey });
    },
  });

  // PUT update weight type
  const updateWeightType = useMutation<WeightTypeSchema, Error, { id: string; data: UpdateWeightTypeSchema }>({
    mutationFn: async ({ id, data }) => {
      const validatedData = updateWeightTypeSchema.parse(data);
      const formData = new FormData();

      // Append all fields to FormData
      Object.entries(validatedData).forEach(([key, value]) => {
        // Check if it's a file field
        const fileFields = [
          'FileRegisterTicketIn',
          'FileRegisterTicketOut',
          'FileAutoRegisterTicketIn',
          'FileAutoRegisterTicketOut',
          'FileTicketIn',
          'FileTicketOut',
          'FileAutoTicketIn',
          'FileAutoTicketOut',
          'FileTicketRFIDTag',
        ];

        if (fileFields.includes(key) && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value as string);
        }
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
      queryClient.invalidateQueries({ queryKey: getWeightTypeQueryKey });
    },
  });

  // DELETE weight type
  const deleteWeightType = useMutation<WeightTypeSchema, Error, string>({
    mutationFn: async (id) => {
      const response = await api.delete({ params: { id } });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getWeightTypeQueryKey });
    },
  });

  return {
    // Queries
    useGetWeightTypes,
    useGetWeightTypeById,
    // Mutations
    createWeightType,
    updateWeightType,
    deleteWeightType,
  };
}

export { useWeightTypeAPI };
