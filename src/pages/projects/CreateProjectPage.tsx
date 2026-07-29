import React, { useState } from "react";
import { Button, Input, Badge } from "../../components/common";
import { ChevronLeft, Send, FileCode, Tags, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CourseSearchInput, FileUpload, TagInput } from "../../features/projects/components";
import { useCreateProject } from "../../hooks/useCreateProject";
import { type Course } from "../../types/course.types";

export const CreateProjectPage: React.FC = () => {
    const navigate = useNavigate();
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const {
        register, onSubmit, setValue, tags, files,
        handleTagsChange, handleFilesChange, formState: { errors }, isSubmitting
    } = useCreateProject();

    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            <header className="mb-12">
                <button
                    onClick={() => navigate(-1)}
                    className="cursor-pointer flex items-center gap-2 text-slate-500 hover:text-brand-blue transition-colors mb-6 text-sm font-medium"
                >
                    <ChevronLeft size={16} />
                    Go back
                </button>
                <Badge className="mt-4">New contribution</Badge>
                <h1 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white mt-2">
                    Share your <span className="text-brand-blue">knowledge</span>
                </h1>
            </header>

            <form
                onSubmit={onSubmit}
                className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-4xl shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden flex flex-col min-h-225"
            >

                <section className="p-8 md:p-10 space-y-6">
                    <div className="flex items-center gap-2 mb-2 text-brand-blue">
                        <Info size={20} />
                        <h2 className="font-bold uppercase tracking-wider text-xs">Project information</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                        <Input
                            label="Project title"
                            placeholder="e.g. Haskell interpreter"
                            {...register("title")}
                            error={errors.title?.message}
                        />
                        <Input
                            label="Short description"
                            placeholder="What problem does your project solve?"
                            {...register("description")}
                            error={errors.description?.message}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <CourseSearchInput
                                value={selectedCourse}
                                onSelect={(course) => {
                                    setSelectedCourse(course);
                                    setValue("courseId", course.id, { shouldValidate: true })
                                }}
                                error={errors.courseId?.message}
                            />
                            <Input
                                label="Repository URL"
                                placeholder="https://github.com/user/repo"
                                {...register("repoUrl")}
                                error={errors.repoUrl?.message}
                            />
                        </div>
                    </div>
                </section>

                <hr className="border-slate-100 dark:border-slate-800" />

                <section className="p-8 md:p-10">
                    <div className="flex items-center gap-2 mb-6 text-brand-blue">
                        <Tags size={20} />
                        <h2 className="font-bold uppercase tracking-wider text-xs">Tags and categories</h2>
                    </div>
                    <TagInput value={tags} onChange={handleTagsChange} error={errors.tags?.message} />
                </section>

                <hr className="border-slate-100 dark:border-slate-800" />

                <section className="p-8 md:p-10 grow flex flex-col">
                    <div className="flex items-center gap-2 mb-6 text-brand-blue">
                        <FileCode size={20} />
                        <h2 className="font-bold uppercase tracking-wider text-xs">Files and documentation</h2>
                    </div>
                    <div className="grow">
                        <FileUpload
                            value={files}
                            onChange={handleFilesChange}
                            error={errors.files?.message}
                        />
                    </div>
                </section>

                <hr className="border-slate-100 dark:border-slate-800" />

                <footer className="p-8 md:p-10 bg-slate-50/50 dark:bg-slate-800/20">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-sm text-slate-500 max-w-xs text-center md:text-left">
                            Make sure your files don't contain sensitive information before publishing your project
                        </div>
                        <Button
                            type="submit"
                            className="w-full md:w-auto px-12 py-7 text-lg shadow-xl shadow-brand-blue/20 gap-3"
                            isLoading={isSubmitting}
                        >
                            <Send size={20} />
                            Publish project
                        </Button>
                    </div>
                </footer>
            </form>

        </div>
    );
};