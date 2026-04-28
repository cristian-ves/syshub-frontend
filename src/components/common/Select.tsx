import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

export const Select = forwardRef<HTMLSelectElement, any>(({ label, options, error, ...props }, ref) => {
    return (
        <div className="w-full text-left">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">{label}</label>
            <div className="relative">
                <select
                    {...props}
                    ref={ref}
                    className={`w-full px-4 py-3 rounded-xl border transition-all outline-none appearance-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white cursor-pointer ${error ? 'border-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-brand-blue/20'}`}
                >
                    {options.map((opt: any) => (
                        <option key={opt.id} value={opt.id}>{opt.nombre}</option>
                    ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <ChevronDown size={20} />
                </div>
            </div>
            {error && <p className="mt-1 text-xs text-red-500 ml-1 font-medium">{error}</p>}
        </div>
    );
});

Select.displayName = 'Select';