import { z } from "zod";

export const registerSchema = z
    .object({
        fullName: z.string().min(1, "The name is required").max(100),
        username: z
            .string()
            .min(4, "The username must contain between 4 and 50 characters")
            .max(50),
        academicRecord: z
            .string()
            .length(9, "The academic record must contain 9 digits")
            .regex(/^\d+$/, "You can only use digits"),
        email: z
            .string()
            .min(1, "The email is required")
            .email("The email format is invalid"),
        majorId: z.coerce.number().min(1, "Choose a major"),
        password: z
            .string()
            .min(8, "Password must contain at least 8 characters"),
        confirmPassword: z.string().min(1, "Confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "The passwords must coincide",
        path: ["confirmPassword"],
    });

export type RegisterFormValues = z.infer<typeof registerSchema>;
