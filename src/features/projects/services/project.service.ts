import api from "../../../api/axios.config";
import type {
    PaginatedResponse,
    Project,
    ProjectFilters,
} from "../../../types/project.types";

export const projectService = {
    getProjects: async (
        filters: ProjectFilters
    ): Promise<PaginatedResponse<Project>> => {
        const { data } = await api.get<PaginatedResponse<Project>>(
            "/projects",
            {
                params: filters,
            }
        );
        return data;
    },

    toggleFeatured: async (
        projectId: number,
        isFeatured: boolean
    ): Promise<Project> => {
        const { data } = await api.patch<Project>(
            `/projects/${projectId}/featured`,
            null,
            { params: { featured: isFeatured } }
        );
        return data;
    },

    createProject: async (formData: FormData): Promise<Project> => {
        const { data } = await api.post("/projects", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return data;
    },
};
