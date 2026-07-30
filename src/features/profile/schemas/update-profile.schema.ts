import { z } from "zod";

export const updateProfileSchema = z
    .object({
        fullName: z.string().min(1, "The name is required"),
        username: z
            .string()
            .min(4, "The username must have at least 4 characters"),
        email: z.string().email("The email is invalid"),
        academicRecord: z
            .string()
            .length(9, "The academic record must contain exactly 9 digits")
            .regex(/^\d+$/, "You can only use digits"),
        majorId: z.coerce.number().min(1),

        password: z
            .string()
            .transform((val) => (val === "" ? undefined : val))
            .optional()
            .refine((val) => !val || val.length >= 8, {
                message: "The password must contain at least 8 characters",
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
            message: "The passwords must match",
            path: ["confirmPassword"],
        }
    );

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;
