import { createBrowserRouter, Navigate } from 'react-router-dom';
import {
    LoginPage,
    RegisterPage,
    LandingPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    ProfileInfoPage,
    MyProjectsPage,
    UsersPage,
    CreateUserPage,
    ArticlesPage,
} from '../pages';

import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { ProjectsPage } from '../pages/projects/ProjectsPage';
import { CreateProjectPage } from '../pages/projects/CreateProjectPage';
import { MyProfileLayout } from '../components/layout/MyProfileLayout';
import { AppLayout, AuthLayout } from '../components/layout';
import { AdminRoute } from './AdminRoute';
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
                        path: 'articles',
                        element: <ProtectedRoute><ArticlesPage /></ProtectedRoute>
                    },
                    {
                        path: 'users',
                        element: <ProtectedRoute><AdminRoute><UsersPage /></AdminRoute></ProtectedRoute>
                    },
                    {
                        path: 'users/create',
                        element: <ProtectedRoute><AdminRoute><CreateUserPage /></AdminRoute></ProtectedRoute>
                    },
                    {
                        path: 'profile',
                        element: <ProtectedRoute><MyProfileLayout /></ProtectedRoute>,
                        children: [
                            { index: true, element: <Navigate to="info" replace /> },
                            { path: 'info', element: <ProfileInfoPage /> },
                            { path: 'projects', element: <MyProjectsPage /> },
                        ]
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