import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchMyProjects } from "../store/slices/myProjectsSlice";

export const useMyProjects = () => {
    const dispatch = useAppDispatch();

    const { user } = useAppSelector((state) => state.auth);
    const { id } = user;

    const { projects, loading, totalPages, currentPage } = useAppSelector(
        (state) => state.myProjects
    );

    useEffect(() => {
        if (!id) return;

        dispatch(fetchMyProjects({ userId: id, page: 0, size: 8 }));
    }, [id, dispatch]);

    const fetchPage = (page: number) => {
        if (!id) return;

        dispatch(fetchMyProjects({ userId: id, page, size: 8 }));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return {
        projects,
        loading,
        totalPages,
        currentPage,
        fetchPage,
    };
};
