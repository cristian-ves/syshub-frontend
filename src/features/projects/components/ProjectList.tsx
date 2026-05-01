import { Rocket, Search } from "lucide-react";
import { ProjectCard, ProjectModal } from ".";
import { useProjectModal } from "../../../hooks/useProjectModal";
import type { Project } from "../../../types/project.types";
import { useNavigate } from "react-router-dom";
import { Button, Pagination } from "../../../components/common";

interface Props {
    projects: Project[];
    loading: boolean;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    emptyIcon?: React.ReactNode;
    emptyTitle: string;
    emptySubtitle: string;
    emptyActionPath?: string;
    canToggleDestacado?: boolean;
}

export const ProjectList: React.FC<Props> = ({
    projects,
    loading,
    currentPage,
    totalPages,
    onPageChange,
    emptyIcon,
    emptyTitle,
    emptySubtitle,
    emptyActionPath,
    canToggleDestacado = false,
}) => {
    const {
        selectedProject,
        isModalOpen,
        openModal,
        closeModal,
    } = useProjectModal(projects);

    const navigate = useNavigate();

    if (loading && projects.length === 0) {
        return (
            <div className="flex justify-center py-20">
                <div className="w-10 h-10 border-4 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin" />
            </div>
        );
    }

    if (!loading && projects.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-full mb-4">
                    {emptyIcon || <Search size={32} className="text-slate-400" />}
                </div>

                <h3 className="font-bold text-lg dark:text-white">
                    {emptyTitle}
                </h3>

                <p className="text-sm text-slate-500 mt-1 mb-3">
                    {emptySubtitle}
                </p>

                {emptyActionPath &&
                    <Button
                        className="gap-2 shadow-lg shadow-brand-blue/20"
                        onClick={() => navigate(emptyActionPath)}
                    >
                        <Rocket size={18} />
                        Subir Proyecto
                    </Button>
                }
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        onClick={openModal}
                    />
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                isLoading={loading}
            />

            <ProjectModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={closeModal}
                canToggleDestacado={canToggleDestacado}
            />
        </div>
    );
};