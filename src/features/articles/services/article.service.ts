import api from "../../../api/axios.config";
import type {
    Article,
    ArticleFilters,
    PaginatedResponse,
    VoteResponse,
} from "../../../types/article.types";

export const articleService = {
    getArticles: async (
        filters: ArticleFilters
    ): Promise<PaginatedResponse<Article>> => {
        const { data } = await api.get<PaginatedResponse<Article>>(
            "/articles",
            {
                params: filters,
            }
        );
        return data;
    },

    getArticleBySlug: async (slug: string): Promise<Article> => {
        const { data } = await api.get<Article>(`/articles/${slug}`);
        return data;
    },

    voteArticle: async (id: number, value: number): Promise<VoteResponse> => {
        const { data } = await api.post(`/articles/${id}/vote`, null, {
            params: { value },
        });
        return data;
    },

    toggleFavorite: async (id: number): Promise<void> => {
        await api.post(`/articles/${id}/favorite`);
    },

    getMyFavorites: async (page = 0): Promise<PaginatedResponse<Article>> => {
        const { data } = await api.get<PaginatedResponse<Article>>(
            "/articles/favorites",
            {
                params: { page },
            }
        );
        return data;
    },

    createArticle: async (article: Partial<Article>): Promise<Article> => {
        const { data } = await api.post<Article>("/articles", article);
        return data;
    },

    updateArticle: async (
        id: number,
        article: Partial<Article>
    ): Promise<Article> => {
        const { data } = await api.put<Article>(`/articles/${id}`, article);
        return data;
    },

    deleteArticle: async (id: number): Promise<void> => {
        await api.delete(`/articles/${id}`);
    },
};
