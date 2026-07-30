import { z } from "zod";

const baseUserSchema = z.object({
    fullName: z.string().min(3, "The name is too short"),
    username: z.string().min(3, "The username is too short"),
    email: z.string().email("Invalid email"),
    academicRecord: z
        .string()
        .min(1, "The academic record is required")
        .regex(/^\d{9}$/, "It must contain exactly 9 digits"),
    roleId: z.coerce.number().min(1, "Choose a role"),
    majorId: z.coerce.number().min(1, "Choose a major"),
    enabled: z.boolean().default(true),
});

export const createUserSchema = baseUserSchema.extend({
    password: z
        .string()
        .min(8, "The password must contain at least 8 characters"),
});

export const updateUserSchema = baseUserSchema.extend({
    password: z
        .string()
        .min(8, "The password must contain at least 8 characters")
        .optional()
        .or(z.literal("")),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;
export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;
