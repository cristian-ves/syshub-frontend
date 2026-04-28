import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import Footer from '../components/layout/Footer';
import { ThemeToggle, Button, Badge } from '../components/common';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            {/* Navbar */}
            <nav className="flex items-center justify-between px-6 md:px-12 py-5 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-50">
                <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
                    <img src={logo} alt="SysHub Logo" className="h-10 w-auto" />
                    <span className="text-2xl font-black text-slate-950 dark:text-white tracking-tighter">
                        sys<span className="text-brand-blue">hub</span>
                    </span>
                </Link>

                <div className="flex items-center gap-4 md:gap-6">
                    <ThemeToggle />
                    <Button variant="ghost" onClick={() => navigate('/login')}>
                        Iniciar Sesión
                    </Button>
                    <Button onClick={() => navigate('/register')}>
                        Empezar
                    </Button>
                </div>
            </nav>

            {/* Hero */}
            <main className="flex-grow flex items-center bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <Badge>Ecosistema para Ingeniería</Badge>
                        <h1 className="text-5xl md:text-7xl leading-[1.1] dark:text-white">
                            Enfócate en <span className="text-brand-blue">aprender</span>, nosotros hacemos el resto.
                        </h1>
                        <p className="mt-8 text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl font-medium">
                            SysHub es la plataforma modular diseñada para la próxima generación de ingenieros del {' '}
                            <span className="text-brand-pink font-bold">CUNOC</span>.
                            Centraliza tus cursos, foros y proyectos en un solo lugar.
                        </p>
                        <div className="mt-12 flex flex-col sm:flex-row gap-5">
                            <Button className="text-lg py-4 px-10" onClick={() => navigate('/register')}>
                                Crear Cuenta
                            </Button>
                        </div>
                    </div>

                    <div className="flex justify-center relative">
                        <div className="absolute inset-0 bg-brand-blue/10 blur-[120px] rounded-full"></div>
                        <img
                            src={logo}
                            alt="Branding"
                            className="w-64 md:w-80 h-auto drop-shadow-2xl dark:brightness-110"
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;