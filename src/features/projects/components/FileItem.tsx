import { Download } from 'lucide-react';

interface FileItemProps {
    nombre: string;
    onDownload: () => void;
}

export const FileItem = ({ nombre, onDownload }: FileItemProps) => (
    <div
        onClick={onDownload}
        className="cursor-pointer flex items-center justify-between p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl group hover:border-brand-blue transition-all"
    >
        <div className="flex items-center gap-3 overflow-hidden">
            <div className="min-w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500">
                <Download size={16} />
            </div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate pr-2">
                {nombre}
            </span>
        </div>
        <Download size={18} className="p-0.5 text-slate-400 group-hover:text-brand-blue transition-colors" />
    </div>
);