import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { Button } from './Button';

interface ConfirmDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    isDeleting?: boolean;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
    isOpen, onClose, onConfirm, title, description, isDeleting
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity"
                onClick={!isDeleting ? onClose : undefined}
            />

            <div className="relative bg-white dark:bg-slate-900 w-full max-w-md overflow-hidden rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in duration-300">

                <header className="h-24 bg-red-500 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
                    <button
                        onClick={onClose}
                        disabled={isDeleting}
                        className="cursor-pointer absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full transition-colors z-10 disabled:opacity-50"
                    >
                        <X size={20} />
                    </button>
                    <AlertTriangle size={48} className="text-white relative z-10 opacity-90 drop-shadow-md" />
                </header>

                <div className="p-8 text-center">
                    <h3 className="text-2xl font-black text-slate-950 dark:text-white mb-3">
                        {title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-8 leading-relaxed">
                        {description}
                    </p>

                    <div className="flex items-center gap-3 w-full">
                        <Button
                            variant="ghost"
                            onClick={onClose}
                            disabled={isDeleting}
                            className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-none"
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={onConfirm}
                            isLoading={isDeleting}
                            className="w-full bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30 text-white border-none"
                        >
                            Sí, Eliminar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};