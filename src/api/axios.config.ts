import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error.response?.data?.message || "Ocurrió un error inesperado";

        console.error("Error desde el servidor:", message);
        return Promise.reject(message);
    }
);

export default api;
