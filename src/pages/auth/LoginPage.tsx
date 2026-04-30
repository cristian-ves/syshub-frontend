import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { LoginForm } from '../../features/auth/components/LoginForm';
import { ThemeToggle } from '../../components/common';

export const LoginPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-slate-950 transition-colors">
            <div className="hidden lg:flex lg:w-1/2 bg-brand-blue p-12 flex-col justify-between text-white relative overflow-hidden">
                <div className="relative z-10">
                    <Link to="/" className="flex items-center gap-3">
                        <img src={logo} alt="Logo" className="h-12 w-auto brightness-200" />
                        <span className="text-3xl font-black tracking-tighter">syshub</span>
                    </Link>
                    <h2 className="text-5xl font-black mt-20 leading-tight">
                        Bienvenido de <br /> vuelta a la <br /> <span className="text-brand-pink">Plataforma</span>.
                    </h2>
                    <p className="mt-6 text-xl text-blue-100 max-w-md">
                        Accede a tu panel para gestionar tus cursos y proyectos académicos.
                    </p>
                </div>

                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-20 -mb-20 blur-3xl"></div>
            </div>

            <div className="flex-grow flex items-center justify-center p-6 md:p-12 relative">
                <div className="absolute top-8 right-8">
                    <ThemeToggle />
                </div>

                <div className="w-full max-w-md">
                    <div className="mb-10 lg:hidden flex flex-col items-center">
                        <img src={logo} alt="Logo" className="h-12 w-auto mb-4" />
                        <h1 className="text-3xl font-black dark:text-white">Iniciar Sesión</h1>
                    </div>

                    <div className="hidden lg:block mb-10">
                        <h1 className="text-4xl font-black text-slate-950 dark:text-white">Ingresar</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
                            ¿Aún no tienes cuenta? {' '}
                            <Link to="/register" className="text-brand-blue dark:text-blue-400 font-bold hover:underline">
                                Regístrate aquí
                            </Link>
                        </p>
                    </div>

                    <LoginForm />

                    <p className="mt-8 text-center text-sm text-slate-500 lg:hidden">
                        ¿No tienes cuenta? {' '}
                        <Link to="/register" className="text-brand-blue font-bold">Regístrate ahora</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};