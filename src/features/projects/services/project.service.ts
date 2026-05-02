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

    toggleDestacado: async (
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

    downloadFile: async (nombreArchivo: string, originalName: string) => {
        if (nombreArchivo.startsWith("http")) {
            const link = document.createElement("a");
            link.href = nombreArchivo;

            link.target = "_blank";
            link.setAttribute("download", originalName);

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        try {
            const response = await api.get(`/projects/files/${nombreArchivo}`, {
                responseType: "blob",
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;

            link.setAttribute("download", originalName);

            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error al descargar el archivo local:", error);
        }
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
