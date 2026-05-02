import type { Tag, PaginatedResponse } from "./project.types";

export interface Article {
    id: number;
    titulo: string;
    slug: string;
    extracto: string;
    contenido: string;
    status: "DRAFT" | "PUBLISHED";
    puntos: number;
    createdAt: string;
    isFavorite: boolean;
    autor: {
        id: string;
        username: string;
        nombreCompleto: string;
    };
    curso: {
        id: number;
        codigo: string;
        nombre: string;
    };
    tags: Tag[];
}

export interface ArticleFilters {
    page?: number;
    size?: number;
    search?: string;
    courseId?: number;
    tag?: string;
    status?: "DRAFT" | "PUBLISHED";
    sort?: string;
}

export type { PaginatedResponse };
