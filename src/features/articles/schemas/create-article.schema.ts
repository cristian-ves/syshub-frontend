import { z } from "zod";

export const createArticleSchema = z.object({
    titulo: z.string().min(10, "El título debe tener al menos 10 caracteres"),
    extracto: z
        .string()
        .min(20, "El extracto debe tener al menos 20 caracteres"),
    contenido: z.string().min(50, "El contenido es demasiado corto"),
    courseId: z.coerce.number().min(1, "Selecciona un curso"),
    status: z.enum(["DRAFT", "PUBLISHED"]),
    tags: z
        .array(
            z.object({
                nombre: z.string().min(1, "Nombre requerido"),
                color: z.string().optional(),
            })
        )
        .min(1, "Agrega al menos una etiqueta"),
});

export type CreateArticleFormValues = z.infer<typeof createArticleSchema>;
