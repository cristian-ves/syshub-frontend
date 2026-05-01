import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAppDispatch } from "../store";
import {
    createProjectSchema,
    type CreateProjectFormValues,
} from "../features/projects/schemas/create-project.schema";
import { createProject } from "../store/slices/projectSlice";

export const useCreateProject = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [tags, setTags] = useState<{ nombre: string; color: string }[]>([]);
    const [files, setFiles] = useState<File[]>([]);

    const form = useForm<CreateProjectFormValues>({
        resolver: zodResolver(createProjectSchema) as any,
        defaultValues: { tags: [], titulo: "", descripcion: "", repoUrl: "" },
    });

    const handleTagsChange = (newTags: any[]) => {
        setTags(newTags);
        form.setValue("tags", newTags, { shouldValidate: true });
    };

    const handleFilesChange = (newFiles: File[]) => {
        setFiles(newFiles);
        form.setValue("files", newFiles, { shouldValidate: true });
    };

    const onSubmit = async (data: CreateProjectFormValues) => {
        if (tags.length === 0) {
            toast.error("Debes agregar al menos una etiqueta");
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

            data.files?.forEach((file: File) => {
                formData.append("files", file);
            });

            await dispatch(createProject(formData)).unwrap();
            toast.success("¡Proyecto publicado con éxito!");
            navigate("/profile/projects");
        } catch (error: any) {
            toast.error(error || "Error al crear el proyecto");
        }
    };

    return {
        ...form,
        tags,
        files,
        handleTagsChange,
        handleFilesChange,
        onSubmit: form.handleSubmit(onSubmit),
        isSubmitting: form.formState.isSubmitting,
    };
};
