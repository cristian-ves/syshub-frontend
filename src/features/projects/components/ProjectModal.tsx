import { useEffect } from 'react';
import { X, Link, Star, BookOpen, Tag as TagIcon, FileText } from 'lucide-react';
import { toast } from 'sonner';

import type { Project } from '../../../types/project.types';
import { Badge, Button } from '../../../components/common';
import { AreaBadge, FeaturedBadge, FileItem, ProjectSection, ProjectTag } from './';
import { formatDate } from '../../../helpers/date.helper';
import { toggleProjectFeatured } from '../../../store/slices/projectSlice';
import { useAppDispatch } from '../../../store';
import { createPortal } from 'react-dom';
import { downloadFile } from '../../../helpers/download.helper';

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
    canToggleFeatured?: boolean;
}

export const ProjectModal = ({ project, isOpen, onClose, canToggleFeatured }: ProjectModalProps) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isOpen) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = originalOverflow;
        }

    }, [isOpen]);

    if (!isOpen || !project) return null;

    const handleDownload = (fileName: string, originalName: string) => {
        toast.promise(downloadFile(fileName, originalName), {
            loading: 'Downloading file...',
            success: 'File saved successfully',
            error: "We couldn't download the file",
        });
    };

    const handleToggle = async () => {
        try {
            await dispatch(toggleProjectFeatured({
                id: project.id,
                featured: !project.featured
            })).unwrap();

            toast.success(project.featured ? "Project unfeatured" : "Project featured!");
        } catch (error) {
        }
    };

    return createPortal(
        <div className="fixed inset-0 z-100 flex items-center justify-center p-2 sm:p-4">
            <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity" onClick={onClose} />

            <div className="relative bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-4xl shadow-2xl border border-slate-200 dark:border-slate-800 custom-scrollbar animate-in fade-in zoom-in duration-300">

                <header className="h-32 bg-brand-blue relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20  from-white via-transparent to-transparent" />
                    <button onClick={onClose} className="cursor-pointer absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full transition-colors z-10"><X size={20} /></button>
                </header>

                <div className="p-8 -mt-12 relative">
                    <div className="bg-white dark:bg-slate-900 inline-flex p-3 rounded-2xl shadow-lg mb-6 border border-slate-100 dark:border-slate-800">
                        <BookOpen className="text-brand-blue" size={32} />
                    </div>

                    <div className="mb-8">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <Badge noMargin>{project.studyPlanName}</Badge>
                            <AreaBadge name={project.areaName} color={project.areaColor} />
                            {project.featured && <FeaturedBadge full />}
                        </div>

                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="grow">
                                <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight">{project.title}</h2>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-sm font-bold uppercase" style={{ color: project.areaColor }}>
                                        {project.courseName} <span className="opacity-40 mx-1">|</span> {project.studyPlanName}
                                    </span>
                                    <span className="hidden md:block text-slate-300">•</span>
                                    <span className="text-xs font-medium italic text-slate-500">Published on {formatDate(project.uploadDate)}</span>
                                </div>
                            </div>
                            {project.repoUrl && (
                                <a href={project.repoUrl} target="_blank" rel="noreferrer" className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-bold hover:bg-brand-blue hover:text-white transition-all">
                                    <Link size={18} /> GitHub
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="space-y-8">
                        <ProjectSection icon={<FileText size={14} />} title="Description">
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{project.description}</p>
                        </ProjectSection>

                        <ProjectSection icon={<TagIcon size={14} />} title="Stack">
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => <ProjectTag key={tag.name} tag={tag} />)}
                            </div>
                        </ProjectSection>

                        <ProjectSection title="Attached files" className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {project.files.length > 0 ? (
                                    project.files.map((file) =>
                                        <FileItem
                                            key={file.id}
                                            name={file.originalName}
                                            onDownload={() => handleDownload(file.fileName, file.originalName)}
                                        />
                                    )
                                ) : (
                                    <p className="col-span-full text-center text-xs text-slate-400 py-2 italic">No attached files</p>
                                )}
                            </div>
                        </ProjectSection>
                    </div>

                    {canToggleFeatured && (
                        <footer className="mt-8 flex justify-end pt-6 border-t border-slate-100 dark:border-slate-800">
                            <Button variant="ghost" onClick={handleToggle} className="...">
                                <Star size={18} fill={project.featured ? "currentColor" : "none"} />
                                {project.featured ? 'Unfeature' : 'Feature'}
                            </Button>
                        </footer>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
};