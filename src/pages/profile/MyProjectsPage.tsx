import { Folder } from "lucide-react";
import { ProjectList } from "../../features/projects/components/ProjectList";
import { useMyProjects } from "../../hooks/useMyProjects";

export const MyProjectsPage = () => {

    const { projects, loading, currentPage, totalPages, fetchPage } =
        useMyProjects();

    return (
        <ProjectList
            projects={projects}
            loading={loading}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={fetchPage}
            emptyIcon={<Folder size={32} className="text-slate-400" />}
            emptyTitle="You haven't uploaded any projects"
            emptySubtitle="Start by uploading your first project"
            emptyActionPath="/projects/create"
        />
    );
};