export interface RegisterRequestDTO {
    username: string;
    email: string;
    password: string;
    nombreCompleto: string;
    registroAcademico: string;
    idCarrera: number;
}

export interface AuthResponse {
    token: string;
    username: string;
    roles: string[];
}
