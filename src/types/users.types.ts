export interface UserResponse {
    id: string;
    username: string;
    email: string;
    nombreCompleto: string;
    registroAcademico: string;
    roleId: number;
    carreraId: number;
    enabled: boolean;
}

export interface PaginatedUserResponse {
    content: UserResponse[];
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
}
