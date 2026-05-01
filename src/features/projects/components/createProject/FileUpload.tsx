import { useRef, useState } from "react";
import { Upload, X, FileText } from "lucide-react";
import { toast } from "sonner";

interface Props {
    value: File[];
    onChange: (files: File[]) => void;
    error?: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_TOTAL_SIZE = 15 * 1024 * 1024; // 15MB

export const FileUpload: React.FC<Props> = ({ value, onChange, error }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFiles = (files: FileList | null) => {
        if (!files) return;

        const newFiles: File[] = [];
        const rejected: string[] = [];

        Array.from(files).forEach((file) => {
            if (file.size > MAX_FILE_SIZE) {
                rejected.push(file.name);
                return;
            }
            newFiles.push(file);
        });

        if (rejected.length > 0) {
            toast.error(
                rejected.length === 1
                    ? `"${rejected[0]}" supera el tamaño máximo de 5MB`
                    : `${rejected.length} archivos superan el tamaño máximo de 5MB`
            );
        }

        const totalSize =
            [...value, ...newFiles].reduce((acc, file) => acc + file.size, 0);

        if (totalSize > MAX_TOTAL_SIZE) {
            toast.error("El tamaño total de los archivos no puede superar 15MB");
            return;
        }

        if (newFiles.length > 0) {
            onChange([...value, ...newFiles]);
        }
    };

    const removeFile = (index: number) => {
        const updated = [...value];
        updated.splice(index, 1);
        onChange(updated);
    };

    const formatSize = (size: number) => {
        if (size < 1024) return `${size} B`;
        if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
        return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    };

    return (
        <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Archivos
            </label>

            {/* 📦 Drop zone */}
            <div
                onClick={() => inputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                    border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all
                    ${isDragging
                        ? "border-brand-blue bg-blue-50/40 dark:bg-blue-900/10"
                        : error
                            ? "border-red-500"
                            : "border-slate-300 dark:border-slate-700 hover:border-brand-blue"}
                `}
            >
                <Upload
                    className={`mx-auto mb-2 ${isDragging ? "text-brand-blue" : "text-slate-400"}`}
                    size={28}
                />

                <p className="text-sm text-slate-600 dark:text-slate-400">
                    {isDragging
                        ? "Suelta los archivos aquí"
                        : "Arrastra archivos o haz click"}
                </p>

                <p className="text-xs text-slate-400 mt-1">
                    Máximo 5MB por archivo
                </p>
            </div>

            <input
                type="file"
                multiple
                ref={inputRef}
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
            />

            {/* 📄 Preview */}
            {value.length > 0 && (
                <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                    {value.map((file, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                        >
                            <div className="flex items-center gap-3 overflow-hidden">
                                <FileText size={18} className="text-slate-400" />
                                <div className="truncate">
                                    <p className="text-sm font-medium truncate">
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {formatSize(file.size)}
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => removeFile(i)}
                                className="text-slate-400 hover:text-red-500"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {error && (
                <p className="text-xs text-red-500 ml-1 font-medium">
                    {error}
                </p>
            )}
        </div>
    );
};