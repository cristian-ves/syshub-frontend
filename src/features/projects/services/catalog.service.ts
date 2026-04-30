import api from "../../../api/axios.config";

export const catalogService = {
    getPensums: async () => {
        const { data } = await api.get("/catalog/pensums");
        return data;
    },
    getAreas: async () => {
        const { data } = await api.get("/catalog/areas");
        return data;
    },
    getSemesters: async (pensumId: number) => {
        const { data } = await api.get(`/catalog/semesters`, {
            params: { pensumId },
        });
        return data;
    },
};
