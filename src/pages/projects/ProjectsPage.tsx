import React from "react";
import { Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../store";
import { Badge, Button } from "../../components/common";
import {
    ProjectFilters,
    ProjectList,
} from "../../features/projects/components";
import { useProjects } from "../../hooks/useProjects";

export const ProjectsPage: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.auth);

    const {
        projects,
        loading,
        totalPages,
        currentPage,
        setFilters,
    } = useProjects();

    return (
        <div className="flex-grow flex flex-col w-full max-w-6xl mx-auto px-6 md:px-12 py-10">
            <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-2xl">
                    <Badge>Explorador de Repositorios</Badge>

                    <h1 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white mt-4 leading-tight">
                        Descubre soluciones de <br />
                        la comunidad{" "}
                        <span className="text-brand-blue">SysHub</span>
                    </h1>
                </div>

                <Button
                    className="gap-2 shadow-lg shadow-brand-blue/20"
                    onClick={() => navigate("/projects/create")}
                >
                    <Rocket size={18} />
                    Subir Proyecto
                </Button>
            </header>

            <ProjectFilters />

            <div className="flex-grow mt-8">
                <ProjectList
                    projects={projects}
                    loading={loading}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setFilters({ page })}
                    canToggleDestacado={
                        user?.role === "ROLE_AUXILIAR" ||
                        user?.role === "ROLE_ADMIN"
                    }
                    emptyTitle="No se encontraron proyectos"
                    emptySubtitle="Prueba ajustando los filtros o el término de búsqueda."
                />
            </div>
        </div>
    );
};