import * as z from "zod";

export const LocationDetailsSchemaInput = z.object({
    name: z.string(),
    description: z.string()
});

export type LocationDetailsInput = z.infer<typeof LocationDetailsSchemaInput>;