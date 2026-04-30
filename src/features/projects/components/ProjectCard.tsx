import React from 'react';
import { Link as LinkIcon, Star, User } from 'lucide-react';
import type { Project } from '../../../types/project.types';
import { ProjectTag } from './ProjectTag';
import { FeaturedBadge } from './FeatureBadge';

interface ProjectCardProps {
    project: Project;
    onClick: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
    return (
        <div
            onClick={() => onClick(project)}
            className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-brand-blue/5 transition-all cursor-pointer flex flex-col h-full"
        >
            {project.destacado && (
                <div className="absolute -top-3 -right-2 z-10 border-2 border-white dark:border-slate-900 rounded-full">
                    <FeaturedBadge />
                </div>
            )}

            <div className="flex-grow">
                <header className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.areaColor }} />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{project.areaNombre}</span>
                    </div>

                    <h3 className="text-xl font-black text-slate-950 dark:text-white leading-tight group-hover:text-brand-blue transition-colors line-clamp-2">
                        {project.titulo}
                    </h3>

                    <p className="text-[10px] font-bold uppercase mt-2 tracking-tight" style={{ color: project.areaColor }}>
                        {project.cursoNombre} <span className="opacity-40 mx-1">|</span> {project.pensumNombre}
                    </p>
                </header>

                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-6 font-medium italic">"{project.descripcion}"</p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => <ProjectTag key={tag.nombre} tag={tag} />)}
                    {project.tags.length > 3 && <span className="text-[10px] text-slate-400 font-bold self-center">+{project.tags.length - 3}</span>}
                </div>
            </div>

            <footer className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-brand-blue">
                        <User size={14} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-bold uppercase leading-none mb-0.5">Autor</span>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{project.autorNombre}</span>
                    </div>
                </div>
                <LinkIcon size={16} className="text-slate-400 group-hover:text-brand-blue transition-colors" />
            </footer>
        </div>
    );
};