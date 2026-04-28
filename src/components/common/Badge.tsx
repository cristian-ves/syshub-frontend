import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ children }) => {
    return (
        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 text-xs font-bold uppercase tracking-widest mb-6 border border-pink-100 dark:border-pink-800">
            <span className="w-2 h-2 rounded-full bg-pink-500 mr-2 animate-pulse"></span>
            {children}
        </span>
    );
};

export default Badge;