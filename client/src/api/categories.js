import instance, { config } from "./axios"

export const getAllCategoriesRequest = async (user_id) => await instance.post('/category/list', { user_id }, config)
export const createCategoryRequest = async (data) => await instance.post('/category/create', data, config)
export const getCategoryRequest = async (data) => await instance.post('/category/search', data, config)
export const updateCategoryRequest = async (data) => await instance.put('/category/update', data, config)
export const deleteCategoryRequest = async (data) => await instance.post('/category/delete', data, config)