import instance, { config } from "./axios"

export const getAllProductsRequest = async (user_id) => await instance.post('/product/list', { user_id }, config)
export const createProductRequest = async (data) => await instance.post('/product/create', data, config)
export const getProductRequest = async (data) => await instance.post('/product/search', data, config)
export const updateProductRequest = async (data) => await instance.put('/product/update', data, config)
export const deleteProductRequest = async (data) => await instance.post('/product/delete', data, config)
export const updateStockRequest = async (data) => await instance.put('/stock/update', data, config)