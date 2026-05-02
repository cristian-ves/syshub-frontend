// src/pages/articles/EditArticlePage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ChevronLeft } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '../../store';
import { updateArticleThunk } from '../../store/slices/articleSlice';

import { ArticleForm } from '../../features/articles/components/ArticleForm';
import { createArticleSchema, type CreateArticleFormValues } from '../../features/articles/schemas/create-article.schema';
import { useArticleDetail } from '../../hooks/articles/useArticleDetails';

export const EditArticlePage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { user } = useAppSelector(state => state.auth);
    const { article, loading } = useArticleDetail(slug);

    const [tags, setTags] = useState<{ nombre: string; color: string }[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formMethods = useForm<CreateArticleFormValues>({
        resolver: zodResolver(createArticleSchema) as any,
    });

    useEffect(() => {
        if (article) {
            const formattedTags = article.tags.map(t => ({
                nombre: t.nombre,
                color: t.color || "#4f46e5"
            }));

            formMethods.reset({
                titulo: article.titulo,
                extracto: article.extracto,
                contenido: article.contenido,
                courseId: article.curso.id,
                status: article.status || "PUBLISHED",
                tags: formattedTags
            });

            setTags(formattedTags);
        }
    }, [article, formMethods]);

    const isOwner = user?.id === article?.autor?.id;
    const isAdmin = user?.role === "ROLE_ADMIN" || user?.role === "ROLE_AUXILIAR";

    if (!loading && article && !isOwner && !isAdmin) {
        toast.error("No tienes permisos para editar este artículo");
        navigate(`/articles/${slug}`, { replace: true });
        return null;
    }

    if (loading) return <div className="py-20 text-center animate-pulse text-slate-500 font-medium">Cargando editor...</div>;
    if (!article) return <div className="py-20 text-center text-slate-500">Artículo no encontrado</div>;

    const onSubmit = async (data: CreateArticleFormValues) => {
        try {
            setIsSubmitting(true);
            await dispatch(updateArticleThunk({ id: article.id, data })).unwrap();
            toast.success("Artículo actualizado correctamente");
            navigate(`/articles/${article.slug}`);
        } catch (error: any) {
            toast.error(error || "Error al actualizar el artículo");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleTagsChange = (newTags: any[]) => {
        setTags(newTags);
        formMethods.setValue('tags', newTags, { shouldValidate: true });
    };

    return (
        <div className="w-full py-10 animate-in fade-in slide-in-from-bottom-4">
            <header className="mb-12">
                <button
                    onClick={() => navigate(-1)}
                    className="cursor-pointer flex items-center gap-2 text-slate-500 hover:text-brand-blue transition-colors mb-6 text-sm font-medium"
                >
                    <ChevronLeft size={16} />
                    Cancelar Edición
                </button>
                <h1 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white mt-2">
                    Editar <span className="text-brand-blue">Artículo</span>
                </h1>
            </header>

            <ArticleForm
                formMethods={formMethods as any}
                onSubmit={onSubmit}
                isSubmitting={isSubmitting}
                tags={tags}
                onTagsChange={handleTagsChange}
                submitLabel="Guardar Cambios"
                initialCourse={{ id: article.curso.id, nombre: article.curso.nombre }}
            />
        </div>
    );
};