import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Badge } from "../../components/common";
import { ArticleForm } from "../../features/articles/components/ArticleForm";
import { useCreateArticle } from "../../hooks/articles/useCreateArticle";

export const CreateArticlePage: React.FC = () => {
    const navigate = useNavigate();
    const { onSubmit, handleTagsChange, tags, isSubmitting, ...formMethods } = useCreateArticle();

    return (
        <div className="w-full py-10">
            <header className="mb-12">
                <button
                    onClick={() => navigate(-1)}
                    className="cursor-pointer flex items-center gap-2 text-slate-500 hover:text-brand-blue transition-colors mb-6 text-sm font-medium"
                >
                    <ChevronLeft size={16} />
                    Volver atrás
                </button>
                <Badge className="mt-4 bg-emerald-500/10 text-emerald-600 border-emerald-200">Nuevo Aporte</Badge>
                <h1 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white mt-2">
                    Escribe un <span className="text-brand-blue">Artículo</span>
                </h1>
            </header>

            <ArticleForm
                formMethods={formMethods as any}
                onSubmit={onSubmit}
                isSubmitting={isSubmitting}
                tags={tags}
                onTagsChange={handleTagsChange}
            />
        </div>
    );
};