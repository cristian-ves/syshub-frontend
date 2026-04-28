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
};
