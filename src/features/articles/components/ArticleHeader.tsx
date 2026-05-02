import React from 'react';
import { Calendar } from 'lucide-react';
import { type Article } from '../../../types/article.types';
import { Badge } from '../../../components/common';
import { ProjectTag } from '../../projects/components/ProjectTag';

export const ArticleHeader: React.FC<{ article: Article }> = ({ article }) => {
    return (
        <header className="mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-6">
                <Badge className="bg-brand-blue text-white border-none py-1 !m-0">
                    {article.curso.nombre}
                </Badge>
                {article.tags.map(tag => (
                    <ProjectTag key={tag.nombre} tag={tag} />
                ))}
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-slate-950 dark:text-white leading-[1.1] mb-8">
                {article.titulo}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 pb-8 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-brand-blue font-bold">
                        {article.autor.nombreCompleto.charAt(0)}
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Autor</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{article.autor.nombreCompleto}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center text-slate-400">
                        <Calendar size={18} />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Publicado</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                            {new Date(article.createdAt).toLocaleDateString(undefined, {
                                year: 'numeric', month: 'long', day: 'numeric'
                            })}
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};