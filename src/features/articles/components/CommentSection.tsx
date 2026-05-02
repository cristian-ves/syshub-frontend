import React, { useState } from 'react';
import { CommentItem } from './CommentItem';
import { toast } from 'sonner';
import { Send, MessageSquare } from 'lucide-react';
import type { ArticleComment } from '../../../types/article.types';
import { useAppDispatch, useAppSelector } from '../../../store';
import { addCommentThunk } from '../../../store/slices/articleSlice';
import { Button } from '../../../components/common';

interface CommentSectionProps {
    articleId: number;
    comments: ArticleComment[];
}

export const CommentSection: React.FC<CommentSectionProps> = ({ articleId, comments = [] }) => {
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector(state => state.auth);

    const [contenido, setContenido] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!contenido.trim()) return;

        try {
            setIsSubmitting(true);
            await dispatch(addCommentThunk({ articleId, contenido })).unwrap();
            setContenido('');
            toast.success('Comentario publicado');
        } catch (error: any) {
            toast.error(error || 'Error al publicar el comentario');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-brand-blue/10 dark:bg-brand-blue/20 rounded-xl text-brand-blue">
                    <MessageSquare size={24} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                    Comentarios
                </h3>
                <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 py-1 px-3 rounded-full text-sm font-bold ml-auto">
                    {comments.length}
                </span>
            </div>

            {isAuthenticated ? (
                <form onSubmit={handleSubmit} className="mb-10 relative group">
                    <textarea
                        value={contenido}
                        onChange={(e) => setContenido(e.target.value)}
                        placeholder="Comparte tu opinión sobre este artículo..."
                        className="w-full p-4 pb-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all min-h-[140px] text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
                        disabled={isSubmitting}
                    />
                    <div className="absolute bottom-3 right-3">
                        <Button
                            type="submit"
                            disabled={!contenido.trim() || isSubmitting}
                            isLoading={isSubmitting}
                            className="bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl px-5 py-2.5 flex items-center gap-2 border-none shadow-sm"
                        >
                            {!isSubmitting && <Send size={16} className="-ml-1" />}
                            <span>Comentar</span>
                        </Button>
                    </div>
                </form>
            ) : (
                <div className="mb-10 p-6 text-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <p className="text-slate-600 dark:text-slate-400 font-medium">
                        Debes iniciar sesión para dejar un comentario.
                    </p>
                </div>
            )}

            <div className="space-y-4">
                {comments.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/30 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
                        <MessageSquare size={40} className="mx-auto mb-3 opacity-20" />
                        <p className="font-medium">Nadie ha comentado todavía.</p>
                        <p className="text-sm mt-1">¡Sé el primero en compartir tu opinión!</p>
                    </div>
                ) : (
                    comments.map(comment => (
                        <CommentItem key={comment.id} comment={comment} />
                    ))
                )}
            </div>
        </section>
    );
};