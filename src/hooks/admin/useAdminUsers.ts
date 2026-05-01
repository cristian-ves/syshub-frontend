import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchUsers } from "../../store/slices/adminSlice";

const SIZE = 4;

export const useAdminUsers = () => {
    const dispatch = useAppDispatch();
    const { users, loading, totalPages, currentPage } = useAppSelector(
        (state) => state.admin
    );

    useEffect(() => {
        dispatch(fetchUsers({ page: 0, size: SIZE }));
    }, [dispatch]);

    const fetchPage = (page: number) => {
        dispatch(fetchUsers({ page, size: SIZE }));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return {
        users,
        loading,
        totalPages,
        currentPage,
        fetchPage,
    };
};
