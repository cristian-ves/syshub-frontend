import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: any[];
    error?: string;
    placeholder?: string;
    valueKey?: string;
    labelKey?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
    label,
    options,
    error,
    placeholder = "Seleccionar...",
    valueKey = "id",
    labelKey = "nombre",
    className = "",
    ...props
}, ref) => {
    const hasValue = props.value && props.value !== "";

    return (
        <div className="w-full text-left">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 ml-1 italic opacity-80">
                {label}
            </label>
            <div className="relative group">
                <select
                    {...props}
                    ref={ref}
                    className={`
                        w-full px-4 py-3 rounded-xl border transition-all outline-none appearance-none 
                        bg-white dark:bg-slate-800 text-slate-900 dark:text-white cursor-pointer
                        ${hasValue
                            ? 'border-brand-blue ring-2 ring-brand-blue/5'
                            : 'border-slate-200 dark:border-slate-700'}
                        ${error ? 'border-red-500' : 'group-hover:border-slate-400'}
                        ${props.disabled ? 'opacity-50 cursor-not-allowed bg-slate-50 dark:bg-slate-900' : ''}
                        ${className}
                    `}
                >
                    <option value="">{placeholder}</option>
                    {options.map((opt: any) => (
                        <option key={opt[valueKey]} value={opt[valueKey]}>
                            {opt[labelKey]}
                        </option>
                    ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-brand-blue transition-colors">
                    <ChevronDown size={18} />
                </div>
            </div>
            {error && <p className="mt-1 text-xs text-red-500 ml-1 font-medium">{error}</p>}
        </div>
    );
});

Select.displayName = 'Select';