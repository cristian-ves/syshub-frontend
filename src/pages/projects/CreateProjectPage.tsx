import React from "react";
import { Button, Input, Badge } from "../../components/common";
import { ChevronLeft, Send, FileCode, Tags, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CourseSearchInput, FileUpload, TagInput } from "../../features/projects/components";
import { useCreateProject } from "../../hooks/useCreateProject";

export const CreateProjectPage: React.FC = () => {
    const navigate = useNavigate();
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
                    Volver atrás
                </button>
                <Badge className="mt-4">Nuevo Aporte</Badge>
                <h1 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white mt-2">
                    Comparte tu <span className="text-brand-blue">conocimiento</span>
                </h1>
            </header>

            <form
                onSubmit={onSubmit}
                className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden flex flex-col min-h-[900px]"
            >

                <section className="p-8 md:p-10 space-y-6">
                    <div className="flex items-center gap-2 mb-2 text-brand-blue">
                        <Info size={20} />
                        <h2 className="font-bold uppercase tracking-wider text-xs">Información del Proyecto</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                        <Input
                            label="Título del Proyecto"
                            placeholder="Ej. Intérprete de Haskell"
                            {...register("titulo")}
                            error={errors.titulo?.message}
                        />
                        <Input
                            label="Descripción Corta"
                            placeholder="¿Qué problema resuelve tu proyecto?"
                            {...register("descripcion")}
                            error={errors.descripcion?.message}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <CourseSearchInput
                                onSelect={(course) => setValue("courseId", course.id, { shouldValidate: true })}
                                error={errors.courseId?.message}
                            />
                            <Input
                                label="URL del Repositorio"
                                placeholder="https://github.com/usuario/repo"
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
                        <h2 className="font-bold uppercase tracking-wider text-xs">Etiquetas y Categorías</h2>
                    </div>
                    <TagInput value={tags} onChange={handleTagsChange} error={errors.tags?.message} />
                </section>

                <hr className="border-slate-100 dark:border-slate-800" />

                <section className="p-8 md:p-10 flex-grow flex flex-col">
                    <div className="flex items-center gap-2 mb-6 text-brand-blue">
                        <FileCode size={20} />
                        <h2 className="font-bold uppercase tracking-wider text-xs">Documentación y Archivos</h2>
                    </div>
                    <div className="flex-grow">
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
                            Asegúrate de que tus archivos no contengan información sensible antes de publicar.
                        </div>
                        <Button
                            type="submit"
                            className="w-full md:w-auto px-12 py-7 text-lg shadow-xl shadow-brand-blue/20 gap-3"
                            isLoading={isSubmitting}
                        >
                            <Send size={20} />
                            Publicar Proyecto Ahora
                        </Button>
                    </div>
                </footer>
            </form>

        </div>
    );
};