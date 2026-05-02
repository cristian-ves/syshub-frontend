import React from 'react';
import { BookOpenText, Search } from "lucide-react";
import { ArticleCard } from "./ArticleCard";
import type { Article } from "../../../types/article.types";
import { useNavigate } from "react-router-dom";
import { Button, Pagination } from "../../../components/common";

interface Props {
    articles: Article[];
    loading: boolean;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    emptyIcon?: React.ReactNode;
    emptyTitle: string;
    emptySubtitle: string;
    emptyActionPath?: string;
    onVote?: (id: number, value: number) => void;
    onFavorite?: (id: number) => void;
}

export const ArticleList: React.FC<Props> = ({
    articles,
    loading,
    currentPage,
    totalPages,
    onPageChange,
    emptyIcon,
    emptyTitle,
    emptySubtitle,
    emptyActionPath,
    onVote,
    onFavorite
}) => {
    const navigate = useNavigate();

    if (loading && articles.length === 0) {
        return (
            <div className="flex justify-center py-20">
                <div className="w-10 h-10 border-4 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin" />
            </div>
        );
    }

    if (!loading && articles.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-full mb-4">
                    {emptyIcon || <Search size={32} className="text-slate-400" />}
                </div>
                <h3 className="font-bold text-lg dark:text-white">{emptyTitle}</h3>
                <p className="text-sm text-slate-500 mt-1 mb-3">{emptySubtitle}</p>
                {emptyActionPath && (
                    <Button onClick={() => navigate(emptyActionPath)} className="gap-2 shadow-lg shadow-brand-blue/20">
                        <BookOpenText size={18} />
                        Crear Artículo
                    </Button>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {articles.map((article) => (
                    <ArticleCard
                        key={article.id}
                        article={article}
                        onVote={onVote}
                        onFavorite={onFavorite}
                    />
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                isLoading={loading}
            />
        </div>
    );
};