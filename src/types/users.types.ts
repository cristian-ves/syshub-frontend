export interface UserResponse {
    id: string;
    username: string;
    email: string;
    fullName: string;
    academicRecord: string;
    roleId: number;
    majorId: number;
    enabled: boolean;
}

export interface PaginatedUserResponse {
    content: UserResponse[];
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
}
