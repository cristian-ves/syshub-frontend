import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAppDispatch } from "../../store";
import { createArticleThunk } from "../../store/slices/articleSlice";
import {
    createArticleSchema,
    type CreateArticleFormValues,
} from "../../features/articles/schemas/create-article.schema";

export const useCreateArticle = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [tags, setTags] = useState<{ nombre: string; color: string }[]>([]);

    const form = useForm<CreateArticleFormValues>({
        resolver: zodResolver(createArticleSchema) as any,
        defaultValues: {
            titulo: "",
            extracto: "",
            contenido: "",
            status: "PUBLISHED",
            tags: [],
        },
    });

    const handleTagsChange = (newTags: any[]) => {
        setTags(newTags);
        form.setValue("tags", newTags, { shouldValidate: true });
    };

    const onSubmit = async (data: CreateArticleFormValues) => {
        try {
            await dispatch(createArticleThunk(data)).unwrap();
            toast.success("¡Artículo publicado con éxito!");
            navigate("/articles");
        } catch (error: any) {
            toast.error(error || "Error al crear el artículo");
        }
    };

    return {
        ...form,
        tags,
        handleTagsChange,
        onSubmit,
        isSubmitting: form.formState.isSubmitting,
    };
};
