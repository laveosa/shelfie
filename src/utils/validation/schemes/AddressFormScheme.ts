import { z } from "zod";

import { AddressRequestModel } from "@/const/models/AddressRequestModel";
import { AppSchemeType } from "@/const/types/AppSchemeType.ts";

const nonemptyMessage = "field is required";

const addressFormScheme: AppSchemeType<AddressRequestModel> = z.object({
  addressId: z.number().optional(),
  alias: z
    .string()
    .nonempty(nonemptyMessage)
    .min(2, "Min value length 2")
    .max(50, "Max value length 50"),
  addressLine1: z
    .string()
    .nonempty(nonemptyMessage)
    .min(5, "Min value length 5")
    .max(100, "Max value length 100"),
  addressLine2: z.string().max(100, "Max value length 100").optional(),
  city: z
    .string()
    .nonempty(nonemptyMessage)
    .min(2, "Min value length 2")
    .max(50, "Max value length 50"),
  state: z
    .string()
    .nonempty(nonemptyMessage)
    .min(2, "Min value length 2")
    .max(50, "Max value length 50"),
  postalCode: z
    .string()
    .nonempty(nonemptyMessage)
    .min(3, "Min value length 3")
    .max(10, "Max value length 10"),
  countryId: z.number().min(1, "Country is required"),
});

export default addressFormScheme;
