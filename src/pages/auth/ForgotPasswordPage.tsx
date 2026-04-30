import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ForgotPasswordForm } from '../../features/auth/components/ForgotPasswordForm';
import logo from '../../assets/logo.svg';

export const ForgotPasswordPage: React.FC = () => {
    return (
        <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-8">
            <div className="flex flex-col items-center mb-8">
                <img src={logo} alt="Logo" className="h-10 w-auto mb-6" />
                <h1 className="text-2xl font-black dark:text-white">Recuperar acceso</h1>
            </div>

            <ForgotPasswordForm />

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-blue transition-colors font-bold text-sm"
                >
                    <ArrowLeft size={16} />
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
};