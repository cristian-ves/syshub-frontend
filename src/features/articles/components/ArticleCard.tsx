import React from 'react';
import { BookOpen, Heart, User, ChevronUp, ChevronDown } from 'lucide-react';
import type { Article } from '../../../types/article.types';
import { ProjectTag } from '../../projects/components/ProjectTag';
import { useNavigate } from 'react-router-dom';

interface ArticleCardProps {
    article: Article;
    onVote?: (id: number, value: number) => void;
    onFavorite?: (id: number) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onVote, onFavorite }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/articles/${article.slug}`)}
            className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-brand-blue/5 transition-all cursor-pointer flex flex-col h-full"
        >
            <div className="absolute -left-4 top-8 flex flex-col items-center overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/50 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none z-20 group/vote">
                <button
                    onClick={(e) => { e.stopPropagation(); onVote?.(article.id, 1); }}
                    className="cursor-pointer p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-all duration-200"
                    title="Votar positivo"
                >
                    <ChevronUp size={22} strokeWidth={3} />
                </button>

                <div className="py-1 flex flex-col items-center">
                    <span className={`text-[13px] font-black leading-none ${article.puntos > 0 ? 'text-emerald-600 dark:text-emerald-400' :
                        article.puntos < 0 ? 'text-red-600 dark:text-red-400' :
                            'text-slate-700 dark:text-slate-200'
                        }`}>
                        {article.puntos}
                    </span>
                    <span className="text-[8px] font-bold uppercase tracking-tighter text-slate-400 dark:text-slate-500 mt-0.5">
                        PTS
                    </span>
                </div>

                <button
                    onClick={(e) => { e.stopPropagation(); onVote?.(article.id, -1); }}
                    className="cursor-pointer p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200"
                    title="Votar negativo"
                >
                    <ChevronDown size={22} strokeWidth={3} />
                </button>
            </div>

            <div className="flex-grow pl-4">
                <header className="mb-4">
                    <div className="flex justify-between items-start gap-2 mb-2">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-brand-blue" />
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                {article.curso.nombre}
                            </span>
                        </div>

                        <button
                            onClick={(e) => { e.stopPropagation(); onFavorite?.(article.id); }}
                            className={`cursor-pointer p-2 rounded-full transition-all ${article.isFavorite ? 'text-red-500 bg-red-50' : 'text-slate-400 hover:bg-slate-100'}`}
                        >
                            <Heart size={18} fill={article.isFavorite ? "currentColor" : "none"} />
                        </button>
                    </div>

                    <h3 className="text-xl font-black text-slate-950 dark:text-white leading-tight group-hover:text-brand-blue transition-colors line-clamp-2">
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
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{article.autor.nombreCompleto}</span>
                    </div>
                </div>

                <div className="flex items-center gap-1 text-slate-400">
                    <BookOpen size={16} className="group-hover:text-brand-blue transition-colors" />
                </div>
            </footer>
        </div>
    );
};