import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { useAppDispatch, useAppSelector } from '../../store';
import { logout } from '../../store/slices/authSlice';
import { ThemeToggle, Button } from '../common';
import { LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-50 transition-colors shadow-sm shadow-slate-200/50 dark:shadow-none">
            <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <img src={logo} alt="SysHub Logo" className="h-9 w-auto" />
                <span className="text-xl font-black text-slate-950 dark:text-white tracking-tighter">
                    sys<span className="text-brand-blue">hub</span>
                </span>
            </Link>

            {isAuthenticated && (
                <div className="hidden md:flex items-center gap-2">
                    <Button variant="ghost" onClick={() => navigate('/dashboard')}>Dashboard</Button>
                    <Button variant="ghost" onClick={() => navigate('/projects')}>Proyectos</Button>
                    <Button variant="ghost" onClick={() => navigate('/forum')}>Foro</Button>
                </div>
            )}

            <div className="flex items-center gap-4">
                <ThemeToggle />

                {isAuthenticated ? (
                    <div className="flex items-center gap-4 pl-4 border-l border-slate-200 dark:border-slate-700">
                        <div className="hidden sm:flex flex-col items-end">
                            <span className="text-sm font-bold dark:text-white leading-none">
                                {user?.username}
                            </span>
                            <span className="text-[10px] font-bold text-brand-pink uppercase tracking-widest mt-1">
                                {user?.role?.replace('ROLE_', '')}
                            </span>
                        </div>

                        <Button
                            variant="ghost"
                            className="!px-3 text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 transition-colors"
                            onClick={handleLogout}
                        >
                            <LogOut className="h-5 w-5" />
                        </Button>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Button variant="ghost" onClick={() => navigate('/login')}>
                            Iniciar Sesión
                        </Button>
                        <Button onClick={() => navigate('/register')}>
                            Empezar
                        </Button>
                    </div>
                )}
            </div>
        </nav>
    );
};