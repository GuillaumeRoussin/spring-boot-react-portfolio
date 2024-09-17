import * as z from "zod";

export const SigninSchemaInput = z.object({
    email: z.string().email({message: "Username must be a valid email"}),
    password: z.string().min(2)
});


export type SigninInput = z.infer<typeof SigninSchemaInput>;

export const SigninSchemaResponse = z.object({
    token: z.string(),
    expiresIn: z.number(),
});

export const SignupSchemaInput = z.object({
    email: z.string().email({message: "Username must be a valid email"}),
    password: z.string()
        .min(8, 'Password must be at least 8 characters long')
        .max(30, 'Password must be less than 30 characters long')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one digit')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
        .refine(value => !/\s/.test(value), 'Password must not contain whitespace'),
    firstName: z.string({message: "The length of first name must be between 2 and 100 characters."}).min(2).max(100),
    lastName: z.string({message: "The length of first name must be between 2 and 100 characters."}).min(2).max(100)
});


export type SignupInput = z.infer<typeof SignupSchemaInput>;

export const SignupSchemaResponse = z.object({
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
});