import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { toggleDarkMode } from '../../store/slices/uiSlice';

export const ThemeToggle: React.FC = () => {
    const dispatch = useAppDispatch();
    const { darkMode } = useAppSelector((state) => state.ui);

    return (
        /**
         * Reusable toggle switch with smooth transitions
         */
        <button
            onClick={() => dispatch(toggleDarkMode())}
            className="relative inline-flex h-10 w-20 items-center rounded-full bg-slate-200 dark:bg-slate-800 transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            aria-label="Toggle theme"
        >
            <span
                className={`${darkMode ? 'translate-x-11' : 'translate-x-1'
                    } inline-flex h-8 w-8 transform items-center justify-center rounded-full bg-white dark:bg-slate-950 shadow-sm transition-transform duration-300 ease-in-out`}
            >
                {darkMode ? (
                    <Moon className="h-5 w-5 text-blue-400" />
                ) : (
                    <Sun className="h-5 w-5 text-amber-500" />
                )}
            </span>

            <div className="absolute flex w-full justify-between px-2 text-slate-400 pointer-events-none">
                <Sun className={`h-4 w-4 ${darkMode ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
                <Moon className={`h-4 w-4 ${!darkMode ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
            </div>
        </button>
    );
};
