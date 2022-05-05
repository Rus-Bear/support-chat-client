import axios from "axios";

export const API_URL = 'http://localhost:5000'

export const $chats_api = axios.create({
    withCredentials: true,
    baseURL: `${API_URL}/chats`
})

$chats_api.interceptors.request.use((config) => {
    return config
})