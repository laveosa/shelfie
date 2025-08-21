import { z } from "zod";

import { IZodSchema } from "@/const/interfaces/IZodSchema.ts";

export type AppFormType<T> = z.output<z.ZodObject<IZodSchema<T>>>;
