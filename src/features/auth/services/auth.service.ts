import api from "../../../api/axios.config";
import type {
    RegisterRequestDTO,
    AuthResponse,
} from "../../../types/auth.types";

export const authService = {
    register: async (data: RegisterRequestDTO) => {
        const response = await api.post<AuthResponse>("/auth/register", data);
        return response.data;
    },
};
