import axios from "axios";

const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 20000
});

export default httpClient;