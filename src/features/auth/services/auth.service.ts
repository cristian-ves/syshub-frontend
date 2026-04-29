import api from "../../../api/axios.config";
import type {
    RegisterRequestDTO,
    AuthResponseDTO,
    LoginRequestDTO,
} from "../../../types/auth.types";

export const authService = {
    register: async (data: RegisterRequestDTO) => {
        const response = await api.post<AuthResponseDTO>(
            "/auth/register",
            data
        );
        return response.data;
    },
    login: async (data: LoginRequestDTO) => {
        const response = await api.post<AuthResponseDTO>("/auth/login", data);
        return response.data;
    },
    forgotPassword: async (email: string) => {
        const { data } = await api.post("/auth/forgot-password", { email });
        return data;
    },
    resetPassword: async (token: string, password: string) => {
        const { data } = await api.post("/auth/reset-password", {
            token,
            password,
        });
        return data;
    },
    validateToken: async (): Promise<AuthResponseDTO> => {
        const { data } = await api.get<AuthResponseDTO>("/auth/validate");
        return data;
    },
};
