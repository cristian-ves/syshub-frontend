import React, { useState } from 'react';
import { BookOpen, Heart, User, Edit3, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import type { Article } from '../../../types/article.types';
import { ProjectTag } from '../../projects/components/ProjectTag';
import { useArticleActions } from '../../../hooks/articles/useArticleActions';
import { VoteControl } from './VoteControl';

import { useAppDispatch, useAppSelector } from '../../../store';
import { deleteArticleThunk } from '../../../store/slices/articleSlice';
import { ConfirmDeleteModal } from '../../../components/common/ConfirmDeleteModal';

interface ArticleCardProps {
    article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { toggleFavorite } = useArticleActions();

    const { user } = useAppSelector(state => state.auth);
    const isOwner = user?.id === article.autor.id;
    const isAdmin = user?.role === "ROLE_ADMIN";
    const canEdit = isOwner || isAdmin;

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await dispatch(deleteArticleThunk(article.id)).unwrap();
            toast.success("Artículo eliminado con éxito");
            setIsDeleteModalOpen(false);
        } catch (error: any) {
            toast.error(error || "Ocurrió un error al eliminar");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <div className="relative h-full">
                <VoteControl
                    articleId={article.id}
                    puntos={article.puntos}
                    userVote={article.vote}
                    className="absolute -left-4 top-8 z-30 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/50 rounded-2xl shadow-xl shadow-slate-200/40 dark:shadow-none"
                />

                <div
                    onClick={() => navigate(`/articles/${article.slug}`)}
                    className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-brand-blue/5 transition-all cursor-pointer flex flex-col h-full"
                >
                    <div className="flex-grow pl-4">
                        <header className="mb-4">
                            <div className="flex justify-between items-start gap-2 mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-brand-blue" />
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                        {article.curso.nombre}
                                    </span>
                                </div>

                                <div className="flex items-center gap-1">
                                    {canEdit && (
                                        <>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/articles/${article.slug}/edit`);
                                                }}
                                                className="cursor-pointer p-2 rounded-full transition-all text-slate-400 hover:text-brand-blue hover:bg-slate-100 dark:hover:bg-slate-800"
                                                title="Editar artículo"
                                            >
                                                <Edit3 size={18} />
                                            </button>

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setIsDeleteModalOpen(true);
                                                }}
                                                className="cursor-pointer p-2 rounded-full transition-all text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                                                title="Eliminar artículo"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </>
                                    )}

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavorite(article.id, article.favorite);
                                        }}
                                        className={`cursor-pointer p-2 rounded-full transition-all ${article.favorite
                                            ? 'text-red-500 bg-red-50 dark:bg-red-500/10'
                                            : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                            }`}
                                    >
                                        <Heart
                                            size={18}
                                            fill={article.favorite ? "currentColor" : "none"}
                                            className="transition-transform active:scale-125"
                                        />
                                    </button>
                                </div>
                            </div>

                            <h3 className="ml-2 text-xl font-black text-slate-950 dark:text-white leading-tight group-hover:text-brand-blue transition-colors line-clamp-2">
                                {article.titulo}
                            </h3>
                        </header>

                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-6 font-medium italic">
                            "{article.extracto}"
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {article.tags.slice(0, 3).map((tag) => (
                                <ProjectTag key={tag.nombre} tag={tag} />
                            ))}
                        </div>
                    </div>

                    <footer className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between pl-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-brand-blue">
                                <User size={14} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-400 font-bold uppercase leading-none mb-0.5">Autor</span>
                                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                                    {article.autor.nombreCompleto}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 text-slate-400">
                            <BookOpen size={16} className="group-hover:text-brand-blue transition-colors" />
                        </div>
                    </footer>
                </div>
            </div>

            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                isDeleting={isDeleting}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="¿Eliminar Artículo?"
                description={`Estás a punto de eliminar "${article.titulo}". Esta acción no se puede deshacer.`}
            />
        </>
    );
};