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

function useWeightTypeAPI() {
  const queryClient = useQueryClient();
  const getWeightTypeQueryKey = useMemo(() => ['getWeightType'], []);
  const api = baseHttpClient['weight-type'];

  // GET all weight types
  const getWeightTypes = useQuery<{ data: WeightTypeSchema[] }>({
    queryKey: getWeightTypeQueryKey,
    queryFn: async () => {
      const { data } = await api.get();
      return data;
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
      const { data } = await api.post(validatedData);
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
      const response = await api.put(validatedData, { params: { id } });
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
    getWeightTypes,
    useGetWeightTypeById,
    // Mutations
    createWeightType,
    updateWeightType,
    deleteWeightType,
  };
}

export { useWeightTypeAPI };
