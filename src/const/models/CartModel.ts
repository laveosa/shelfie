import { CustomerModel } from "@/const/models/CustomerModel.ts";
import { CurrencyModel } from "@/const/models/CurrencyModel.ts";
import { TraitOptionModel } from "@/const/models/TraitOptionModel.ts";
import { ImageModel } from "@/const/models/ImageModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";

export interface CartModel {
  id?: number;
  customerId?: number;
  customer?: CustomerModel;
  date?: string;
  status?: string;
  unitsAmount?: number;
  sumAmount?: number;
  currency?: CurrencyModel;
  profit?: number;
  countdown?: string;
  prepackedCartStatus?: string;
  stockActions?: [
    {
      stockActionId?: number;
      productId?: number;
      variantId?: number;
      variantName?: string;
      variantCode?: string;
      traitOptions?: TraitOptionModel[];
      photo?: ImageModel;
      unitsAmount?: number;
      brand?: BrandModel;
      productCategory?: CategoryModel;
      stockDocumentPrice?: {
        id?: number;
        brutto?: number;
        taxAmount?: number;
        netto?: number;
        currencyId?: number;
        taxTypeId?: number;
        rateExchange?: number;
        activeUntil?: string;
        createAt?: string;
        currencyName?: string;
        taxTypeName?: string;
      };
      requestedPrice?: {
        id?: number;
        brutto?: number;
        taxAmount?: number;
        netto?: number;
        currencyId?: number;
        taxTypeId?: number;
        rateExchange?: number;
        activeUntil?: string;
        createAt?: string;
        currencyName?: string;
        taxTypeName?: string;
      };
      variantStockActions?: any[];
    },
  ];
}
