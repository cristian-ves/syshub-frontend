import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import {
    fetchArticleBySlug,
    clearSelectedArticle,
} from "../../store/slices/articleSlice";

export const useArticleDetail = (slug?: string) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { selectedArticle: article, loading } = useAppSelector(
        (state) => state.articles
    );

    useEffect(() => {
        if (!slug) return;

        const loadArticle = async () => {
            try {
                await dispatch(fetchArticleBySlug(slug)).unwrap();
            } catch (error) {
                navigate("/articles");
            }
        };

        loadArticle();

        return () => {
            dispatch(clearSelectedArticle());
        };
    }, [slug, dispatch, navigate]);

    return { article, loading };
};
