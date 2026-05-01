import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "../../components/common";
import {
    createProjectSchema,
    type CreateProjectFormValues,
} from "../../features/projects/schemas/create-project.schema";
import { useAppDispatch } from "../../store";
import { createProject } from "../../store/slices/projectSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CourseSearchInput, FileUpload, TagInput } from "../../features/projects/components";


export const CreateProjectPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [tags, setTags] = useState<{ nombre: string; color: string }[]>([]);

    const handleTagsChange = (newTags: any[]) => {
        setTags(newTags);
        setValue("tags", newTags, { shouldValidate: true });
    };

    const [files, setFiles] = useState<File[]>([]);

    const handleFilesChange = (newFiles: File[]) => {
        setFiles(newFiles);
        setValue("files", newFiles, { shouldValidate: true });
    };

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<CreateProjectFormValues>({
        resolver: zodResolver(createProjectSchema) as any,
        defaultValues: {
            tags: [],
        },
    });

    const onError = (errors: any) => {
        console.log("Errores RHF:", errors);
    };

    const onSubmit: SubmitHandler<CreateProjectFormValues> = async (data) => {
        if (tags.length === 0) {
            toast.error("Debes agregar al menos una tag");
            return;
        }

        try {
            const formData = new FormData();

            const payload = {
                titulo: data.titulo,
                descripcion: data.descripcion,
                courseId: data.courseId,
                repoUrl: data.repoUrl,
                tags: tags,
            };

            formData.append(
                "project",
                new Blob([JSON.stringify(payload)], {
                    type: "application/json",
                })
            );

            Array.from(data.files || []).forEach((file: any) => {
                formData.append("files", file);
            });

            await dispatch(createProject(formData)).unwrap();

            toast.success("Proyecto creado correctamente");
            navigate("/projects");
            //TODO: change to my projects
        } catch (error: any) {
            toast.error(error);
        }
    };

    return (
        <div className="flex-grow w-full max-w-3xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-black mb-6 dark:text-white">
                Subir Proyecto
            </h1>

            <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-5">

                <Input
                    label="Título"
                    placeholder="Ej. Intérprete de Haskell"
                    {...register("titulo")}
                    error={errors.titulo?.message}
                />

                <Input
                    label="Descripción"
                    placeholder="Describe tu proyecto..."
                    {...register("descripcion")}
                    error={errors.descripcion?.message}
                />

                <Input
                    label="Repositorio"
                    placeholder="https://github.com/usuario/repositorio"
                    {...register("repoUrl")}
                    error={errors.repoUrl?.message}
                />

                <CourseSearchInput
                    onSelect={(course) => {
                        setValue("courseId", course.id, { shouldValidate: true });
                    }}
                    error={errors.courseId?.message}
                />

                <TagInput value={tags} onChange={handleTagsChange} error={errors.tags?.message} />
                <input type="hidden" {...register("tags")} />

                <FileUpload
                    value={files}
                    onChange={handleFilesChange}
                    error={errors.files?.message}
                />

                <input type="hidden" {...register("files")} />

                <Button
                    type="submit"
                    className="w-full py-4"
                    isLoading={isSubmitting}
                >
                    Crear Proyecto
                </Button>
            </form>
        </div>
    );
};