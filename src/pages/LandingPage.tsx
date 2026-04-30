import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { Button, Badge } from '../components/common';

export const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="h-full flex items-center justify-center p-6">

            <div className="flex-grow flex w-full">
                <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center my-auto w-full">
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
            </div>
        </div>
    );
};
