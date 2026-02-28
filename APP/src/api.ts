// src/api.ts
import axios from 'axios';
import type { Product } from './types';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/', // Add 'api/' here
});

export const productAPI = {
    getProducts: () => api.get<Product[]>('products/'), 
    addProduct: (data: Omit<Product, 'productid'>) => api.post<Product>('products/', data),
    updateProduct: (id: number, data: Partial<Product>) => api.put<Product>(`products/${id}/`, data),
    deleteProduct: (id: number) => api.delete(`products/${id}/`),
};