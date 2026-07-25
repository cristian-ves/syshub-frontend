import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { FileText, Info, Eye, Edit3, Send } from "lucide-react";
import { CourseSearchInput, TagInput } from "../../../features/projects/components";
import type { UseFormReturn } from "react-hook-form";
import type { CreateArticleFormValues } from "../schemas/create-article.schema";
import { Button, Input } from "../../../components/common";
import type { Course } from '../../../types/course.types';

interface ArticleFormProps {
    formMethods: UseFormReturn<CreateArticleFormValues>;
    onSubmit: (data: CreateArticleFormValues) => void;
    isSubmitting: boolean;
    tags: { name: string; color: string }[];
    onTagsChange: (newTags: any[]) => void;
    submitLabel?: string;
    initialCourse?: Course | null;
}

export const ArticleForm = ({
    formMethods,
    onSubmit,
    isSubmitting,
    tags,
    onTagsChange,
    submitLabel = "Publish article",
    initialCourse
}: ArticleFormProps) => {
    const [previewMode, setPreviewMode] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(initialCourse ?? null);
    const { register, setValue, watch, formState: { errors } } = formMethods;
    const currentContent = watch("content");

    useEffect(() => {
        if (initialCourse) setSelectedCourse(initialCourse);
    }, [initialCourse?.id]);

    return (
        <form onSubmit={formMethods.handleSubmit(onSubmit as any)} className="space-y-8">
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-4xl p-8 md:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none">
                <div className="flex items-center gap-2 mb-8 text-brand-blue border-b border-slate-50 dark:border-slate-800 pb-4">
                    <Info size={20} />
                    <h2 className="font-bold uppercase tracking-wider text-xs">General Information</h2>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <Input
                        label="Title"
                        placeholder="Ex. Query optimization in PostgreSQL"
                        {...register("title")}
                        error={errors.title?.message}
                    />
                    <Input
                        label="Excerpt / Summary"
                        placeholder="A brief introduction..."
                        {...register("excerpt")}
                        error={errors.excerpt?.message}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <CourseSearchInput
                            value={selectedCourse}
                            onSelect={(course) => {
                                setSelectedCourse(course);
                                setValue("courseId", course.id, { shouldValidate: true });
                            }}
                            error={errors.courseId?.message}
                        />
                        <div className="space-y-2">
                            <TagInput value={tags} onChange={onTagsChange} error={errors.tags?.message} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-4xl overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                    <div className="flex items-center gap-2 text-brand-blue">
                        <FileText size={20} />
                        <h2 className="font-bold uppercase tracking-wider text-xs">Content</h2>
                    </div>
                    <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
                        <button
                            type="button"
                            onClick={() => setPreviewMode(false)}
                            className={`cursor-pointer flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${!previewMode ? 'bg-brand-blue text-white shadow-sm' : 'text-slate-500 hover:text-brand-blue'}`}
                        >
                            <Edit3 size={14} /> Write
                        </button>
                        <button
                            type="button"
                            onClick={() => setPreviewMode(true)}
                            className={`cursor-pointer flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${previewMode ? 'bg-brand-blue text-white shadow-sm' : 'text-slate-500 hover:text-brand-blue'}`}
                        >
                            <Eye size={14} /> Preview
                        </button>
                    </div>
                </div>

                <div className="min-h-125 flex flex-col w-full overflow-x-hidden bg-transparent">
                    {!previewMode ? (
                        <textarea
                            {...register("content")}
                            className="w-full grow p-8 md:p-10 bg-transparent text-slate-700 dark:text-slate-200 focus:outline-none resize-none font-mono text-sm leading-relaxed min-h-125"
                            placeholder="# Your content here..."
                        />
                    ) : (
                        <div className="w-full p-8 md:p-10">
                            <div className="prose dark:prose-invert max-w-none w-full">
                                <ReactMarkdown>{currentContent || "*Nothing to preview*"}</ReactMarkdown>
                            </div>
                        </div>
                    )}
                </div>
                {errors.content && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/10 border-t border-red-100 dark:border-red-900/20 text-red-500 text-xs font-bold">
                        {errors.content.message}
                    </div>
                )}
            </div>

            <footer className="flex flex-col md:flex-row items-center justify-between gap-6 py-4">
                <div className="text-sm text-slate-500 flex items-center gap-2">
                    <Info size={16} className="text-brand-blue" />
                    Markdown supported for code and tables.
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