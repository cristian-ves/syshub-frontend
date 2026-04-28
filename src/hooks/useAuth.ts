import { useAppDispatch, useAppSelector } from "../store";
import {
    loginStart,
    loginSuccess,
    loginFailure,
    logout as logoutAction,
} from "../store/slices/authSlice";
import api from "../api/axios.config";

export const useAuth = () => {
    const dispatch = useAppDispatch();

    const { loading, error, isAuthenticated, user } = useAppSelector(
        (state) => state.auth
    );

    const login = async (credentials: any) => {
        dispatch(loginStart());
        try {
            const { data } = await api.post("/auth/login", credentials);

            dispatch(loginSuccess({ user: data, token: data.token }));
            return data;
        } catch (err: any) {
            dispatch(loginFailure(err));
        }
    };

    const logout = () => {
        dispatch(logoutAction());
    };

    return { login, logout, loading, error, isAuthenticated, user };
};
