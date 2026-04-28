import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import logo from '../assets/logo.svg';

export const ForgotPasswordPage: React.FC = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Aquí mandaremos el correo cuando el backend esté listo, cerote.");
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-8">
                <div className="flex flex-col items-center mb-8">
                    <img src={logo} alt="Logo" className="h-10 w-auto mb-6" />
                    <h1 className="text-2xl font-black dark:text-white">Recuperar acceso</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-center mt-2">
                        Ingresa tu correo institucional y te enviaremos los pasos para resetear tu clave.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Correo Electrónico"
                        type="email"
                        placeholder="tu-correo@cunoc.edu.gt"
                        required
                    />

                    <Button type="submit" className="w-full">
                        Enviar instrucciones
                    </Button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <Link
                        to="/login"
                        className="flex items-center justify-center gap-2 text-slate-500 hover:text-brand-blue transition-colors font-bold text-sm"
                    >
                        <ArrowLeft size={16} />
                        Volver al inicio de sesión
                    </Link>
                </div>
            </div>
        </div>
    );
};