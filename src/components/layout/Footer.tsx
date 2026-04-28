import React from 'react';
import logo from '../../assets/logo.svg';

const Footer: React.FC = () => {
    return (
        <footer className="py-10 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 transition-colors">
            <div className="max-w-7xl mx-auto px-12 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-3">
                    <img src={logo} alt="syshub logo" className="h-6 w-auto" />
                    <span className="font-bold text-slate-950 dark:text-white">syshub</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                    &copy; {new Date().getFullYear()} Facultad de Ingeniería. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
};

export default Footer;