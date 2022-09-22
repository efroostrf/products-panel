import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ICategory } from 'models/Category';

export const categoryApi = createApi({
  reducerPath: 'categoryAPI',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['Category'],
  endpoints: (build) => ({
    fetchCategories: build.query<ICategory[], number>({
      query: (folderId: number) => ({
        url: `api/categories/${folderId !== null ? folderId : ''}`
      }),
      providesTags: (result) => 
        result
        ? [...result.map(({ _id }) => ({ type: 'Category' as const, id: _id })), 'Category']
        : ['Category']
    }),
    createCategory: build.mutation<ICategory, ICategory>({
      query: (category) => ({
        url: 'api/category/new',
        method: 'POST',
        body: category
      }),
      invalidatesTags: (result, ) => 
        result._id
        ? [{ type: 'Category', id: result._id }, 'Category']
        : ['Category']
    }),
    editCategory: build.mutation<ICategory, ICategory>({
      query: (category) => ({
        url: 'api/category/edit',
        method: 'PUT',
        body: category
      }),
      invalidatesTags: (result) => 
        result._id
        ? [{ type: 'Category', id: result._id }]
        : ['Category']
    }),
    deleteCategory: build.mutation<ICategory, ICategory>({
      query: (category) => ({
        url: 'api/category/delete',
        method: 'DELETE',
        body: category
      }),
      invalidatesTags: (result) => 
        result._id
        ? [{ type: 'Category', id: result._id }]
        : ['Category']
    }),
    updateAllCategories: build.mutation<void, void>({
      query: () => 'api/categories',
      invalidatesTags: () => ['Category']
    })
  })
});

export const { useFetchCategoriesQuery } = categoryApi;
