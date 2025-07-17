'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { baseHttpClient } from '@/core/libs/axios';
import {
  createWeightUnitSchema,
  updateWeightUnitSchema,
  type WeightUnitSchema,
  type CreateWeightUnitSchema,
  type UpdateWeightUnitSchema,
} from './schema';

type PaginatedResponse<T> = {
  data: T[];
  total: number;
};

type APIResponse<T> = {
  message: string;
  result: T;
};

function useWeightUnitAPI() {
  const queryClient = useQueryClient();
  const getWeightUnitQueryKey = useMemo(() => ['getWeightUnit'], []);
  const api = baseHttpClient['/master-data/weight-unit'];

  // GET all weight types with pagination
  const useGetWeightUnits = (
    filters: Record<string, WeightUnitSchema>,
    page: number = 1,
    pageSize: number = 10,
    enabled: boolean = true
  ) =>
    useQuery<APIResponse<PaginatedResponse<WeightUnitSchema>>>({
      queryKey: [...getWeightUnitQueryKey, filters, page, pageSize],
      queryFn: async () => {
        const response = await api.get({
          params: { ...filters, page, pageSize },
        });
        return response.data;
      },
      enabled,
    });

  // POST new weight type
  const createWeightUnit = useMutation<WeightUnitSchema, Error, CreateWeightUnitSchema>({
    mutationFn: async (newData) => {
      const validatedData = createWeightUnitSchema.parse(newData);
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
      queryClient.invalidateQueries({ queryKey: getWeightUnitQueryKey });
    },
  });

  // PUT update weight type
  const updateWeightUnit = useMutation<WeightUnitSchema, Error, { id: string; data: UpdateWeightUnitSchema }>({
    mutationFn: async ({ id, data }) => {
      const validatedData = updateWeightUnitSchema.parse(data);
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
      queryClient.invalidateQueries({ queryKey: getWeightUnitQueryKey });
    },
  });

  // DELETE weight type
  const deleteWeightUnit = useMutation<WeightUnitSchema, Error, string>({
    mutationFn: async (id) => {
      const response = await api.delete({ params: { id } });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getWeightUnitQueryKey });
    },
  });

  return {
    // Queries
    useGetWeightUnits,
    // Mutations
    createWeightUnit,
    updateWeightUnit,
    deleteWeightUnit,
  };
}

export { useWeightUnitAPI };
