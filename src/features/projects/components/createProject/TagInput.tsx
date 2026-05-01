import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { X, Plus } from "lucide-react";
import { Button } from "../../../../components/common";

interface Tag {
    nombre: string;
    color: string;
}

interface Props {
    value: Tag[];
    onChange: (tags: Tag[]) => void;
    error?: string;
}

export const TagInput: React.FC<Props> = ({ value, onChange, error }) => {
    const [name, setName] = useState("");
    const [color, setColor] = useState("#64748b");
    const [showPicker, setShowPicker] = useState(false);

    const addTag = () => {
        const trimmed = name.trim();
        if (!trimmed) return;

        const exists = value.some(
            (t) => t.nombre.toLowerCase() === trimmed.toLowerCase()
        );
        if (exists) {
            setName("");
            return;
        }

        onChange([...value, { nombre: trimmed, color }]);
        setName("");
        setShowPicker(false);
    };

    const removeTag = (index: number) => {
        const newTags = [...value];
        newTags.splice(index, 1);
        onChange(newTags);
    };

    return (
        <div className="space-y-3 relative">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Tags
            </label>

            <div className="flex gap-2">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. React, Compiladores..."
                    className="flex-1 px-4 py-3 rounded-xl border transition-all outline-none 
                    bg-white dark:bg-slate-800 text-slate-900 dark:text-white
                    border-slate-200 dark:border-slate-700 
                    focus:ring-brand-blue/20 focus:border-brand-blue"
                />

                <button
                    type="button"
                    onClick={() => setShowPicker(!showPicker)}
                    className="cursor-pointer w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700"
                    style={{ background: color }}
                />

                <Button type="button" onClick={addTag}>
                    <Plus size={16} />
                </Button>
            </div>

            {showPicker && (
                <div className="absolute z-30 mt-2 p-3 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-medium text-slate-500">
                            Seleccionar color
                        </span>
                        <button
                            type="button"
                            onClick={() => setShowPicker(false)}
                            className="text-slate-400 hover:text-slate-700 cursor-pointer"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    <HexColorPicker color={color} onChange={setColor} />
                </div>
            )}

            <p className="text-xs text-slate-500">
                Si la tag ya existe, se usará el color original.
            </p>

            <div className="flex flex-wrap gap-2">
                {value.map((tag, i) => (
                    <span
                        key={i}
                        style={{ background: tag.color }}
                        className="px-3 py-1 rounded-full text-white text-xs flex items-center gap-2"
                    >
                        {tag.nombre}
                        <button type="button" onClick={() => removeTag(i)} className="cursor-pointer">
                            <X size={14} />
                        </button>
                    </span>
                ))}
            </div>
            {error && (
                <p className="mt-1 text-xs text-red-500 ml-1 font-medium">
                    {error}
                </p>
            )}
        </div>
    );
};