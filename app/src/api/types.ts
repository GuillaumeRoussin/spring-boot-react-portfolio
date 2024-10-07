import {z} from 'zod';

export const PageableSchema = z.object({
    page: z.object({
        size: z.number(),
        number: z.number(),
        totalElements: z.number(),
        totalPages: z.number()
    })
});

export type PaginationParams = {
    page: number
    size: number
}