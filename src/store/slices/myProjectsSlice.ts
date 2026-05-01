import {
    createSlice,
    createAsyncThunk,
    type PayloadAction,
} from "@reduxjs/toolkit";
import { projectService } from "../../features/projects/services/project.service";
import type { Project, PaginatedResponse } from "../../types/project.types";

interface MyProjectsState {
    projects: Project[];
    totalPages: number;
    currentPage: number;
    loading: boolean;
    error: string | null;
}

const initialState: MyProjectsState = {
    projects: [],
    totalPages: 0,
    currentPage: 0,
    loading: false,
    error: null,
};

export const fetchMyProjects = createAsyncThunk(
    "myProjects/fetch",
    async (
        {
            userId,
            page = 0,
            size = 8,
        }: { userId: string; page?: number; size?: number },
        { rejectWithValue }
    ) => {
        try {
            return await projectService.getProjects({
                userId,
                page,
                size,
            });
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);

const myProjectsSlice = createSlice({
    name: "myProjects",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchMyProjects.fulfilled,
                (state, action: PayloadAction<PaginatedResponse<Project>>) => {
                    state.loading = false;
                    state.projects = action.payload.content;
                    state.totalPages = action.payload.totalPages;
                    state.currentPage = action.payload.number;
                }
            )
            .addCase(fetchMyProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default myProjectsSlice.reducer;
