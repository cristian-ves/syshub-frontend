import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LoginPage, RegisterPage, LandingPage, ForgotPasswordPage, ResetPasswordPage } from '../pages';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { AppLayout } from '../components/layout/AppLayout';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            { index: true, element: <LandingPage /> },
            {
                path: 'login',
                element: <PublicRoute><LoginPage /></PublicRoute>
            },
            {
                path: 'register',
                element: <PublicRoute><RegisterPage /></PublicRoute>
            },
            {
                path: 'forgot-password',
                element: <PublicRoute><ForgotPasswordPage /></PublicRoute>
            },
            {
                path: 'reset-password',
                element: <PublicRoute><ResetPasswordPage /></PublicRoute>
            },
            {
                path: 'dashboard',
                element: (
                    <ProtectedRoute>
                        <div className="p-20 text-center">
                            <h1 className="text-4xl font-bold dark:text-white">Dashboard Senior</h1>
                        </div>
                    </ProtectedRoute>
                )
            },
            { path: '*', element: <Navigate to="/" replace /> }
        ]
    }
]);