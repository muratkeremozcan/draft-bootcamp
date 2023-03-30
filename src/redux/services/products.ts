// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Product} from '../../types'

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://64074f8d77c1a905a0f504d3.mockapi.io/api/v1/',
  }),
  endpoints: builder => ({
    getProducts: builder.query<Product[], any>({
      query: () => `products`,
    }),
    getProductById: builder.query<Product, string>({
      query: id => `products/${id}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetProductByIdQuery, useGetProductsQuery} = productApi
