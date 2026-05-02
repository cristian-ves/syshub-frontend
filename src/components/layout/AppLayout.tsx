import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { checkAuth } from '../../store/slices/authSlice';
import Footer from './Footer';
import { Navbar } from './Navbar';

export const AppLayout = () => {
    const dispatch = useAppDispatch();
    const { isInitializing } = useAppSelector(state => state.auth);

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    if (isInitializing) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-slate-950">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
            <Navbar />

            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};