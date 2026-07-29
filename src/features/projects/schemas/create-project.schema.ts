import { z } from "zod";

export const createProjectSchema = z.object({
    title: z.string().min(1, "The title is required"),
    description: z.string().min(1, "The description is required"),
    repoUrl: z.string().url("The url must be valid"),
    courseId: z.coerce.number().min(1, "You must choose a course"),
    tags: z
        .array(
            z.object({
                name: z.string().min(1, "The name is required"),
                color: z.string().optional(),
            })
        )
        .min(1, "Add at least one tag"),
    files: z.array(z.instanceof(File)).optional(),
});

export type CreateProjectFormValues = z.infer<typeof createProjectSchema>;
