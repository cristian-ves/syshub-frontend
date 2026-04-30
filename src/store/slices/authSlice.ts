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

interface AuthState {
    user: { username: string; role: string } | null;
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
            return rejectWithValue(error);
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
            return rejectWithValue(error);
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                loginUser.fulfilled,
                (state, action: PayloadAction<AuthResponseDTO>) => {
                    state.loading = false;
                    state.isAuthenticated = true;
                    state.user = {
                        username: action.payload.username,
                        role: action.payload.role,
                    };
                    state.token = action.payload.token;
                }
            )
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                registerUser.fulfilled,
                (state, action: PayloadAction<AuthResponseDTO>) => {
                    state.loading = false;
                    state.isAuthenticated = true;
                    state.user = {
                        username: action.payload.username,
                        role: action.payload.role,
                    };
                    state.token = action.payload.token;
                }
            )
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(
                checkAuth.fulfilled,
                (state, action: PayloadAction<AuthResponseDTO>) => {
                    state.isInitializing = false;
                    state.isAuthenticated = true;
                    state.user = {
                        username: action.payload.username,
                        role: action.payload.role,
                    };
                }
            )
            .addCase(checkAuth.rejected, (state) => {
                state.isInitializing = false;
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
