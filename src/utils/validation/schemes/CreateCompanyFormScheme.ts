import { z } from "zod";
import { IZodSchema } from "@/const/interfaces/IZodSchema.ts";
import { CompanyModel } from "@/const/models/CompanyModel.ts";

const nonemptyMessage = "field is required";

const CreateCompanyFormScheme: z.ZodObject<IZodSchema<CompanyModel>> = z.object(
  {
    companyName: z
      .string()
      .nonempty(nonemptyMessage)
      .min(2, "min value length 2")
      .max(16, "max value length 16"),
    nip: z.string().optional(),
    customerCareEmail: z.string().email().optional(),
    countryId: z.number().optional(),
  },
);

export default CreateCompanyFormScheme;
