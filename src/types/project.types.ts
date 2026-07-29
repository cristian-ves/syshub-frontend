export interface ProjectFile {
    id: number;
    fileName: string;
    originalName: string;
    fileType: string;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    authorName: string;
    courseName: string;
    studyPlanName: string;
    repoUrl: string;
    featured: boolean;
    tags: Tag[];
    files: ProjectFile[];
    areaColor: string;
    areaName: string;
    uploadDate: string;
}

export interface Tag {
    color: string;
    name: string;
}

export interface PaginatedResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    last: boolean;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export interface ProjectFilters {
    page?: number;
    size?: number;
    featured?: boolean;
    studyPlanId?: number;
    semesterNum?: number;
    areaId?: number;
    tag?: string;
    courseName?: string;
    search?: string;
    userId?: string;
}
