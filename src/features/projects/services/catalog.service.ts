import api from "../../../api/axios.config";

export const catalogService = {
    getStudyPlans: async () => {
        const { data } = await api.get("/catalog/study-plans");
        return data;
    },
    getAreas: async () => {
        const { data } = await api.get("/catalog/areas");
        return data;
    },
    getSemesters: async (studyPlanId: number) => {
        const { data } = await api.get(`/catalog/semesters`, {
            params: { studyPlanId: studyPlanId },
        });
        return data;
    },
};
