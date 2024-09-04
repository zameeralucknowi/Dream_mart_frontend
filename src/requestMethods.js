import axios from "axios";

const BASE_URL = 'https://dream-mart-backend.onrender.com/api/';

export const publicRequest = axios.create({
    baseURL : BASE_URL
})
