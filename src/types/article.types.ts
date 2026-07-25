import type { Tag, PaginatedResponse } from "./project.types";

export interface CreateArticleRequest {
    title: string;
    excerpt: string;
    content: string;
    courseId: number;
    status: "DRAFT" | "PUBLISHED";
    tags: { name: string; color?: string }[];
}

export interface VoteResponse {
    articleId: number;
    newPoints: number;
    vote: number;
}

export interface ArticleComment {
    id: number;
    content: string;
    createdAt: string;
    author: {
        id: string;
        username: string;
        fullName: string;
        roleId: number;
    };
}

export interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    status: "DRAFT" | "PUBLISHED";
    points: number;
    votes: number;
    createdAt: string;
    favorite: boolean;
    author: {
        id: string;
        username: string;
        fullName: string;
    };
    course: {
        id: number;
        code: string;
        name: string;
    };
    tags: Tag[];
}

export interface ArticleDetail extends Article {
    comments: ArticleComment[];
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
