import axios from "axios";
import { trackRequestStart, trackRequestEnd } from "./connectionTracker";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        (config as any).__connTracker = trackRequestStart();
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => {
        trackRequestEnd((response.config as any).__connTracker);
        return response;
    },
    (error) => {
        if (error.config) {
            trackRequestEnd((error.config as any).__connTracker);
        }

        if (error.response?.status === 401) {
            localStorage.removeItem("token");
        }

        const message =
            error.response?.data?.message || "An unexpected error happened";

        console.error("Server error:", message);
        return Promise.reject(message);
    }
);

export default api;
