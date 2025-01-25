import { z } from "zod";

export type IZodSchema<T> = {
  [K in keyof T]: z.ZodType<any, any, T[K]>;
};
