import { z } from "zod";

export const updateProfileSchema = z
    .object({
        nombreCompleto: z.string().min(1, "El nombre es obligatorio"),
        username: z.string().min(4, "Mínimo 4 caracteres"),
        email: z.string().email("Correo inválido"),
        registroAcademico: z
            .string()
            .length(9, "Debe tener 9 dígitos")
            .regex(/^\d+$/, "Solo números"),
        carreraId: z.coerce.number().min(1),

        password: z
            .string()
            .transform((val) => (val === "" ? undefined : val))
            .optional()
            .refine((val) => !val || val.length >= 8, {
                message: "Mínimo 8 caracteres",
            }),
        confirmPassword: z
            .string()
            .optional()
            .or(z.literal(""))
            .transform((val) => (val === "" ? undefined : val)),
    })
    .refine(
        (data) => {
            if (!data.password) return true;
            return data.password === data.confirmPassword;
        },
        {
            message: "Las contraseñas no coinciden",
            path: ["confirmPassword"],
        }
    );

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;
