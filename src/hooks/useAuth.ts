import { useAppDispatch, useAppSelector } from "../store";
import {
    checkAuth,
    loginUser,
    registerUser,
    logout as logoutAction,
} from "../store/slices/authSlice";
import type { LoginRequestDTO, RegisterRequestDTO } from "../types/auth.types";

export const useAuth = () => {
    const dispatch = useAppDispatch();

    const { loading, error, isAuthenticated, user, isInitializing } =
        useAppSelector((state) => state.auth);

    const login = async (credentials: LoginRequestDTO) => {
        return await dispatch(loginUser(credentials)).unwrap();
    };

    const register = async (userData: RegisterRequestDTO) => {
        return await dispatch(registerUser(userData)).unwrap();
    };

    const checkSession = async () => {
        return await dispatch(checkAuth()).unwrap();
    };

    const logout = () => {
        dispatch(logoutAction());
    };

    return {
        login,
        register,
        logout,
        checkSession,
        loading,
        error,
        isAuthenticated,
        user,
        isInitializing,
    };
};
