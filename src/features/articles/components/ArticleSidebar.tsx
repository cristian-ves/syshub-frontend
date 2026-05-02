
import React from 'react';
import { Heart, Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { VoteControl } from './VoteControl';
import { type Article } from '../../../types/article.types';
import { useArticleActions } from '../../../hooks/articles/useArticleActions';

interface ArticleSidebarProps {
    article: Article;
    canEdit: boolean;
}

export const ArticleSidebar: React.FC<ArticleSidebarProps> = ({ article, canEdit }) => {
    const navigate = useNavigate();
    const { toggleFavorite } = useArticleActions();

    const handleEdit = () => {
        navigate(`/articles/${article.slug}/edit`);
    };

    const handleDelete = () => {
        if (window.confirm("¿Estás seguro de eliminar este artículo?")) {
            console.log("Implementar thunk de eliminación para el ID:", article.id);
        }
    };

    return (
        <aside className="hidden lg:flex flex-col items-center gap-6 sticky top-32 h-fit">
            <div className="flex flex-col items-center gap-2">
                <VoteControl
                    articleId={article.id}
                    puntos={article.puntos}
                    userVote={article.vote}
                    className="bg-transparent border-none shadow-none"
                />
            </div>

            <div className="h-px w-8 bg-slate-100 dark:bg-slate-800" />

            <button
                onClick={() => toggleFavorite(article.id, article.favorite)}
                className={`cursor-pointer p-3 rounded-2xl border transition-all ${article.favorite
                    ? 'bg-red-50 border-red-100 text-red-500 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 hover:text-red-500'
                    }`}
                title={article.favorite ? "Quitar de favoritos" : "Guardar en favoritos"}
            >
                <Heart size={22} fill={article.favorite ? "currentColor" : "none"} />
            </button>

            {canEdit && (
                <>
                    <div className="h-px w-8 bg-slate-100 dark:bg-slate-800" />
                    <button
                        onClick={handleEdit}
                        className="cursor-pointer p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-brand-blue transition-all"
                        title="Editar artículo"
                    >
                        <Edit2 size={22} />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="cursor-pointer p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-red-600 transition-all"
                        title="Eliminar artículo"
                    >
                        <Trash2 size={22} />
                    </button>
                </>
            )}
        </aside>
    );
};