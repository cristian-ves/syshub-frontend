import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { type RootState } from '../store';
import type { JSX } from 'react';

export const AdminRoute = ({ children }: { children: JSX.Element }) => {
    const { user } = useSelector((state: RootState) => state.auth);
    const { role } = user;

    if (role !== "ROLE_ADMIN") {
        return <Navigate to="/profile" />;
    }

    return children;
};