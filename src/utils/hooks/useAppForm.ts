import { useForm } from "react-hook-form";
import { z } from "zod";
import { IZodSchema } from "@/const/interfaces/IZodSchema.ts";

export default function useAppForm<T>(props) {
  return useForm<z.output<z.ZodObject<IZodSchema<T>>>>(props);
}
