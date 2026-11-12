import axios from "axios";

export const SERVER_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

const api = axios.create({
    baseURL: `${SERVER_URL}/api`,
    withCredentials: true
})

export default api