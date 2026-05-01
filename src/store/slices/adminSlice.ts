import {
    createSlice,
    createAsyncThunk,
    type PayloadAction,
} from "@reduxjs/toolkit";
import { adminService } from "../../features/admin/services/admin.service";
import type {
    UserResponse,
    PaginatedUserResponse,
} from "../../types/users.types";
import { toast } from "sonner";

interface AdminState {
    users: UserResponse[];
    totalPages: number;
    currentPage: number;
    loading: boolean;
    error: string | null;
}

const initialState: AdminState = {
    users: [],
    totalPages: 0,
    currentPage: 0,
    loading: false,
    error: null,
};

export const createUserAction = createAsyncThunk(
    "admin/createUser",
    async (data: any, { rejectWithValue }) => {
        try {
            return await adminService.createUser(data);
        } catch (error: any) {
            return rejectWithValue(error || "Error al crear usuario");
        }
    }
);

export const fetchUsers = createAsyncThunk(
    "admin/fetchUsers",
    async (
        { page, size }: { page?: number; size?: number },
        { rejectWithValue }
    ) => {
        try {
            return await adminService.getAllUsers(page, size);
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Error al cargar usuarios"
            );
        }
    }
);

export const deleteUserAction = createAsyncThunk(
    "admin/deleteUser",
    async (id: string, { rejectWithValue }) => {
        try {
            await adminService.deleteUser(id);
            return id;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Error al eliminar"
            );
        }
    }
);

export const updateUserAction = createAsyncThunk(
    "admin/updateUser",
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            return await adminService.updateUser(id, data);
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Error al actualizar"
            );
        }
    }
);

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchUsers.fulfilled,
                (state, action: PayloadAction<PaginatedUserResponse>) => {
                    state.loading = false;
                    state.users = action.payload.content;
                    state.totalPages = action.payload.totalPages;
                    state.currentPage = action.payload.number;
                }
            )
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(
                deleteUserAction.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.users = state.users.filter(
                        (user) => user.id !== action.payload
                    );
                    toast.success("Usuario eliminado");
                }
            )
            .addCase(
                updateUserAction.fulfilled,
                (state, action: PayloadAction<UserResponse>) => {
                    const index = state.users.findIndex(
                        (u) => u.id === action.payload.id
                    );
                    if (index !== -1) {
                        state.users[index] = action.payload;
                    }
                    toast.success("Usuario actualizado");
                }
            )
            .addCase(
                createUserAction.fulfilled,
                (state, action: PayloadAction<UserResponse>) => {
                    state.users = [action.payload, ...state.users];
                }
            );
    },
});

export default adminSlice.reducer;
