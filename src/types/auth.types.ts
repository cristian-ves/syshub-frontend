export interface RegisterRequestDTO {
    username: string;
    email: string;
    password: string;
    fullName: string;
    academicRecord: string;
    majorId: number;
}

export interface AuthResponseDTO {
    token: string;
    id: string;
    username: string;
    email: string;
    role: string;
    fullName: string;
    academicRecord: string;
    majorId: number;
    majorName: string;
}

export interface LoginRequestDTO {
    username: string;
    password: string;
}
