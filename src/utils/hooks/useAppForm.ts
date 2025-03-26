import { useForm } from "react-hook-form";
import { z } from "zod";
import { IZodSchema } from "@/const/interfaces/IZodSchema.ts";
import { UseFormProps } from "react-hook-form/dist/types";

export default function useAppForm<T>(props?: UseFormProps<any>) {
  return useForm<z.output<z.ZodObject<IZodSchema<T>>>>(props);
}
