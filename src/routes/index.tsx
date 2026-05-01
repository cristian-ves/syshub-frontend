import { createBrowserRouter, Navigate } from 'react-router-dom';
import {
    LoginPage,
    RegisterPage,
    LandingPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    MyProfilePage
} from '../pages';

import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { AppLayout } from '../components/layout/AppLayout';
import { AuthLayout } from '../components/layout/AuthLayout';
import { ProjectsPage } from '../pages/projects/ProjectsPage';
import { CreateProjectPage } from '../pages/projects/CreateProjectPage';
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
                        path: 'projects/create',
                        element: <ProtectedRoute><CreateProjectPage /></ProtectedRoute>
                    },
                    {
                        path: 'me',
                        element: <ProtectedRoute><MyProfilePage /></ProtectedRoute>
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