import { useState } from "react";
import type { Project } from "../types/project.types";

export const useProjectModal = (projects: Project[]) => {
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
        null
    );
    const [isModalOpen, setIsModalOpen] = useState(false);

    const selectedProject =
        projects.find((p) => p.id === selectedProjectId) || null;

    const openModal = (project: Project) => {
        setSelectedProjectId(project.id);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    return {
        selectedProject,
        isModalOpen,
        openModal,
        closeModal,
    };
};
