import { useEffect } from "react";
import {
    fetchArticles,
    setArticleFilters,
} from "../../store/slices/articleSlice";
import type { ArticleFilters } from "../../types/article.types";
import { useAppDispatch, useAppSelector } from "../../store";

export const useArticles = (initialFilters?: Partial<ArticleFilters>) => {
    const dispatch = useAppDispatch();

    const { articles, loading, totalPages, currentPage, filters } =
        useAppSelector((state) => state.articles);

    useEffect(() => {
        if (initialFilters) {
            dispatch(setArticleFilters(initialFilters));
        }
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchArticles(filters));
    }, [filters, dispatch]);

    const updateFilters = (newFilters: Partial<ArticleFilters>) => {
        dispatch(setArticleFilters(newFilters));
    };

    return {
        articles,
        loading,
        totalPages,
        currentPage,
        filters,
        setFilters: updateFilters,
    };
};
