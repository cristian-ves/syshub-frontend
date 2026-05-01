import { z } from "zod";

const baseUserSchema = z.object({
    nombreCompleto: z.string().min(3, "El nombre es muy corto"),
    username: z.string().min(3, "El usuario es muy corto"),
    email: z.string().email("Correo inválido"),
    registroAcademico: z
        .string()
        .min(1, "El registro académico es obligatorio")
        .regex(/^\d{9}$/, "Debe tener exactamente 9 dígitos numéricos"),
    rolId: z.coerce.number().min(1, "Selecciona un rol"),
    carreraId: z.coerce.number().min(1, "Selecciona una carrera"),
    enabled: z.boolean().default(true),
});

export const createUserSchema = baseUserSchema.extend({
    password: z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export const updateUserSchema = baseUserSchema.extend({
    password: z
        .string()
        .min(8, "Mínimo 8 caracteres")
        .optional()
        .or(z.literal("")),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;
export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;
