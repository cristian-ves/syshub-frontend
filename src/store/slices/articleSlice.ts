import {
    createSlice,
    createAsyncThunk,
    type PayloadAction,
} from "@reduxjs/toolkit";
import { articleService } from "../../features/articles/services/article.service";
import type {
    Article,
    ArticleDetail,
    ArticleFilters,
    CreateArticleRequest,
    PaginatedResponse,
} from "../../types/article.types";

interface ArticleState {
    articles: Article[];
    selectedArticle: ArticleDetail | null;
    totalPages: number;
    currentPage: number;
    loading: boolean;
    error: string | null;
    filters: ArticleFilters;
}

const initialState: ArticleState = {
    articles: [],
    selectedArticle: null,
    totalPages: 0,
    currentPage: 0,
    loading: false,
    error: null,
    filters: {
        page: 0,
        size: 8,
        search: undefined,
        courseId: undefined,
        tag: undefined,
        status: "PUBLISHED",
        sort: "puntos,desc",
    },
};

export const fetchArticleBySlug = createAsyncThunk(
    "articles/fetchBySlug",
    async (slug: string, { rejectWithValue }) => {
        try {
            return await articleService.getArticleBySlug(slug);
        } catch (error: any) {
            return rejectWithValue("Error al cargar el artículo");
        }
    }
);

export const fetchArticles = createAsyncThunk(
    "articles/fetchAll",
    async (filters: ArticleFilters, { rejectWithValue }) => {
        try {
            return await articleService.getArticles(filters);
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Error al cargar artículos"
            );
        }
    }
);

export const createArticleThunk = createAsyncThunk(
    "articles/create",
    async (article: CreateArticleRequest, { rejectWithValue }) => {
        try {
            return await articleService.createArticle(article);
        } catch (error: any) {
            return rejectWithValue(
                error.message || "Error al crear el artículo"
            );
        }
    }
);

export const voteArticleThunk = createAsyncThunk(
    "articles/vote",
    async ({ id, newVote }: { id: number; newVote: number }) => {
        const { newPoints, vote } = await articleService.voteArticle(
            id,
            newVote
        );
        return { id, newPoints, vote };
    }
);

export const toggleFavoriteThunk = createAsyncThunk(
    "articles/toggleFavorite",
    async (id: number) => {
        await articleService.toggleFavorite(id);
        return id;
    }
);

export const deleteArticleThunk = createAsyncThunk(
    "articles/delete",
    async (id: number, { rejectWithValue }) => {
        try {
            await articleService.deleteArticle(id);
            return id;
        } catch (error: any) {
            return rejectWithValue(
                error.message || "Error al eliminar el artículo"
            );
        }
    }
);

export const updateArticleThunk = createAsyncThunk(
    "articles/update",
    async (
        { id, data }: { id: number; data: Partial<CreateArticleRequest> },
        { rejectWithValue }
    ) => {
        try {
            return await articleService.updateArticle(id, data);
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message ||
                    "Error al actualizar el artículo"
            );
        }
    }
);

export const addCommentThunk = createAsyncThunk(
    "articles/addComment",
    async ({
        articleId,
        contenido,
    }: {
        articleId: number;
        contenido: string;
    }) => {
        return await articleService.addComment(articleId, contenido);
    }
);

export const deleteCommentThunk = createAsyncThunk(
    "articles/deleteComment",
    async (commentId: number) => {
        return await articleService.deleteComment(commentId);
    }
);

export const articleSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {
        setArticleFilters: (
            state,
            action: PayloadAction<Partial<ArticleFilters>>
        ) => {
            state.filters = {
                ...state.filters,
                ...action.payload,
                page: action.payload.page ?? 0,
            };
        },
        resetArticleFilters: (state) => {
            state.filters = initialState.filters;
        },
        clearSelectedArticle: (state) => {
            state.selectedArticle = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleBySlug.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchArticleBySlug.fulfilled,
                (state, action: PayloadAction<ArticleDetail>) => {
                    state.loading = false;
                    state.selectedArticle = action.payload;
                }
            )
            .addCase(fetchArticleBySlug.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchArticles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchArticles.fulfilled,
                (state, action: PayloadAction<PaginatedResponse<Article>>) => {
                    state.loading = false;
                    state.articles = action.payload.content;
                    state.totalPages = action.payload.totalPages;
                    state.currentPage = action.payload.number;
                }
            )
            .addCase(fetchArticles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(voteArticleThunk.fulfilled, (state, action) => {
                const { id, newPoints, vote } = action.payload;

                const listArticle = state.articles.find((a) => a.id === id);
                if (listArticle) {
                    listArticle.puntos = newPoints;
                    listArticle.vote = vote;
                }

                if (state.selectedArticle?.id === id) {
                    state.selectedArticle.puntos = newPoints;
                    state.selectedArticle.vote = vote;
                }
            })
            .addCase(toggleFavoriteThunk.fulfilled, (state, action) => {
                const id = action.payload;

                const listArticle = state.articles.find((a) => a.id === id);
                if (listArticle) {
                    listArticle.favorite = !listArticle.favorite;
                }

                if (state.selectedArticle?.id === id) {
                    state.selectedArticle.favorite =
                        !state.selectedArticle.favorite;
                }
            });

        builder.addCase(deleteArticleThunk.fulfilled, (state, action) => {
            const deletedId = action.payload;
            state.articles = state.articles.filter(
                (article) => article.id !== deletedId
            );
            if (state.selectedArticle?.id === deletedId) {
                state.selectedArticle = null;
            }
        });

        builder.addCase(updateArticleThunk.fulfilled, (state, action) => {
            const updatedArticle = action.payload;

            const index = state.articles.findIndex(
                (a) => a.id === updatedArticle.id
            );
            if (index !== -1) {
                state.articles[index] = updatedArticle;
            }

            if (
                state.selectedArticle &&
                state.selectedArticle.id === updatedArticle.id
            ) {
                state.selectedArticle = {
                    ...updatedArticle,
                    comentarios: state.selectedArticle.comentarios,
                };
            }
        });

        builder.addCase(addCommentThunk.fulfilled, (state, action) => {
            if (state.selectedArticle) {
                state.selectedArticle.comentarios.unshift(action.payload);
            }
        });

        builder.addCase(deleteCommentThunk.fulfilled, (state, action) => {
            if (state.selectedArticle) {
                state.selectedArticle.comentarios =
                    state.selectedArticle.comentarios.filter(
                        (c) => c.id !== action.payload
                    );
            }
        });
    },
});

export const { setArticleFilters, resetArticleFilters, clearSelectedArticle } =
    articleSlice.actions;
export default articleSlice.reducer;
