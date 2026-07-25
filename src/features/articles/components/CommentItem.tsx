import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { ArticleComment } from '../../../types/article.types';
import { useAppDispatch, useAppSelector } from '../../../store';
import { deleteCommentThunk } from '../../../store/slices/articleSlice';
import { ConfirmDeleteModal } from '../../../components/common/ConfirmDeleteModal';

interface CommentItemProps {
    comment: ArticleComment;
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.auth);
    const isAdmin = user?.role === "ROLE_ADMIN";

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const initial = comment.author.fullName.charAt(0).toUpperCase();

    const formattedDate = new Intl.DateTimeFormat('en-US', {
        day: 'numeric', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    }).format(new Date(comment.createdAt));

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await dispatch(deleteCommentThunk(comment.id)).unwrap();
            toast.success("Comment deleted successfully");
            setIsModalOpen(false);
        } catch (error) {
            toast.error("Error deleting the comment");
            setIsDeleting(false);
        }
    };

    return (
        <>
            <div className={`group flex gap-4 p-4 md:p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl transition-all ${isDeleting ? 'opacity-50 pointer-events-none' : ''}`}>

                <div className="shrink-0">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue flex items-center justify-center font-bold text-lg border border-brand-blue/20">
                        {initial}
                    </div>
                </div>

                <div className="grow min-w-0">
                    <div className="flex justify-between items-start mb-1">
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-sm md:text-base truncate">
                                {comment.author.fullName}
                            </h4>
                            <span className="text-[11px] md:text-xs text-slate-400 font-medium">
                                {formattedDate}
                            </span>
                        </div>

                        {isAdmin && (
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-colors cursor-pointer"
                                title="Delete comment"
                            >
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base mt-2 whitespace-pre-wrap wrap-break-words leading-relaxed">
                        {comment.content}
                    </p>
                </div>
            </div>

            <ConfirmDeleteModal
                isOpen={isModalOpen}
                isDeleting={isDeleting}
                onClose={() => !isDeleting && setIsModalOpen(false)}
                onConfirm={handleDelete}
                title="Delete comment"
                description={`You are about to delete the ${comment.author.fullName} comment. This action can't be undone.`}
            />
        </>
    );
};