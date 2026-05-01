import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    className?: string;
    noMargin?: boolean;
    variant?: 'brand' | 'destructive' | 'success' | 'info';
}

export const Badge: React.FC<BadgeProps> = ({
    children,
    className = "",
    noMargin = false,
    variant = 'brand'
}) => {

    const variants = {
        brand: {
            container: "bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 border-pink-100 dark:border-pink-800",
            dot: "bg-pink-500"
        },
        destructive: {
            container: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-800",
            dot: "bg-red-500"
        },
        success: {
            container: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800",
            dot: "bg-emerald-500"
        },
        info: {
            container: "bg-blue-50 dark:bg-blue-900/20 text-brand-blue dark:text-blue-400 border-blue-100 dark:border-blue-800",
            dot: "bg-brand-blue"
        }
    };

    return (
        <span className={`
            inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border transition-colors
            ${variants[variant].container}
            ${noMargin ? '' : 'mb-6'} 
            ${className}
        `}>
            <span className={`w-2 h-2 rounded-full mr-2 animate-pulse ${variants[variant].dot}`}></span>
            {children}
        </span>
    );
};