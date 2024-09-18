import * as z from "zod";


export const UserDefaultSchemaResponse = z.object({
    id: z.number(),
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    profile: z.boolean()
});

export type UserDefaultResponse = z.infer<typeof UserDefaultSchemaResponse>;