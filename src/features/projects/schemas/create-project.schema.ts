import { z } from "zod";

export const createProjectSchema = z.object({
    titulo: z.string().min(1, "El título es obligatorio"),
    descripcion: z.string().min(1, "La descripción es obligatoria"),
    repoUrl: z.string().url("Debe ser una URL válida"),
    courseId: z.coerce.number().min(1, "Selecciona un curso"),
    tags: z
        .array(
            z.object({
                nombre: z.string().min(1, "Nombre requerido"),
                color: z.string().optional(),
            })
        )
        .min(1, "Agrega al menos una tag"),
    files: z.any().optional(),
});

export type CreateProjectFormValues = z.infer<typeof createProjectSchema>;
