import React, { useEffect, useState } from 'react';
import { Search, Filter, Rocket } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '../../store';
import { fetchProjects } from '../../store/slices/projectSlice';
import { Badge, Button } from '../../components/common';
import { Pagination, ProjectCard, ProjectModal } from '../../features/projects/components';

export const ProjectsPage: React.FC = () => {
    const dispatch = useAppDispatch();

    const { user } = useAppSelector((state) => state.auth);
    const { projects, loading, totalPages, currentPage } = useAppSelector((state) => state.projects);

    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const selectedProject = projects.find(p => p.id === selectedProjectId) || null;

    useEffect(() => {
        dispatch(fetchProjects({ page: 0, size: 8 }));
    }, [dispatch]);

    const handlePageChange = (newPage: number) => {
        dispatch(fetchProjects({ page: newPage, size: 8 }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleOpenModal = (project: any) => {
        setSelectedProjectId(project.id);
        setIsModalOpen(true);
    };

    return (
        <div className="flex-grow flex flex-col w-full max-w-6xl mx-auto px-6 md:px-12 py-10">

            <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-2xl">
                    <Badge>Explorador de Repositorios</Badge>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white mt-4 leading-tight">
                        Descubre soluciones de <br />
                        la comunidad <span className="text-brand-blue">SysHub</span>
                    </h1>
                </div>

                <Button className="gap-2 shadow-lg shadow-brand-blue/20">
                    <Rocket size={18} />
                    Subir Proyecto
                </Button>
            </header>

            <div className="flex flex-col md:flex-row gap-4 mb-10">
                <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por título, tag o curso..."
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue transition-all font-medium dark:text-white"
                    />
                </div>
                <Button variant="ghost" className="border border-slate-200 dark:border-slate-800 rounded-2xl px-6 gap-2">
                    <Filter size={18} />
                    Filtros
                </Button>
            </div>

            <div className="relative flex-grow flex flex-col">

                {loading && projects.length === 0 ? (
                    <div className="flex-grow flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
                    </div>
                ) : projects.length > 0 ? (
                    <>
                        {loading && (
                            <div className="absolute inset-0 z-10 flex justify-center pt-20 bg-white/10 dark:bg-slate-950/10 backdrop-blur-[1px]">
                                <div className="w-10 h-10 border-4 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin" />
                            </div>
                        )}

                        <div className={`transition-all duration-300 ${loading ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                {projects.map((project) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        onClick={handleOpenModal}
                                    />
                                ))}
                            </div>

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                isLoading={loading}
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex-grow flex flex-col items-center justify-center text-center py-20">
                        <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-full mb-6">
                            <Search size={40} className="text-slate-400" />
                        </div>
                        <h3 className="text-xl font-bold dark:text-white">No se encontraron proyectos</h3>
                        <p className="text-slate-500 mt-2">Prueba cambiando los términos de búsqueda o filtros.</p>
                    </div>
                )}
            </div>

            <ProjectModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                canToggleDestacado={user?.role === 'ROLE_AUXILIAR' || user?.role === 'ROLE_ADMIN'}
            />
        </div>
    );
};