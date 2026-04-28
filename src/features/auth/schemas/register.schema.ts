import { z } from "zod";

export const registerSchema = z
    .object({
        nombreCompleto: z.string().min(1, "El nombre es obligatorio").max(100),
        username: z
            .string()
            .min(4, "El usuario debe tener al menos 4 caracteres")
            .max(50),
        registroAcademico: z
            .string()
            .length(9, "El carné debe tener exactamente 9 dígitos")
            .regex(/^\d+$/, "Solo se permiten números"),
        email: z
            .string()
            .min(1, "El correo es obligatorio")
            .email("Formato de correo inválido"),
        idCarrera: z.coerce.number().min(1, "Selecciona una carrera"),
        password: z.string().min(8, "Mínimo 8 caracteres"),
        confirmPassword: z.string().min(1, "Confirma tu contraseña"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    });

export type RegisterFormValues = z.infer<typeof registerSchema>;
