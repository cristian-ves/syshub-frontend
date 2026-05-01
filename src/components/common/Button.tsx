import React, { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'ghost' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    isLoading = false,
    ...props
}) => {
    const baseStyles = "font-bold transition-all active:scale-95 text-center cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";

    const variants = {
        primary: "bg-brand-blue text-white hover:bg-blue-800 shadow-lg shadow-blue-700/10",
        ghost: "bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
        secondary: "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
        md: "px-6 py-2.5 text-sm rounded-xl gap-2",
        lg: "px-8 py-4 text-base rounded-2xl gap-3"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? (
                <div className="flex items-center gap-2">
                    <div className={`border-2 border-current/30 border-t-current rounded-full animate-spin ${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'}`} />
                    {size !== 'sm' && <span>Cargando...</span>}
                </div>
            ) : children}
        </button>
    );
};