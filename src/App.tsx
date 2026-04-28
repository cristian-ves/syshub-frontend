import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ForgotPasswordPage, LandingPage, LoginPage, RegisterPage, ResetPasswordPage } from './pages';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { PublicRoute } from './routes/PublicRoute';
import { Toaster } from 'sonner';

export const App = () => {
    return (
        <BrowserRouter>
            <Toaster position="top-right" richColors closeButton />
            <Routes>
                {/* Public routes*/}
                <Route path="/" element={<LandingPage />} />

                {/* Auth Routes */}
                <Route path="/login" element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                } />

                <Route path="/forgot-password" element={
                    <PublicRoute>
                        <ForgotPasswordPage />
                    </PublicRoute>
                } />

                <Route path="/register" element={
                    <PublicRoute>
                        <RegisterPage />
                    </PublicRoute>
                } />

                <Route
                    path="/reset-password"
                    element={
                        <PublicRoute>
                            <ResetPasswordPage />
                        </PublicRoute>
                    }
                />

                {/* Private Routes */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <div className="p-20 dark:text-white text-center">
                                <h1 className="text-4xl font-bold">¡Bienvenido al Dashboard, cerote!</h1>
                                <p className="mt-4 text-slate-400">Solo vos podés ver esta babosada.</p>
                            </div>
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;