import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { type RootState } from '../store';
import type { JSX } from 'react';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};