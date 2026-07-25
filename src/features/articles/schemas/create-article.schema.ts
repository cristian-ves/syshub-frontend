import { z } from "zod";

export const createArticleSchema = z.object({
    title: z.string().min(10, "The title must contain at least 10 characters"),
    excerpt: z
        .string()
        .min(20, "The excerpt must contain at least 20 characters"),
    content: z.string().min(50, "The content is too short"),
    courseId: z.coerce.number().min(1, "Choose a course"),
    status: z.enum(["DRAFT", "PUBLISHED"]),
    tags: z
        .array(
            z.object({
                name: z.string().min(1, "The name is required"),
                color: z.string().optional(),
            })
        )
        .min(1, "Add at least 1 tag"),
});

export type CreateArticleFormValues = z.infer<typeof createArticleSchema>;
