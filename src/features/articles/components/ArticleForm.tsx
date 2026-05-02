import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { FileText, Info, Eye, Edit3, Send } from "lucide-react";
import { CourseSearchInput, TagInput } from "../../../features/projects/components";
import type { UseFormReturn } from "react-hook-form";
import type { CreateArticleFormValues } from "../schemas/create-article.schema";
import { Button, Input } from "../../../components/common";

interface ArticleFormProps {
    formMethods: UseFormReturn<CreateArticleFormValues>;
    onSubmit: (data: CreateArticleFormValues) => void;
    isSubmitting: boolean;
    tags: { nombre: string; color: string }[];
    onTagsChange: (newTags: any[]) => void;
    submitLabel?: string;
    initialCourse?: { id: number; nombre: string; codigo?: string } | null;
}

export const ArticleForm: React.FC<ArticleFormProps> = ({
    formMethods,
    onSubmit,
    isSubmitting,
    tags,
    onTagsChange,
    submitLabel = "Publicar Artículo",
    initialCourse
}) => {
    const [previewMode, setPreviewMode] = useState(false);
    const { register, setValue, watch, formState: { errors } } = formMethods;
    const contenidoActual = watch("contenido");

    return (
        <form onSubmit={formMethods.handleSubmit(onSubmit as any)} className="space-y-8">
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none">
                <div className="flex items-center gap-2 mb-8 text-brand-blue border-b border-slate-50 dark:border-slate-800 pb-4">
                    <Info size={20} />
                    <h2 className="font-bold uppercase tracking-wider text-xs">Información General</h2>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <Input
                        label="Título del Artículo"
                        placeholder="Ej. Optimización de consultas en PostgreSQL"
                        {...register("titulo")}
                        error={errors.titulo?.message}
                    />
                    <Input
                        label="Extracto / Resumen"
                        placeholder="Una breve introducción..."
                        {...register("extracto")}
                        error={errors.extracto?.message}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <CourseSearchInput
                            onSelect={(course) => setValue("courseId", course.id, { shouldValidate: true })}
                            error={errors.courseId?.message}
                            initialCourse={initialCourse}
                        />
                        <div className="space-y-2">
                            <TagInput value={tags} onChange={onTagsChange} error={errors.tags?.message} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none">
                <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                    <div className="flex items-center gap-2 text-brand-blue">
                        <FileText size={20} />
                        <h2 className="font-bold uppercase tracking-wider text-xs">Contenido</h2>
                    </div>
                    <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
                        <button
                            type="button"
                            onClick={() => setPreviewMode(false)}
                            className={`cursor-pointer flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${!previewMode ? 'bg-brand-blue text-white shadow-sm' : 'text-slate-500 hover:text-brand-blue'}`}
                        >
                            <Edit3 size={14} /> Escribir
                        </button>
                        <button
                            type="button"
                            onClick={() => setPreviewMode(true)}
                            className={`cursor-pointer flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${previewMode ? 'bg-brand-blue text-white shadow-sm' : 'text-slate-500 hover:text-brand-blue'}`}
                        >
                            <Eye size={14} /> Vista Previa
                        </button>
                    </div>
                </div>

                <div className="min-h-[500px] flex flex-col w-full overflow-x-hidden bg-transparent">
                    {!previewMode ? (
                        <textarea
                            {...register("contenido")}
                            className="w-full flex-grow p-8 md:p-10 bg-transparent text-slate-700 dark:text-slate-200 focus:outline-none resize-none font-mono text-sm leading-relaxed min-h-[500px]"
                            placeholder="# Tu contenido aquí..."
                        />
                    ) : (
                        <div className="w-full p-8 md:p-10">
                            <div className="prose dark:prose-invert max-w-none w-full">
                                <ReactMarkdown>{contenidoActual || "*No hay nada que mostrar*"}</ReactMarkdown>
                            </div>
                        </div>
                    )}
                </div>
                {errors.contenido && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/10 border-t border-red-100 dark:border-red-900/20 text-red-500 text-xs font-bold">
                        {errors.contenido.message}
                    </div>
                )}
            </div>

            <footer className="flex flex-col md:flex-row items-center justify-between gap-6 py-4">
                <div className="text-sm text-slate-500 flex items-center gap-2">
                    <Info size={16} className="text-brand-blue" />
                    Markdown habilitado para código y tablas.
                </div>
                <Button
                    type="submit"
                    className="w-full md:w-auto px-12 py-7 text-lg shadow-xl shadow-brand-blue/20 gap-3"
                    isLoading={isSubmitting}
                >
                    <Send size={20} />
                    {submitLabel}
                </Button>
            </footer>
        </form>
    );
};