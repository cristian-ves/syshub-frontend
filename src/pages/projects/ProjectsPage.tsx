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
        updateFilters: setFilters,
    } = useProjects();

    return (
        <div className="grow flex flex-col w-full max-w-6xl mx-auto px-6 md:px-12 py-10">
            <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-2xl">
                    <Badge>Repository Explorer</Badge>

                    <h1 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white mt-4 leading-tight">
                        Discover solutions from <br />
                        the{" "}
                        <span className="text-brand-blue">SysHub</span> community
                    </h1>
                </div>

                <Button
                    className="gap-2 shadow-lg shadow-brand-blue/20"
                    onClick={() => navigate("/projects/create")}
                >
                    <Rocket size={18} />
                    Publish Project
                </Button>
            </header>

            <ProjectFilters />

            <div className="grow mt-8">
                <ProjectList
                    projects={projects}
                    loading={loading}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setFilters({ page })}
                    canToggleFeatured={
                        user?.role === "ROLE_ASSISTANT" ||
                        user?.role === "ROLE_ADMIN"
                    }
                    emptyTitle="No projects found"
                    emptySubtitle="Try adjusting the filters or search term."
                />
            </div>
        </div>
    );
};