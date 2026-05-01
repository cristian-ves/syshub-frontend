import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchProjects, setFilters } from "../store/slices/projectSlice";
import type { ProjectFilters } from "../types/project.types";

export const useProjects = (initialFilters?: Partial<ProjectFilters>) => {
    const dispatch = useAppDispatch();

    const { projects, loading, totalPages, currentPage, filters } =
        useAppSelector((state) => state.projects);

    useEffect(() => {
        if (initialFilters) {
            dispatch(setFilters(initialFilters));
        }
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchProjects(filters));
    }, [filters, dispatch]);

    const updateFilters = (newFilters: Partial<ProjectFilters>) => {
        dispatch(setFilters(newFilters));
    };

    return {
        projects,
        loading,
        totalPages,
        currentPage,
        filters,
        setFilters: updateFilters,
    };
};
