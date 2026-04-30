import React, { useEffect, useState } from 'react';
import { Search, Star, X, Settings2, Filter } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { projectSlice } from '../../../store/slices/projectSlice';
import { Select } from '../../../components/common/Select';
import { Button } from '../../../components/common/Button';
import { catalogService } from '../services/catalog.service';

type SearchMode = 'search' | 'tag' | 'cursoNombre';

export const ProjectFilters: React.FC = () => {
    const dispatch = useAppDispatch();
    const { filters } = useAppSelector(state => state.projects);
    const { setFilters, resetFilters } = projectSlice.actions;

    // UI States
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [searchMode, setSearchMode] = useState<SearchMode>('search');
    const [localSearch, setLocalSearch] = useState('');

    // Catalog States
    const [catalogs, setCatalogs] = useState({ pensums: [], areas: [], semesters: [] });

    // Load catalogs
    useEffect(() => {
        const fetchBase = async () => {
            const [pensums, areas] = await Promise.all([catalogService.getPensums(), catalogService.getAreas()]);
            setCatalogs(prev => ({ ...prev, pensums, areas }));
        };
        fetchBase();
    }, []);

    // Load semesters when pensum changes
    useEffect(() => {
        if (filters.pensumId) {
            catalogService.getSemesters(filters.pensumId).then(s =>
                setCatalogs(prev => ({ ...prev, semesters: s }))
            );
        } else {
            setCatalogs(prev => ({ ...prev, semesters: [] }));
        }
    }, [filters.pensumId]);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            // Verificamos si el valor local es diferente al del store para evitar peticiones infinitas
            if (localSearch !== (filters[searchMode] || '')) {
                const searchUpdate: any = {
                    search: undefined,
                    tag: undefined,
                    cursoNombre: undefined,
                    page: 0
                };
                if (localSearch) searchUpdate[searchMode] = localSearch;
                dispatch(setFilters(searchUpdate));
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [localSearch, searchMode, dispatch, setFilters, filters]);

    const handlePensumChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = Number(e.target.value) || undefined;
        dispatch(setFilters({
            pensumId: val,
            semestreNum: undefined
        }));
    };

    const activeFiltersCount = [filters.pensumId, filters.semestreNum, filters.areaId].filter(Boolean).length;

    return (
        <div className="w-full space-y-4 mb-10">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow flex items-center">
                    <Search className="absolute left-4 text-slate-400 pointer-events-none" size={20} />
                    <input
                        type="text"
                        placeholder={`Buscar por ${searchMode === 'search' ? 'título/descripción' : searchMode === 'tag' ? 'etiqueta' : 'nombre de curso'}...`}
                        className="w-full pl-12 pr-36 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:border-brand-blue transition-all font-medium dark:text-white"
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                    />

                    <div className="absolute right-2 flex items-center border-l border-slate-100 dark:border-slate-800 pl-2">
                        <select
                            value={searchMode}
                            onChange={(e) => {
                                setSearchMode(e.target.value as SearchMode);
                                setLocalSearch('');
                            }}
                            className="bg-transparent text-[10px] font-black uppercase tracking-widest text-slate-400 outline-none cursor-pointer p-2 hover:text-brand-blue transition-colors"
                        >
                            <option value="search">Título</option>
                            <option value="tag">Tag</option>
                            <option value="cursoNombre">Curso</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant={filters.destacado ? 'primary' : 'ghost'}
                        onClick={() => dispatch(setFilters({ destacado: filters.destacado ? undefined : true }))}
                        className={`border border-slate-200 dark:border-slate-800 rounded-2xl px-6 gap-2 ${filters.destacado ? 'bg-brand-blue text-white' : ''}`}
                    >
                        <Star size={18} fill={filters.destacado ? "currentColor" : "none"} />
                        <span className="hidden sm:inline">Destacados</span>
                    </Button>

                    <Button
                        variant="secondary"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className={`rounded-2xl px-4 relative ${showAdvanced ? 'border-brand-blue text-brand-blue' : ''}`}
                    >
                        <Settings2 size={20} />
                        {activeFiltersCount > 0 && !showAdvanced && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-pink text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                                {activeFiltersCount}
                            </span>
                        )}
                    </Button>
                </div>
            </div>

            {showAdvanced && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                    <Select
                        label="Plan de Estudios"
                        options={catalogs.pensums}
                        value={filters.pensumId || ""}
                        onChange={handlePensumChange}
                    />

                    <Select
                        label="Semestre"
                        options={catalogs.semesters}
                        labelKey="numero"
                        disabled={!filters.pensumId}
                        placeholder={!filters.pensumId ? "Selecciona Pensum" : "Todos los semestres"}
                        value={filters.semestreNum || ""}
                        onChange={(e) => dispatch(setFilters({ semestreNum: Number(e.target.value) || undefined }))}
                    />

                    <Select
                        label="Área Técnica"
                        options={catalogs.areas}
                        value={filters.areaId || ""}
                        onChange={(e) => dispatch(setFilters({ areaId: Number(e.target.value) || undefined }))}
                    />

                    <div className="md:col-span-3 flex justify-end pt-2">
                        <button
                            onClick={() => { dispatch(resetFilters()); setLocalSearch(''); }}
                            className="cursor-pointer text-[10px] font-black text-slate-400 hover:text-brand-pink flex items-center gap-1 uppercase tracking-widest transition-all"
                        >
                            <X size={14} /> Limpiar Filtros
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};