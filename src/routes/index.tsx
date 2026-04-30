import { createBrowserRouter, Navigate } from 'react-router-dom';
import {
    LoginPage,
    RegisterPage,
    LandingPage,
    ForgotPasswordPage,
    ResetPasswordPage
} from '../pages';

import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { AppLayout } from '../components/layout/AppLayout';
import { AuthLayout } from '../components/layout/AuthLayout';
import { ProjectsPage } from '../pages/projects/ProjectsPage';
export const router = createBrowserRouter([
    {
        path: '/',
        children: [
            {
                element: <AppLayout />,
                children: [
                    { index: true, element: <LandingPage /> },
                    {
                        path: 'forgot-password',
                        element: <PublicRoute><ForgotPasswordPage /></PublicRoute>
                    },
                    {
                        path: 'reset-password',
                        element: <PublicRoute><ResetPasswordPage /></PublicRoute>
                    },
                    {
                        path: 'projects',
                        element: <ProtectedRoute><ProjectsPage /></ProtectedRoute>
                    },
                    {
                        path: 'dashboard',
                        element: <ProtectedRoute>
                            <div className="p-20 text-center">
                                <h1 className="text-4xl font-bold dark:text-white">Dashboard</h1>
                                <p className="text-slate-500 mt-4">Bienvenido a la plataforma.</p>
                            </div>
                        </ProtectedRoute>
                    },
                ]
            },

            {
                element: <AuthLayout />,
                children: [
                    { path: 'login', element: <PublicRoute><LoginPage /></PublicRoute> },
                    { path: 'register', element: <PublicRoute><RegisterPage /></PublicRoute> },
                ]
            },

            { path: '*', element: <Navigate to="/" replace /> }
        ]
    }
]);