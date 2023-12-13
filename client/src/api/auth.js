import instance from "./axios"

export const loginRequest = async data => await instance.post('/login', data)