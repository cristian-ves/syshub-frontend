import {
    createSlice,
    createAsyncThunk,
    type PayloadAction,
} from "@reduxjs/toolkit";
import { authService } from "../../features/auth/services/auth.service";
import type {
    LoginRequestDTO,
    RegisterRequestDTO,
    AuthResponseDTO,
} from "../../types/auth.types";
import { userService } from "../../features/profile/services/user.service";

interface AuthState {
    user: {
        id: string;
        username: string;
        email: string;
        role: string;
        nombreCompleto: string;
        registroAcademico?: string;
        carreraId?: number;
        carreraNombre?: string;
    } | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    isInitializing: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem("token"),
    isAuthenticated: !!localStorage.getItem("token"),
    loading: false,
    isInitializing: true,
    error: null,
};

export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials: LoginRequestDTO, { rejectWithValue }) => {
        try {
            const data = await authService.login(credentials);
            localStorage.setItem("token", data.token);
            return data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Error al iniciar sesión"
            );
        }
    }
);

export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData: RegisterRequestDTO, { rejectWithValue }) => {
        try {
            const data = await authService.register(userData);
            localStorage.setItem("token", data.token);
            return data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Error al registrarse"
            );
        }
    }
);

export const checkAuth = createAsyncThunk(
    "auth/check",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No hay sesión activa");
            return await authService.validateToken();
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    "auth/updateProfile",
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            return await userService.updateProfile(id, data);
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Error al actualizar perfil"
            );
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
            localStorage.removeItem("token");
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isInitializing = false;
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
                localStorage.removeItem("token");
            })
            .addMatcher(
                (action): action is PayloadAction<AuthResponseDTO> =>
                    [
                        loginUser.fulfilled.type,
                        registerUser.fulfilled.type,
                        checkAuth.fulfilled.type,
                        updateUserProfile.fulfilled.type,
                    ].includes(action.type),
                (state: AuthState, action: PayloadAction<AuthResponseDTO>) => {
                    state.loading = false;
                    state.isInitializing = false;
                    state.isAuthenticated = true;

                    if (action.payload.token) {
                        state.token = action.payload.token;
                        localStorage.setItem("token", action.payload.token);
                    }

                    state.user = {
                        id: action.payload.id,
                        username: action.payload.username,
                        email: action.payload.email,
                        role: action.payload.role,
                        nombreCompleto: action.payload.nombreCompleto,
                        registroAcademico: action.payload.registroAcademico,
                        carreraId: action.payload.carreraId,
                        carreraNombre: action.payload.carreraNombre,
                    };
                    state.error = null;
                }
            );
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
