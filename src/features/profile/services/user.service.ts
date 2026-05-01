import api from "../../../api/axios.config";
import type { AuthResponseDTO } from "../../../types/auth.types";

export interface UserProfileUpdateDTO {
    username: string;
    email: string;
    nombreCompleto: string;
    registroAcademico?: string;
    carreraId?: number;
    password?: string;
}

export const userService = {
    updateProfile: async (
        id: string,
        data: UserProfileUpdateDTO
    ): Promise<AuthResponseDTO> => {
        const response = await api.put<AuthResponseDTO>(
            `/users/me/${id}`,
            data
        );
        return response.data;
    },

    adminUpdateUser: async (
        id: string,
        data: any
    ): Promise<AuthResponseDTO> => {
        const response = await api.put<AuthResponseDTO>(
            `/users/admin/${id}`,
            data
        );
        return response.data;
    },
};
