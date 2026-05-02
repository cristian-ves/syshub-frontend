
import React, { useState } from 'react';
import { Heart, Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { VoteControl } from './VoteControl';
import { type Article } from '../../../types/article.types';
import { useArticleActions } from '../../../hooks/articles/useArticleActions';
import { useAppDispatch } from '../../../store';
import { deleteArticleThunk } from '../../../store/slices/articleSlice';
import { toast } from 'sonner';
import { ConfirmDeleteModal } from '../../../components/common/ConfirmDeleteModal';

interface ArticleSidebarProps {
    article: Article;
    canEdit: boolean;
}

export const ArticleSidebar: React.FC<ArticleSidebarProps> = ({ article, canEdit }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { toggleFavorite } = useArticleActions();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleEdit = () => {
        navigate(`/articles/${article.slug}/edit`);
    };

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await dispatch(deleteArticleThunk(article.id)).unwrap();
            toast.success("Artículo eliminado con éxito");
            setIsDeleteModalOpen(false);
            navigate("/articles", { replace: true });
        } catch (error: any) {
            toast.error(error || "Ocurrió un error al eliminar");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
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
                            onClick={() => setIsDeleteModalOpen(true)}
                            className="cursor-pointer p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                            title="Eliminar artículo"
                        >
                            <Trash2 size={22} />
                        </button>
                    </>
                )}
            </aside>
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                isDeleting={isDeleting}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="¿Eliminar Artículo?"
                description={`Estás a punto de eliminar "${article.titulo}". Esta acción no se puede deshacer y perderás todos los votos asociados.`}
            />
        </>

    );
};