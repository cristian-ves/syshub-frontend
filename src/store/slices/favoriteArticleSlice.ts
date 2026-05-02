import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { articleService } from "../../features/articles/services/article.service";
import type { Article } from "../../types/article.types";
import {
    toggleFavoriteThunk,
    deleteArticleThunk,
    updateArticleThunk,
    voteArticleThunk,
} from "./articleSlice";

interface FavoriteArticlesState {
    items: Article[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    totalPages: number;
}

const initialState: FavoriteArticlesState = {
    items: [],
    loading: false,
    error: null,
    currentPage: 0,
    totalPages: 0,
};

export const fetchMyFavorites = createAsyncThunk(
    "favoriteArticles/fetchMyFavorites",
    async (page: number, { rejectWithValue }) => {
        try {
            return await articleService.getMyFavorites(page);
        } catch (error: any) {
            return rejectWithValue(
                error.message || "Error al cargar favoritos"
            );
        }
    }
);

const favoriteArticlesSlice = createSlice({
    name: "favoriteArticles",
    initialState,
    reducers: {
        clearFavorites: (state) => {
            state.items = [];
            state.currentPage = 0;
            state.totalPages = 0;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMyFavorites.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchMyFavorites.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload.content;
            state.currentPage = action.payload.number;
            state.totalPages = action.payload.totalPages;
        });
        builder.addCase(fetchMyFavorites.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        builder.addCase(toggleFavoriteThunk.fulfilled, (state, action) => {
            const id = action.meta.arg;
            state.items = state.items.filter((article) => article.id !== id);
        });

        builder.addCase(deleteArticleThunk.fulfilled, (state, action) => {
            state.items = state.items.filter(
                (article) => article.id !== action.meta.arg
            );
        });

        builder.addCase(updateArticleThunk.fulfilled, (state, action) => {
            const index = state.items.findIndex(
                (a) => a.id === action.payload.id
            );
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        });

        builder.addCase(voteArticleThunk.fulfilled, (state, action) => {
            const { id, newPoints, vote } = action.payload;

            const articleToUpdate = state.items.find(
                (article) => article.id === id
            );

            if (articleToUpdate) {
                articleToUpdate.puntos = newPoints;
                articleToUpdate.vote = vote;
            }
        });
    },
});

export const { clearFavorites } = favoriteArticlesSlice.actions;
export default favoriteArticlesSlice.reducer;
