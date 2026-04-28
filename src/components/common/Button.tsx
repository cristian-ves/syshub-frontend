import React, { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'ghost' | 'secondary';
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    className = '',
    isLoading = false,
    ...props
}) => {
    const baseStyles = "px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95 text-center cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";

    const variants = {
        primary: "bg-brand-blue text-white hover:bg-blue-800 shadow-lg shadow-blue-700/10",
        ghost: "bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
        secondary: "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Cargando...</span>
                </div>
            ) : children}
        </button>
    );
};