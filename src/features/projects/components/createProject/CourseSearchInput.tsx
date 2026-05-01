import { useState, useRef, useEffect } from "react";
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

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const searchCourses = async (value: string) => {
        setQuery(value);

        if (value.length < 2) {
            setCourses([]);
            setOpen(false);
            return;
        }

        try {
            const { data } = await api.get("/catalog/courses/search", {
                params: { q: value },
            });
            setCourses(data);
            setOpen(data.length > 0);
        } catch (err) {
            console.error("Error buscando cursos:", err);
        }
    };

    return (
        <div ref={containerRef} className="w-full text-left relative">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">
                Curso
            </label>

            <div className="relative">
                <input
                    value={query}
                    onChange={(e) => searchCourses(e.target.value)}
                    onFocus={() => courses.length > 0 && setOpen(true)}
                    placeholder="Buscar curso (Ej. Estructura de Datos)"
                    className={`
                        w-full px-4 py-3 rounded-xl border outline-none transition-all
                        bg-white dark:bg-slate-800 text-slate-900 dark:text-white
                        ${error ? "border-red-500 shadow-sm shadow-red-100" : "border-slate-200 dark:border-slate-700 focus:border-brand-blue"}
                    `}
                />

                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    {open ? <ChevronDown size={18} /> : <Search size={18} />}
                </div>
            </div>

            {open && courses.length > 0 && (
                <div className="absolute z-20 mt-2 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl max-h-48 overflow-y-auto custom-scrollbar animate-in fade-in zoom-in-95 duration-200">
                    {courses.map((c) => (
                        <div
                            key={c.id}
                            onClick={() => {
                                setQuery(`${c.nombre} (${c.codigo})`);
                                setOpen(false);
                                onSelect(c);
                            }}
                            className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer text-sm border-b last:border-none border-slate-50 dark:border-slate-800 transition-colors"
                        >
                            <p className="font-semibold text-slate-900 dark:text-white">
                                {c.nombre} <span className="text-slate-400 font-normal">({c.codigo})</span>
                            </p>
                            <p className="text-xs text-slate-500 italic mt-0.5">
                                {c.pensumNombre}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {error && (
                <p className="mt-1.5 text-xs text-red-500 ml-1 font-medium flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full inline-block"></span>
                    {error}
                </p>
            )}
        </div>
    );
};