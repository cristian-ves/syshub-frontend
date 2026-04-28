import React from 'react';
import { XCircle, X } from 'lucide-react';

interface ErrorModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message: string;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onClose, title = "¡Hubo un problema!", message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full text-red-600 dark:text-red-400">
                            <XCircle size={28} />
                        </div>
                        <button onClick={onClose} className="cursor-pointer p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{message}</p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:opacity-90 transition-opacity cursor-pointer"
                    >
                        Entendido
                    </button>
                </div>
            </div>
        </div>
    );
};