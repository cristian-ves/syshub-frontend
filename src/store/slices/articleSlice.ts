import {
    createSlice,
    createAsyncThunk,
    type PayloadAction,
} from "@reduxjs/toolkit";
import { articleService } from "../../features/articles/services/article.service";
import type {
    Article,
    ArticleFilters,
    PaginatedResponse,
} from "../../types/article.types";

interface ArticleState {
    articles: Article[];
    selectedArticle: Article | null;
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
        sort: "createdAt,desc",
    },
};

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
                const article = state.articles.find((a) => a.id === id);
                console.log(action.payload);

                if (article) {
                    article.puntos = newPoints;
                    article.vote = vote;
                }
            })
            .addCase(toggleFavoriteThunk.fulfilled, (state, action) => {
                const id = action.payload;
                const article = state.articles.find((a) => a.id === id);
                if (article) {
                    article.favorite = !article.favorite;
                }
            });
    },
});

export const { setArticleFilters, resetArticleFilters, clearSelectedArticle } =
    articleSlice.actions;
export default articleSlice.reducer;
