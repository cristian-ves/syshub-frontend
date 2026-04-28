import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />

                <Route path="/login" element={<div className="p-10 dark:text-white">Página de Login en construcción...</div>} />
                <Route path="/register" element={<div className="p-10 dark:text-white">Página de Registro en construcción...</div>} />

                {/* Private Routes */}
                {/* <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> */}

                {/* Redirect any unknown route to home */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;