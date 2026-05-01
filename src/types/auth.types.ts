export interface RegisterRequestDTO {
    username: string;
    email: string;
    password: string;
    nombreCompleto: string;
    registroAcademico: string;
    idCarrera: number;
}

export interface AuthResponseDTO {
    token: string;
    id: string;
    username: string;
    email: string;
    role: string;
    nombreCompleto: string;
    registroAcademico: string;
    carreraId: number;
    carreraNombre: string;
}

export interface LoginRequestDTO {
    username: string;
    password: string;
}
