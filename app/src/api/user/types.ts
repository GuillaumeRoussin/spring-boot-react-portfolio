import * as z from "zod";


export const UserMeSchemaResponse = z.object({
    id: z.number(),
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    profile: z.boolean(),
    authorities: z.array(z.object({
        authority: z.string()
    }))
});

export type UserMeResponse = z.infer<typeof UserMeSchemaResponse>;