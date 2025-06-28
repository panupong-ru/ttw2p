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
  const useGetProducts = (page: number = 1, pageSize: number = 10) =>
    useQuery<APIResponse<PaginatedResponse<ProductSchema>>>({
      queryKey: [...getProductQueryKey, page, pageSize],
      queryFn: async () => {
        const response = await api.get({
          params: { page, pageSize },
        });
        return response.data;
      },
    });

  // GET single weight type by ID
  const useGetProductById = (id: string) => {
    return useQuery<{ data: ProductSchema }>({
      queryKey: [...getProductQueryKey, id],
      queryFn: async () => {
        const { data } = await api.get({ params: { id } });
        return data;
      },
      enabled: !!id,
    });
  };

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
    useGetProductById,
    // Mutations
    createProduct,
    updateProduct,
    deleteProduct,
  };
}

export { useProductAPI };
