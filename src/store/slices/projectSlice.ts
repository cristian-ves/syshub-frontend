import {
    createSlice,
    createAsyncThunk,
    type PayloadAction,
} from "@reduxjs/toolkit";
import { projectService } from "../../features/projects/services/project.service";
import type {
    Project,
    PaginatedResponse,
    ProjectFilters,
} from "../../types/project.types";

interface ProjectState {
    projects: Project[];
    totalPages: number;
    currentPage: number;
    loading: boolean;
    error: string | null;
    filters: ProjectFilters;
}

const initialState: ProjectState = {
    projects: [],
    totalPages: 0,
    currentPage: 0,
    loading: false,
    error: null,
    filters: {
        page: 0,
        size: 8,
        destacado: undefined,
        pensumId: undefined,
        semestreNum: undefined,
        areaId: undefined,
        tag: undefined,
        cursoNombre: undefined,
        userId: undefined,
        search: undefined,
    },
};

export const fetchProjects = createAsyncThunk(
    "projects/fetchAll",
    async (filters: ProjectFilters, { rejectWithValue }) => {
        try {
            return await projectService.getProjects(filters);
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);

export const toggleProjectFeatured = createAsyncThunk(
    "projects/toggleFeatured",
    async (
        { id, featured }: { id: number; featured: boolean },
        { rejectWithValue }
    ) => {
        try {
            return await projectService.toggleDestacado(id, featured);
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);

export const projectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        clearProjectError: (state) => {
            state.error = null;
        },
        setFilters: (state, action: PayloadAction<Partial<ProjectFilters>>) => {
            const newPage =
                action.payload.page !== undefined ? action.payload.page : 0;

            state.filters = {
                ...state.filters,
                ...action.payload,
                page: newPage,
            };
        },
        resetFilters: (state) => {
            state.filters = initialState.filters;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                state.filters = action.meta.arg;
            })
            .addCase(
                fetchProjects.fulfilled,
                (state, action: PayloadAction<PaginatedResponse<Project>>) => {
                    state.loading = false;
                    state.projects = action.payload.content;
                    state.totalPages = action.payload.totalPages;
                    state.currentPage = action.payload.number;
                }
            )
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(
                toggleProjectFeatured.fulfilled,
                (state, action: PayloadAction<Project>) => {
                    const index = state.projects.findIndex(
                        (p) => p.id === action.payload.id
                    );
                    if (index !== -1) {
                        state.projects[index] = action.payload;
                    }
                }
            );
    },
});

export const { clearProjectError } = projectSlice.actions;
export default projectSlice.reducer;
