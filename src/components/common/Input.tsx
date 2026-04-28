import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, type, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="w-full text-left">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">
                {label}
            </label>
            <div className="relative">
                <input
                    {...props}
                    type={isPassword ? (showPassword ? 'text' : 'password') : type}
                    className={`
            w-full px-4 py-3 rounded-xl border transition-all outline-none
            bg-white dark:bg-slate-800 text-slate-900 dark:text-white
            ${error
                            ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                            : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue'}
          `}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer z-10"
                        tabIndex={-1}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                )}
            </div>
            {error && <p className="mt-1 text-xs text-red-500 ml-1">{error}</p>}
        </div>
    );
};