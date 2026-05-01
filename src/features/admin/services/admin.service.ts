import api from "../../../api/axios.config";

export const adminService = {
    getAllUsers: async (page = 0, size = 10) => {
        const { data } = await api.get(`/users/admin`, {
            params: { page, size },
        });
        return data;
    },

    deleteUser: async (id: string) => {
        await api.delete(`/users/admin/${id}`);
        return id;
    },

    updateUser: async (id: string, userData: any) => {
        const { data } = await api.put(`/users/admin/${id}`, userData);
        return data;
    },

    createUser: async (userData: any) => {
        const { data } = await api.post(`/users/admin`, userData);
        return data;
    },
};
