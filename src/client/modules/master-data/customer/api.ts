'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { baseHttpClient } from '@/core/libs/axios';
import {
  createCustomerSchema,
  updateCustomerSchema,
  type CustomerSchema,
  type CreateCustomerSchema,
  type UpdateCustomerSchema,
} from './schema';

type PaginatedResponse<T> = {
  data: T[];
  total: number;
};

type APIResponse<T> = {
  message: string;
  result: T;
};

function useCustomerAPI() {
  const queryClient = useQueryClient();
  const getCustomerQueryKey = useMemo(() => ['getCustomer'], []);
  const api = baseHttpClient['/master-data/customer'];

  // GET all weight types with pagination
  const useGetCustomers = (
    filters: Record<string, CustomerSchema>,
    page: number = 1,
    pageSize: number = 10,
    enabled: boolean = true
  ) =>
    useQuery<APIResponse<PaginatedResponse<CustomerSchema>>>({
      queryKey: [...getCustomerQueryKey, filters, page, pageSize],
      queryFn: async () => {
        const response = await api.get({
          params: { ...filters, page, pageSize },
        });
        return response.data;
      },
      enabled,
    });

  // POST new weight type
  const createCustomer = useMutation<CustomerSchema, Error, CreateCustomerSchema>({
    mutationFn: async (newData) => {
      const validatedData = createCustomerSchema.parse(newData);
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
      queryClient.invalidateQueries({ queryKey: getCustomerQueryKey });
    },
  });

  // PUT update weight type
  const updateCustomer = useMutation<CustomerSchema, Error, { id: string; data: UpdateCustomerSchema }>({
    mutationFn: async ({ id, data }) => {
      const validatedData = updateCustomerSchema.parse(data);
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
      queryClient.invalidateQueries({ queryKey: getCustomerQueryKey });
    },
  });

  // DELETE weight type
  const deleteCustomer = useMutation<CustomerSchema, Error, string>({
    mutationFn: async (id) => {
      const response = await api.delete({ params: { id } });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getCustomerQueryKey });
    },
  });

  return {
    // Queries
    useGetCustomers,
    // Mutations
    createCustomer,
    updateCustomer,
    deleteCustomer,
  };
}

export { useCustomerAPI };
