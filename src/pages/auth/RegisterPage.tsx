import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { RegisterForm } from '../../features/auth/components/RegisterForm';
import { ThemeToggle } from '../../components/common';

export const RegisterPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-slate-950 transition-colors">
            <div className="hidden lg:flex lg:w-1/2 bg-brand-blue p-12 flex-col justify-between text-white relative overflow-hidden">
                <div className="relative z-10">
                    <Link to="/" className="flex items-center gap-3">
                        <img src={logo} alt="Logo" className="h-12 w-auto brightness-200" />
                        <span className="text-3xl font-black tracking-tighter">syshub</span>
                    </Link>
                    <h2 className="text-5xl font-black mt-20 leading-tight">
                        Únete a la red <br /> tecnológica del <br /> <span className="text-brand-pink">CUNOC</span>.
                    </h2>
                    <p className="mt-6 text-xl text-blue-100 max-w-md">
                        Gestiona tus cursos, colabora en proyectos y mantente conectado con tu facultad.
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
                        <h1 className="text-3xl font-black dark:text-white">Crear cuenta</h1>
                    </div>

                    <div className="hidden lg:block mb-10">
                        <h1 className="text-4xl font-black text-slate-950 dark:text-white">Empieza ahora</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
                            ¿Ya tienes cuenta? {' '}
                            <Link to="/login" className="text-brand-blue dark:text-blue-400 font-bold hover:underline">
                                Inicia sesión aquí
                            </Link>
                        </p>
                    </div>

                    <RegisterForm />

                    <p className="mt-8 text-center text-sm text-slate-500 lg:hidden">
                        ¿Ya tienes cuenta? {' '}
                        <Link to="/login" className="text-brand-blue font-bold">Inicia sesión</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};