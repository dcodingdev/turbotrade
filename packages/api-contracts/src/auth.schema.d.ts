import { z } from 'zod';
export declare const RegisterSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
    role: z.ZodOptional<z.ZodEnum<["vendor", "customer"]>>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name: string;
    role?: "vendor" | "customer" | undefined;
}, {
    email: string;
    password: string;
    name: string;
    role?: "vendor" | "customer" | undefined;
}>;
export declare const LoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
