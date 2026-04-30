export interface Archivo {
    id: number;
    nombreArchivo: string;
    nombreOriginal: string;
    tipoArchivo: string;
}

export interface Project {
    id: number;
    titulo: string;
    descripcion: string;
    autorNombre: string;
    cursoNombre: string;
    pensumNombre: string;
    repoUrl: string;
    destacado: boolean;
    tags: Tag[];
    archivos: Archivo[];
    areaColor: string;
    areaNombre: string;
    fechaSubida: string;
}

export interface Tag {
    color: string;
    nombre: string;
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
    destacado?: boolean;
    pensumId?: number;
    semestreNum?: number;
    areaId?: number;
    tag?: string;
    cursoNombre?: string;
    search?: string;
    userId?: number;
}
