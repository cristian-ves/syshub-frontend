import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import api from "../../../../api/axios.config";

interface Props {
    onSelect: (course: any) => void;
    error?: string;
}

export const CourseSearchInput: React.FC<Props> = ({ onSelect, error }) => {
    const [query, setQuery] = useState("");
    const [courses, setCourses] = useState<any[]>([]);
    const [open, setOpen] = useState(false);

    const searchCourses = async (value: string) => {
        setQuery(value);

        if (value.length < 2) {
            setCourses([]);
            return;
        }

        const { data } = await api.get("/catalog/courses/search", {
            params: { q: value },
        });

        setCourses(data);
        setOpen(true);
    };

    return (
        <div className="w-full text-left relative">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">
                Curso
            </label>

            <div className="relative">
                <input
                    value={query}
                    onChange={(e) => searchCourses(e.target.value)}
                    placeholder="Buscar curso (Ej. Estructura de Datos)"
                    className={`
                        w-full px-4 py-3 rounded-xl border outline-none transition-all
                        bg-white dark:bg-slate-800 text-slate-900 dark:text-white
                        ${error ? "border-red-500" : "border-slate-200 dark:border-slate-700"}
                    `}
                />

                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    {open ? <ChevronDown size={18} /> : <Search size={18} />}
                </div>
            </div>

            {open && courses.length > 0 && (
                <div className="absolute z-20 mt-2 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg max-h-48 overflow-y-auto custom-scrollbar">
                    {courses.map((c) => (
                        <div
                            key={c.id}
                            onClick={() => {
                                setQuery(`${c.nombre} (${c.codigo})`);
                                setOpen(false);
                                onSelect(c);
                            }}
                            className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-sm"
                        >
                            {c.nombre} ({c.codigo}) - {c.pensumNombre}
                        </div>
                    ))}
                </div>
            )}

            {error && (
                <p className="mt-1 text-xs text-red-500 ml-1 font-medium">
                    {error}
                </p>
            )}
        </div>
    );
};