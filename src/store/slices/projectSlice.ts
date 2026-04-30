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
import { toast } from "sonner";

interface ProjectState {
    projects: Project[];
    totalPages: number;
    currentPage: number;
    loading: boolean;
    error: string | null;
}

const initialState: ProjectState = {
    projects: [],
    totalPages: 0,
    currentPage: 0,
    loading: false,
    error: null,
};

export const fetchProjects = createAsyncThunk(
    "projects/fetchAll",
    async (filters: ProjectFilters, { rejectWithValue }) => {
        try {
            return await projectService.getProjects(filters);
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Error al cargar proyectos"
            );
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
            toast.error("Error al actualizar estado");
            return rejectWithValue(
                error.response?.data?.message || "Error en la operación"
            );
        }
    }
);

export const projectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Projects
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true;
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

            // Toggle Featured
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

export default projectSlice.reducer;
