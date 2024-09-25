import {z} from 'zod';

export const pageableSchema = z.object({
    page: z.object({
        size: z.number(),
        number: z.number(),
        totalElements: z.number(),
        totalPages: z.number()
    })
});