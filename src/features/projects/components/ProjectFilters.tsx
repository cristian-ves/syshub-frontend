import React, { useEffect, useState } from 'react';
import { Search, Star, X, Settings2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { projectSlice } from '../../../store/slices/projectSlice';
import { Select } from '../../../components/common/Select';
import { Button } from '../../../components/common/Button';
import { catalogService } from '../services/catalog.service';

type SearchMode = 'search' | 'tag' | 'courseName';

export const ProjectFilters: React.FC = () => {
    const dispatch = useAppDispatch();
    const { filters } = useAppSelector(state => state.projects);
    const { setFilters, resetFilters } = projectSlice.actions;

    // UI States
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [searchMode, setSearchMode] = useState<SearchMode>('search');
    const [localSearch, setLocalSearch] = useState('');

    // Catalog States
    const [catalogs, setCatalogs] = useState({ studyPlans: [], areas: [], semesters: [] });

    // Load catalogs
    useEffect(() => {
        const fetchBase = async () => {
            const [pensums, areas] = await Promise.all([catalogService.getStudyPlans(), catalogService.getAreas()]);
            setCatalogs(prev => ({ ...prev, studyPlans: pensums, areas }));
        };
        fetchBase();
    }, []);

    // Load semesters when pensum changes
    useEffect(() => {
        if (filters.studyPlanId) {
            catalogService.getSemesters(filters.studyPlanId).then(s =>
                setCatalogs(prev => ({ ...prev, semesters: s }))
            );
        } else {
            setCatalogs(prev => ({ ...prev, semesters: [] }));
        }
    }, [filters.studyPlanId]);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            // Verify if local value it's diferrent than the store one to avoid infinite loops
            if (localSearch !== (filters[searchMode] || '')) {
                const searchUpdate: any = {
                    search: undefined,
                    tag: undefined,
                    courseName: undefined,
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
            studyPlanId: val,
            semesterNum: undefined
        }));
    };

    const activeFiltersCount = [filters.studyPlanId, filters.semesterNum, filters.areaId].filter(Boolean).length;

    return (
        <div className="w-full space-y-4 mb-10">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative grow flex items-center">
                    <Search className="absolute left-4 text-slate-400 pointer-events-none" size={20} />
                    <input
                        type="text"
                        placeholder={`Search by ${searchMode === 'search' ? 'title/description' : searchMode === 'tag' ? 'tag' : 'course name'}...`}
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
                            <option value="search">Title</option>
                            <option value="tag">Tag</option>
                            <option value="courseName">Course</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant={filters.featured ? 'primary' : 'ghost'}
                        onClick={() => dispatch(setFilters({ featured: filters.featured ? undefined : true }))}
                        className={`border border-slate-200 dark:border-slate-800 rounded-2xl px-6 gap-2 ${filters.featured ? 'bg-brand-blue text-white' : ''}`}
                    >
                        <Star size={18} fill={filters.featured ? "currentColor" : "none"} />
                        <span className="hidden sm:inline">Featured</span>
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
                        label="Study plan"
                        labelKey='name'
                        options={catalogs.studyPlans}
                        value={filters.studyPlanId || ""}
                        onChange={handlePensumChange}
                    />

                    <Select
                        label="Semester"
                        options={catalogs.semesters}
                        labelKey="number"
                        disabled={!filters.studyPlanId}
                        placeholder={!filters.studyPlanId ? "Choose a study plan" : "All semesters"}
                        value={filters.semesterNum || ""}
                        onChange={(e) => dispatch(setFilters({ semesterNum: Number(e.target.value) || undefined }))}
                    />

                    <Select
                        label="Technical area"
                        labelKey='name'
                        options={catalogs.areas}
                        value={filters.areaId || ""}
                        onChange={(e) => dispatch(setFilters({ areaId: Number(e.target.value) || undefined }))}
                    />

                    <div className="md:col-span-3 flex justify-end pt-2">
                        <button
                            onClick={() => { dispatch(resetFilters()); setLocalSearch(''); }}
                            className="cursor-pointer text-[10px] font-black text-slate-400 hover:text-brand-pink flex items-center gap-1 uppercase tracking-widest transition-all"
                        >
                            <X size={14} /> Clear filters
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};