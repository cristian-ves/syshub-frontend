import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useArticleActions } from '../../../hooks/articles/useArticleActions';
import { cn } from '../../../helpers/combineClasses';

interface VoteControlProps {
    articleId: number;
    puntos: number;
    userVote: number;
    className?: string;
}

export const VoteControl: React.FC<VoteControlProps> = ({
    articleId,
    puntos,
    userVote,
    className = ""
}) => {
    const { vote } = useArticleActions();

    const coreClasses = "flex flex-col items-center overflow-hidden font-bold select-none";

    return (
        <div className={cn(coreClasses, className)}>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    vote(articleId, 1);
                }}
                className={`cursor-pointer transition-colors duration-200 p-2 ${userVote === 1
                    ? 'text-brand-blue'
                    : 'text-slate-400 hover:text-brand-blue/70'
                    }`}
                title="Votar positivo"
            >
                <ArrowUp
                    size={20}
                    strokeWidth={userVote === 1 ? 4 : 3}
                    className={`transition-all duration-300 ${userVote === 1 ? 'drop-shadow-[0_0_5px_rgba(64,65,156,0.4)]' : ''}`}
                />
            </button>

            <div className="flex flex-col items-center leading-tight py-1 px-3">
                <span className="text-[13px] font-black text-slate-700 dark:text-slate-100">
                    {puntos}
                </span>
                <span className="text-[8px] font-bold uppercase tracking-tight text-slate-400">
                    {Math.abs(puntos) === 1 ? 'VOTO' : 'VOTOS'}
                </span>
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    vote(articleId, -1);
                }}
                className={`cursor-pointer transition-colors duration-200 p-2 ${userVote === -1
                    ? 'text-brand-blue'
                    : 'text-slate-400 hover:text-brand-blue/70'
                    }`}
                title="Votar negativo"
            >
                <ArrowDown
                    size={20}
                    strokeWidth={userVote === -1 ? 4 : 3}
                    className={`transition-all duration-300 ${userVote === -1 ? 'drop-shadow-[0_0_5px_rgba(64,65,156,0.4)]' : ''}`}
                />
            </button>
        </div>
    );
};