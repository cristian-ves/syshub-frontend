import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import {
    clearFavorites,
    fetchMyFavorites,
} from "../../store/slices/favoriteArticleSlice";

export const useFavorites = () => {
    const dispatch = useAppDispatch();
    const { items, loading, currentPage, totalPages, error } = useAppSelector(
        (state) => state.favoriteArticles
    );

    useEffect(() => {
        dispatch(fetchMyFavorites(0));

        return () => {
            dispatch(clearFavorites());
        };
    }, [dispatch]);

    const handlePageChange = (newPage: number) => {
        dispatch(fetchMyFavorites(newPage));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const retry = () => {
        dispatch(fetchMyFavorites(currentPage));
    };

    return {
        items,
        loading,
        currentPage,
        totalPages,
        error,
        handlePageChange,
        retry,
    };
};
