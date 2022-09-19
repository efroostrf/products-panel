import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IProduct } from 'models/Product';

export const productApi = createApi({
  reducerPath: 'productAPI',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['Product'],
  endpoints: (build) => ({
    fetchProduct: build.query<IProduct[], number>({
      query: (categoryId: number) => ({
        url: `api/products/${categoryId ? categoryId : ''}`
      }),
      providesTags: (result) => 
        result
        ? [...result.map(({ _id }) => ({ type: 'Product' as const, id: _id })), 'Product']
        : ['Product']
    }),
    createProduct: build.mutation<IProduct, IProduct>({
      query: (product: IProduct) => ({
        url: 'api/product/new',
        method: 'POST',
        body: product
      }),
      invalidatesTags: (result) => 
        result._id
        ? [{ type: 'Product', id: result._id }]
        : ['Product']
    }),
    editProduct: build.mutation<IProduct, IProduct>({
      query: (product: IProduct) => ({
        url: 'api/product/edit',
        method: 'PUT',
        body: product
      }),
      invalidatesTags: (result) => 
        result._id
        ? [{ type: 'Product', id: result._id }]
        : ['Product']
    }),
    deleteProduct: build.mutation<IProduct, IProduct>({
      query: (product) => ({
        url: 'api/product/delete',
        method: 'DELETE',
        body: product
      }),
      invalidatesTags: (result) => ['Product']
    }),
    deleteProducts: build.mutation<number[], number[]>({
      query: (products) => ({
        url: 'api/product/delete',
        method: 'DELETE',
        body: products
      }),
      invalidatesTags: (result) => 
        result.length > 0
        ? [...result.map((id) => ({ type: 'Product' as const, id: id })), 'Product']
        : ['Product']
    }),
    updateAll: build.mutation<void, void>({
      query: () => 'api/products',
      invalidatesTags: (result) => ['Product']
    })
  })
})
