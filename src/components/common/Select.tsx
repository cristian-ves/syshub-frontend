import React from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
    id: number | string;
    nombre: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: Option[];
    error?: string;
}

export const Select: React.FC<SelectProps> = ({ label, options, error, ...props }) => {
    return (
        <div className="w-full text-left">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">
                {label}
            </label>

            <div className="relative">
                <select
                    {...props}
                    className={`
            w-full px-4 py-3 rounded-xl border transition-all outline-none appearance-none
            bg-white dark:bg-slate-800 text-slate-900 dark:text-white cursor-pointer
            ${error
                            ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                            : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue'}
          `}
                >
                    {options.map((opt) => (
                        <option key={opt.id} value={opt.id} className="bg-white dark:bg-slate-800">
                            {opt.nombre}
                        </option>
                    ))}
                </select>

                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <ChevronDown size={20} strokeWidth={2.5} />
                </div>
            </div>

            {error && <p className="mt-1 text-xs text-red-500 ml-1">{error}</p>}
        </div>
    );
};