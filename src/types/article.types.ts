import type { Tag, PaginatedResponse } from "./project.types";

export interface CreateArticleRequest {
    titulo: string;
    extracto: string;
    contenido: string;
    courseId: number;
    status: "DRAFT" | "PUBLISHED";
    tags: { nombre: string; color?: string }[];
}

export interface VoteResponse {
    articleId: number;
    newPoints: number;
    vote: number;
}

export interface Article {
    id: number;
    titulo: string;
    slug: string;
    extracto: string;
    contenido: string;
    status: "DRAFT" | "PUBLISHED";
    puntos: number;
    vote: number;
    createdAt: string;
    favorite: boolean;
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
