import axios from "axios";

export const ApiManager = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    responseType: 'json'
})