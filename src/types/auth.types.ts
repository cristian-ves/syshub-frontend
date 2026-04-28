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
    username: string;
    role: string;
}

export interface LoginRequestDTO {
    username: string;
    password: string;
}
