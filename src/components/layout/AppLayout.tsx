import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { setCredentials, logout, loginStart } from '../../store/slices/authSlice';
import { authService } from '../../features/auth/services/auth.service';
import Footer from './Footer';
import { Navbar } from './Navbar';

export const AppLayout = () => {
    const dispatch = useAppDispatch();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                dispatch(logout());
                setIsChecking(false);
                return;
            }

            dispatch(loginStart());

            try {
                const data = await authService.validateToken();
                dispatch(setCredentials(data));
            } catch (error) {
                dispatch(logout());
            } finally {
                setIsChecking(false);
            }
        };
        initAuth();
    }, [dispatch]);


    if (isChecking) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-slate-950">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden">
            <Navbar />

            <main className="flex-grow flex items-center justify-center p-6 overflow-y-auto">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};