import React, { useEffect, useState } from 'react';
import { Search, Heart, X, Settings2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { articleSlice } from '../../../store/slices/articleSlice';
import { Select } from '../../../components/common/Select';
import { Button } from '../../../components/common/Button';
import { CourseSearchInput } from '../../projects/components';
import { useNavigate } from 'react-router-dom';


type ArticleSearchMode = 'search' | 'tag';

export const ArticleFilters: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { filters } = useAppSelector(state => state.articles);
    const { user } = useAppSelector(state => state.auth);
    const { setArticleFilters, resetArticleFilters } = articleSlice.actions;

    const [showAdvanced, setShowAdvanced] = useState(false);
    const [searchMode, setSearchMode] = useState<ArticleSearchMode>('search');
    const [localSearch, setLocalSearch] = useState('');

    // Debounce search logic
    useEffect(() => {
        const timer = setTimeout(() => {
            if (localSearch !== (filters[searchMode] || '')) {
                const searchUpdate: any = {
                    search: undefined,
                    tag: undefined,
                    page: 0
                };
                if (localSearch) searchUpdate[searchMode] = localSearch;
                dispatch(setArticleFilters(searchUpdate));
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [localSearch, searchMode, dispatch, filters]);

    const activeFiltersCount = [filters.courseId, filters.status].filter(Boolean).length;

    return (
        <div className="w-full space-y-4 mb-10">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow flex items-center">
                    <Search className="absolute left-4 text-slate-400 pointer-events-none" size={20} />
                    <input
                        type="text"
                        placeholder={`Buscar artículos por ${searchMode === 'search' ? 'título o extracto' : 'etiqueta'}...`}
                        className="w-full pl-12 pr-32 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:border-brand-blue transition-all font-medium dark:text-white shadow-sm"
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                    />

                    <div className="absolute right-2 flex items-center border-l border-slate-100 dark:border-slate-800 pl-2">
                        <select
                            value={searchMode}
                            onChange={(e) => {
                                setSearchMode(e.target.value as ArticleSearchMode);
                                setLocalSearch('');
                            }}
                            className="bg-transparent text-[10px] font-black uppercase tracking-widest text-slate-400 outline-none cursor-pointer p-2 hover:text-brand-blue transition-colors"
                        >
                            <option value="search">General</option>
                            <option value="tag">Tag</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-2">

                    {user && (
                        <Button
                            variant="ghost"
                            onClick={() => {
                                navigate('/profile/favorites');
                            }}
                            className="border border-slate-200 dark:border-slate-800 rounded-2xl px-6 gap-2 hover:bg-red-50 hover:text-red-500 transition-all"
                        >
                            <Heart size={18} className="text-red-500" />
                            <span className="hidden sm:inline">Favoritos</span>
                        </Button>
                    )}

                    <Button
                        variant="secondary"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className={`rounded-2xl px-4 relative ${showAdvanced ? 'border-brand-blue text-brand-blue' : ''}`}
                    >
                        <Settings2 size={20} />
                        {activeFiltersCount > 0 && !showAdvanced && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-blue text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                                {activeFiltersCount}
                            </span>
                        )}
                    </Button>
                </div>
            </div>

            {showAdvanced && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-200">

                    <div className="flex flex-col">
                        <CourseSearchInput
                            onSelect={(course) => dispatch(setArticleFilters({ courseId: course.id, page: 0 }))}
                        />
                    </div>

                    {(user?.role === 'ROLE_AUXILIAR' || user?.role === 'ROLE_ADMIN') ? (
                        <Select
                            label="Estado del Contenido"
                            options={[
                                { id: 'PUBLISHED', nombre: 'Publicado' },
                                { id: 'DRAFT', nombre: 'Borrador' }
                            ]}
                            labelKey="nombre"
                            valueKey="id"
                            value={filters.status || ""}
                            onChange={(e) => dispatch(setArticleFilters({ status: e.target.value as any || undefined }))}
                        />
                    ) : (
                        <div className="flex items-end pb-2">
                            <p className="text-xs text-slate-400 italic">Filtrando solo material verificado por auxiliares.</p>
                        </div>
                    )}

                    <div className="md:col-span-2 flex justify-end pt-2">
                        <button
                            onClick={() => { dispatch(resetArticleFilters()); setLocalSearch(''); }}
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