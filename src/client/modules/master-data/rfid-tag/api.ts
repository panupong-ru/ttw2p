'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { baseHttpClient } from '@/core/libs/axios';

import {
  createRFIDTagSchema,
  updateRFIDTagSchema,
  type RFIDTagSchema,
  type CreateRFIDTagSchema,
  type UpdateRFIDTagSchema,
} from './schema';

type PaginatedResponse<T> = {
  data: T[];
  total: number;
};

type APIResponse<T> = {
  message: string;
  result: T;
};

function useRFIDTagAPI() {
  const queryClient = useQueryClient();
  const getRFIDTagQueryKey = useMemo(() => ['getRFIDTag'], []);
  const api = baseHttpClient['/master-data/rfid-tag'];

  // GET all weight types with pagination
  const useGetRFIDTags = (
    filters: Record<string, RFIDTagSchema>,
    page: number = 1,
    pageSize: number = 10,
    enabled: boolean = true
  ) =>
    useQuery<APIResponse<PaginatedResponse<RFIDTagSchema>>>({
      queryKey: [...getRFIDTagQueryKey, filters, page, pageSize],
      queryFn: async () => {
        const response = await api.get({
          params: { ...filters, page, pageSize },
        });
        return response.data;
      },
      enabled,
    });

  // POST new weight type
  const createRFIDTag = useMutation<RFIDTagSchema, Error, CreateRFIDTagSchema>({
    mutationFn: async (newData) => {
      const validatedData = createRFIDTagSchema.parse(newData);
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
      queryClient.invalidateQueries({ queryKey: getRFIDTagQueryKey });
    },
  });

  // PUT update truck
  const updateRFIDTag = useMutation<RFIDTagSchema, Error, { id: string; data: UpdateRFIDTagSchema }>({
    mutationFn: async ({ id, data }) => {
      const validatedData = updateRFIDTagSchema.parse(data);
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
      queryClient.invalidateQueries({ queryKey: getRFIDTagQueryKey });
    },
  });

  // DELETE weight type
  const deleteRFIDTag = useMutation<RFIDTagSchema, Error, string>({
    mutationFn: async (id) => {
      const response = await api.delete({ params: { id } });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getRFIDTagQueryKey });
    },
  });

  return {
    // Queries
    useGetRFIDTags,
    // Mutations
    createRFIDTag,
    updateRFIDTag,
    deleteRFIDTag,
  };
}

export { useRFIDTagAPI };
