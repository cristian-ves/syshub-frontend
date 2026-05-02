import { z } from "zod";

export const createArticleSchema = z.object({
    titulo: z
        .string()
        .min(10, "El título debe tener al menos 10 caracteres")
        .max(100),
    extracto: z
        .string()
        .min(20, "El extracto debe ser más descriptivo")
        .max(255),
    contenido: z
        .string()
        .min(50, "El contenido es muy corto para ser un artículo"),
    courseId: z.number({ required_error: "Debes seleccionar un curso" }),
    status: z.enum(["DRAFT", "PUBLISHED"]).default("PUBLISHED"),
    tags: z
        .array(
            z.object({
                nombre: z.string(),
                color: z.string(),
            })
        )
        .min(1, "Agrega al menos una etiqueta"),
});

export type CreateArticleFormValues = z.infer<typeof createArticleSchema>;
