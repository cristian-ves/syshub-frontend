import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { ChevronLeft } from "lucide-react";

import { useAppSelector } from "../../store";
import { ArticleSidebar } from "../../features/articles/components/ArticleSidebar";
import { ArticleHeader } from "../../features/articles/components/ArticleHeader";
import { useArticleDetail } from "../../hooks/articles/useArticleDetails";

export const ArticleDetailPage: React.FC = () => {
    const { user } = useAppSelector(state => state.auth);
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    const { article, loading } = useArticleDetail(slug);

    const isAdmin = user?.role === "ROLE_ADMIN";
    const isOwner = user?.id === article?.autor?.id;
    const canEdit = isAdmin || isOwner;

    if (loading) {
        return <div className="py-20 text-center animate-pulse text-slate-500 font-medium">Preparando lectura...</div>;
    }

    if (!article) return null;

    return (
        <div className="max-w-6xl mx-auto px-4 py-10 w-full">
            <button
                onClick={() => navigate(-1)}
                className="cursor-pointer group flex items-center gap-2 text-slate-500 hover:text-brand-blue mb-12 transition-colors font-medium"
            >
                <div className="p-2 rounded-full group-hover:bg-brand-blue/10 transition-colors">
                    <ChevronLeft size={20} />
                </div>
                Volver a la comunidad
            </button>

            <div className="flex flex-col lg:flex-row gap-12 relative">

                <ArticleSidebar article={article} canEdit={canEdit} />

                <main className="flex-grow min-w-0">
                    <ArticleHeader article={article} />

                    <div className="prose dark:prose-invert max-w-none prose-pre:bg-slate-900 dark:prose-pre:bg-black prose-img:rounded-3xl">
                        <ReactMarkdown>{article.contenido}</ReactMarkdown>
                    </div>
                </main>
            </div>
        </div>
    );
};