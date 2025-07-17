'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { baseHttpClient } from '@/core/libs/axios';
import {
  createProductSchema,
  updateProductSchema,
  type ProductSchema,
  type CreateProductSchema,
  type UpdateProductSchema,
} from './schema';

type PaginatedResponse<T> = {
  data: T[];
  total: number;
};

type APIResponse<T> = {
  message: string;
  result: T;
};

function useProductAPI() {
  const queryClient = useQueryClient();
  const getProductQueryKey = useMemo(() => ['getProduct'], []);
  const api = baseHttpClient['/master-data/product'];

  // GET all weight types with pagination
  const useGetProducts = (
    filters: Record<string, ProductSchema>,
    page: number = 1,
    pageSize: number = 10,
    enabled: boolean = true
  ) =>
    useQuery<APIResponse<PaginatedResponse<ProductSchema>>>({
      queryKey: [...getProductQueryKey, filters, page, pageSize],
      queryFn: async () => {
        const response = await api.get({
          params: { ...filters, page, pageSize },
        });
        return response.data;
      },
      enabled,
    });

  // POST new weight type
  const createProduct = useMutation<ProductSchema, Error, CreateProductSchema>({
    mutationFn: async (newData) => {
      const validatedData = createProductSchema.parse(newData);
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
      queryClient.invalidateQueries({ queryKey: getProductQueryKey });
    },
  });

  // PUT update weight type
  const updateProduct = useMutation<ProductSchema, Error, { id: string; data: UpdateProductSchema }>({
    mutationFn: async ({ id, data }) => {
      const validatedData = updateProductSchema.parse(data);
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
      queryClient.invalidateQueries({ queryKey: getProductQueryKey });
    },
  });

  // DELETE weight type
  const deleteProduct = useMutation<ProductSchema, Error, string>({
    mutationFn: async (id) => {
      const response = await api.delete({ params: { id } });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getProductQueryKey });
    },
  });

  return {
    // Queries
    useGetProducts,
    // Mutations
    createProduct,
    updateProduct,
    deleteProduct,
  };
}

export { useProductAPI };
