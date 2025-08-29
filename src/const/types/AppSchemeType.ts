import { z } from "zod";

import { IZodSchema } from "@/const/interfaces/IZodSchema.ts";

export type AppSchemeType<T> = z.ZodObject<
  IZodSchema<T> & Record<string, z.ZodType<any, any, any>>
>;
