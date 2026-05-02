import React from 'react';
import { ChevronUp, ChevronDown, ArrowDown, ArrowUp } from 'lucide-react';
import { useArticleActions } from '../../../hooks/articles/useArticleActions';

interface VoteControlProps {
    articleId: number;
    puntos: number;
    userVote: number;
}

export const VoteControl: React.FC<VoteControlProps> = ({ articleId, puntos, userVote }) => {
    const { vote } = useArticleActions();

    return (
        <div className="absolute -left-4 top-8 flex flex-col items-center overflow-hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/50 rounded-2xl shadow-xl shadow-slate-200/40 dark:shadow-none z-30">
            {/* Botón Upvote */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    vote(articleId, 1);
                }}
                className={`cursor-pointer p-2 transition-colors duration-200 ${userVote === 1
                    ? 'text-brand-blue'
                    : 'text-slate-400 hover:text-brand-blue/70'
                    }`}
                title="Votar positivo"
            >
                <ArrowUp
                    size={22}
                    strokeWidth={userVote === 1 ? 4 : 3}
                    className={`transition-all duration-300 ${userVote === 1 ? 'drop-shadow-[0_0_5px_rgba(64,65,156,0.4)]' : ''
                        }`}
                />
            </button>

            <div className="py-1 flex flex-col items-center min-w-[40px] select-none">
                <span className="text-[13px] font-black leading-none text-slate-400 dark:text-slate-50">
                    {puntos}
                </span>
                <span className="text-[8px] font-bold uppercase tracking-tighter text-slate-400 dark:text-slate-50 mt-0.5">
                    VOTE
                    {(puntos == 1 || puntos == -1) ? '' : 's'}
                </span>
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    vote(articleId, -1);
                }}
                className={`cursor-pointer p-2 transition-colors duration-200 ${userVote === -1
                    ? 'text-brand-blue'
                    : 'text-slate-400 hover:text-brand-blue/70'
                    }`}
                title="Votar negativo"
            >
                <ArrowDown
                    size={22}
                    strokeWidth={userVote === -1 ? 4 : 3}
                    className={`transition-all duration-300 ${userVote === -1 ? 'drop-shadow-[0_0_5px_rgba(64,65,156,0.4)]' : ''
                        }`}
                />
            </button>
        </div>
    );
};