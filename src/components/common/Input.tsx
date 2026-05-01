import { forwardRef, useState, type InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
    ({ label, error, type, className = '', ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const isPassword = type === 'password';

        return (
            <div className="w-full text-left">
                {label && (
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">
                        {label}
                    </label>
                )}

                <div className="relative">
                    <input
                        {...props}
                        ref={ref}
                        type={isPassword ? (showPassword ? 'text' : 'password') : type}
                        className={`
                            w-full px-4 py-3 rounded-xl border transition-all outline-none
                            bg-white dark:bg-slate-800 text-slate-900 dark:text-white
                            ${error
                                ? 'border-red-500 focus:ring-red-200'
                                : 'border-slate-200 dark:border-slate-700 focus:ring-brand-blue/20 focus:border-brand-blue'}
                            ${className}
                        `}
                    />

                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            tabIndex={-1}
                            className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 z-10"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    )}
                </div>

                {error && (
                    <p className="mt-1 text-xs text-red-500 ml-1 font-medium">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';