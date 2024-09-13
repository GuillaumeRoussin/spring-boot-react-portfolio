import * as z from "zod";

export const AuthenticationSchemaInput = z.object({
    email: z.string().email({message: "Username must be a valid email"}),
    password: z.string().min(2)
});


export type AuthenticationInput = z.infer<typeof AuthenticationSchemaInput>;

export const AuthenticationSchemaResponse = z.object({
    token: z.string(),
    expiresIn: z.number(),
});


export type AuthenticationResponse = z.infer<typeof AuthenticationSchemaResponse>;