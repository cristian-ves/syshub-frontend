import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'ghost' | 'secondary';
    className?: string;
    type?: 'button' | 'submit';
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    variant = 'primary',
    className = '',
    type = 'button',
    disabled = false
}) => {
    const baseStyles = "px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95 text-center cursor-pointer flex items-center justify-center";

    const variants = {
        primary: "bg-brand-blue text-white hover:bg-blue-800 shadow-lg shadow-blue-700/10",
        ghost: "bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-brand-blue dark:hover:text-blue-400",
        secondary: "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};