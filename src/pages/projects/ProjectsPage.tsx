import React, { useEffect, useState, useCallback } from 'react';
import { Search, Filter, Rocket } from 'lucide-react';
import { toast } from 'sonner';

import { useAppSelector } from '../../store';
import type { PaginatedResponse, Project } from '../../types/project.types';
import { projectService } from '../../features/projects/services/project.service';
import { Badge, Button } from '../../components/common';
import { ProjectCard } from '../../features/projects/components/ProjectCard';
import { ProjectModal } from '../../features/projects/components/ProjectModal';


export const ProjectsPage: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const fetchProjects = useCallback(async (page: number) => {
        try {
            setLoading(true);
            const data: PaginatedResponse<Project> = await projectService.getProjects({
                page,
                size: 8
            });

            setProjects(data.content);
            setTotalPages(data.totalPages);
            setCurrentPage(data.number);
        } catch (error) {
            toast.error("No se pudieron cargar los proyectos");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProjects(0);
    }, [fetchProjects]);

    const handleOpenModal = (project: Project) => {
        setSelectedProject(project);
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

            {loading ? (
                <div className="flex-grow flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
                </div>
            ) : projects.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onClick={handleOpenModal}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-center py-20">
                    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-full mb-6">
                        <Search size={40} className="text-slate-400" />
                    </div>
                    <h3 className="text-xl font-bold dark:text-white">No se encontraron proyectos</h3>
                    <p className="text-slate-500 mt-2">Prueba cambiando los términos de búsqueda o filtros.</p>
                </div>
            )}

            {totalPages > 1 && (
                <div className="mt-12 flex justify-center gap-2">
                    <Button
                        variant="ghost"
                        disabled={currentPage === 0}
                        onClick={() => fetchProjects(currentPage - 1)}
                    >
                        Anterior
                    </Button>
                    <div className="flex items-center px-4 font-bold text-slate-600 dark:text-slate-400">
                        {currentPage + 1} / {totalPages}
                    </div>
                    <Button
                        variant="ghost"
                        disabled={currentPage + 1 === totalPages}
                        onClick={() => fetchProjects(currentPage + 1)}
                    >
                        Siguiente
                    </Button>
                </div>
            )}

            <ProjectModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                canToggleDestacado={user?.role === 'ROLE_AUXILIAR'}
            />
        </div>
    );
};