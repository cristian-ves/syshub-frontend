import {
    createSlice,
    createAsyncThunk,
    isAnyOf,
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
        sort: "points,desc",
    },
};

function patchArticle(
    state: ArticleState,
    id: number,
    patch: Partial<Article>
) {
    const listArticle = state.articles.find((a) => a.id === id);
    if (listArticle) Object.assign(listArticle, patch);

    if (state.selectedArticle?.id === id) {
        Object.assign(state.selectedArticle, patch);
    }
}

export const fetchArticleBySlug = createAsyncThunk(
    "articles/fetchBySlug",
    async (slug: string, { rejectWithValue }) => {
        try {
            return await articleService.getArticleBySlug(slug);
        } catch (error: any) {
            return rejectWithValue("Error loading the article");
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
                error.response?.data?.message || "Error loading the articles"
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
                error.message || "Error creating the article"
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
                error.message || "Error deleting the article"
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
                error.response?.data?.message || "Error updating the article"
            );
        }
    }
);

export const addCommentThunk = createAsyncThunk(
    "articles/addComment",
    async ({
        articleId,
        content: content,
    }: {
        articleId: number;
        content: string;
    }) => {
        return await articleService.addComment(articleId, content);
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
            state.filters = { ...initialState.filters };
        },
        clearSelectedArticle: (state) => {
            state.selectedArticle = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchArticleBySlug.fulfilled,
                (state, action: PayloadAction<ArticleDetail>) => {
                    state.loading = false;
                    state.selectedArticle = action.payload;
                }
            )
            .addCase(
                fetchArticles.fulfilled,
                (state, action: PayloadAction<PaginatedResponse<Article>>) => {
                    state.loading = false;
                    state.articles = action.payload.content;
                    state.totalPages = action.payload.totalPages;
                    state.currentPage = action.payload.number;
                }
            )
            .addCase(voteArticleThunk.fulfilled, (state, action) => {
                const { id, newPoints, vote } = action.payload;
                patchArticle(state, id, { points: newPoints, votes: vote });
            })
            .addCase(toggleFavoriteThunk.fulfilled, (state, action) => {
                const id = action.payload;
                const current =
                    state.articles.find((a) => a.id === id)?.favorite ??
                    state.selectedArticle?.favorite ??
                    false;
                patchArticle(state, id, { favorite: !current });
            })
            .addCase(deleteArticleThunk.fulfilled, (state, action) => {
                const deletedId = action.payload;
                state.articles = state.articles.filter(
                    (article) => article.id !== deletedId
                );
                if (state.selectedArticle?.id === deletedId) {
                    state.selectedArticle = null;
                }
            })
            .addCase(updateArticleThunk.fulfilled, (state, action) => {
                const updatedArticle = action.payload;
                const index = state.articles.findIndex(
                    (a) => a.id === updatedArticle.id
                );
                if (index !== -1) {
                    state.articles[index] = updatedArticle;
                }
                if (state.selectedArticle?.id === updatedArticle.id) {
                    state.selectedArticle = {
                        ...updatedArticle,
                        comments: state.selectedArticle.comments,
                    };
                }
            })
            .addCase(addCommentThunk.fulfilled, (state, action) => {
                state.selectedArticle?.comments.unshift(action.payload);
            })
            .addCase(deleteCommentThunk.fulfilled, (state, action) => {
                if (state.selectedArticle) {
                    state.selectedArticle.comments =
                        state.selectedArticle.comments.filter(
                            (c) => c.id !== action.payload
                        );
                }
            })
            .addMatcher(
                isAnyOf(fetchArticleBySlug.pending, fetchArticles.pending),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                isAnyOf(fetchArticleBySlug.rejected, fetchArticles.rejected),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload as string;
                }
            );
    },
});

export const { setArticleFilters, resetArticleFilters, clearSelectedArticle } =
    articleSlice.actions;
export default articleSlice.reducer;
