import { MoreHorizontal } from "lucide-react";
import { useForm } from "react-hook-form";
import React from "react";
import { useTranslation } from "react-i18next";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./AddStockCard.module.scss";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { Switch } from "@/components/ui/switch.tsx";
import image from "@/assets/images/AuthLogo.png";
import { IAddStockCard } from "@/const/interfaces/complex-components/custom-cards/IAddStockCard.ts";
import { SheForm } from "@/components/forms/she-form/SheForm.tsx";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { PriceTypeModel } from "@/const/models/PriceTypeModel.ts";

export default function AddStockCard({
  isLoading,
  variant,
  onAction,
  taxTypes,
  currencyTypes,
  onSecondaryButtonClick,
  ...props
}: IAddStockCard) {
  const { t } = useTranslation();
  const purchasePriceType: PriceTypeModel[] = [
    { priceTypeId: 1, priceTypeName: "Netto" },
    { priceTypeId: 2, priceTypeName: "Brutto" },
  ];

  const form = useForm({
    defaultValues: {
      unitAmount: 1,
      priceModel: {
        price: 0,
        taxTypeId: taxTypes?.[4].id,
        priceType: purchasePriceType?.[0].priceTypeName,
        currencyId: currencyTypes?.[0]?.id,
      },
      purchaseId: null,
    },
  });

  function onSubmit(data) {
    const formattedData = {
      ...data,
      unitAmount: Number(data.unitAmount) || 0,
      priceModel: {
        price: Number(data.priceModel.price) || 0,
        taxTypeId: Number(data.priceModel.taxTypeId) || 0,
        priceType: data.priceModel.priceType,
        currencyId: Number(data.priceModel.currencyId) || 0,
      },
      purchaseId: Number(data.purchaseId) || 17,
    };
    onAction("increaseStockAmount", { variant, formattedData });
  }

  return (
    <SheProductCard
      loading={isLoading}
      title={`${t("StockActions.AddToStock")} ${variant?.variantName} ${t("SectionTitles.Product")}`}
      showPrimaryButton={true}
      primaryButtonTitle={t("StockActions.AddToStock")}
      showSecondaryButton={true}
      onPrimaryButtonClick={form.handleSubmit(onSubmit)}
      onSecondaryButtonClick={onSecondaryButtonClick}
      showCloseButton
      className={cs.addStockCard}
      {...props}
    >
      <div className={cs.addStockCardContent}>
        <SheForm form={form as any} onSubmit={onSubmit}>
          <div className={cs.addStockConfigurationForm}>
            <SheForm.Field name="unitAmount">
              <SheInput
                label={t("PurchaseForm.Labels.Units")}
                type="number"
                fullWidth
                onDelay={() => {
                  form.handleSubmit(onSubmit);
                }}
              />
            </SheForm.Field>
            <div>
              <span className="she-title">{t("PurchaseForm.Labels.PurchasePrice")}</span>
            </div>
            <div className={cs.purchasePriceFormRow}>
              <div className={cs.formRowItem}>
                <SheForm.Field label={t("PurchaseForm.Labels.PurchasePrice")} name="priceModel.price">
                  <SheInput
                    type="number"
                    placeholder={t("PurchaseForm.Placeholders.PurchasePrice")}
                    onDelay={() => form.handleSubmit(onSubmit)}
                  />
                </SheForm.Field>
              </div>
              <div className={cs.formRowItem}>
                <FormField
                  control={form.control}
                  name="priceModel.taxTypeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("PurchaseForm.Labels.Tax")}</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value ? field.value.toString() : ""}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("SelectOptions.SelectVAT")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {taxTypes?.map((taxType) => (
                            <SelectItem
                              key={taxType.id}
                              value={taxType.id.toString()}
                            >
                              <div>{taxType.name}</div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <div className={cs.formRowItem}>
                <FormField
                  control={form.control}
                  name="priceModel.priceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Netto/Brutto</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value ? field.value.toString() : ""}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("SelectOptions.SelectPriceType")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {purchasePriceType?.map((price) => (
                            <SelectItem
                              key={price.priceTypeId}
                              value={price.priceTypeName.toString()}
                            >
                              <div>{price.priceTypeName}</div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                ></FormField>
              </div>
            </div>
            <FormField
              control={form.control}
              name="priceModel.currencyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("PurchaseForm.Labels.Currency")}</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value ? field.value.toString() : ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("SelectOptions.SelectCurrency")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {currencyTypes?.map((currencyType) => (
                        <SelectItem
                          key={currencyType.id}
                          value={currencyType.id.toString()}
                        >
                          <div>{currencyType.name}</div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            ></FormField>
            <div className={cs.purchaseDetailsBlock}>
              <div>
                <span className="she-title">{t("PurchaseForm.Labels.PurchaseDetails")}</span>
              </div>
              <div>
                <SheInput fullWidth label={t("PurchaseForm.Labels.InvoiceNumber")} />
              </div>
              <div className={cs.supplierInformationBlock}>
                <SheInput
                  fullWidth
                  label={t("PurchaseForm.Labels.PurchaseDate")}
                />
                <div className={cs.supplierInformationBlock}>
                  <span className="she-text">
                    {t("PurchaseForm.Labels.SupplierSelection")}
                  </span>
                  <div className={cs.supplierInformation}>
                    <div>
                      <img src={image as any} alt="" />
                    </div>
                    <span className="she-subtext">
                      Babylon Srl VIA DEI NOTAI 135-137 BL, Centergross, 30,
                      Italy
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SheButton
                          variant="secondary"
                          className="flex h-8 p-0 data-[state=open]:bg-muted"
                        >
                          <MoreHorizontal />
                        </SheButton>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-[160px]">
                        <DropdownMenuItem
                          onClick={() => onAction("deleteTrait")}
                        >
                          <span className="she-text">{t("CommonButtons.Delete")}</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className={cs.createPurchaseToggleBlock}>
                    <div className={cs.createPurchaseToggle}>
                      <Switch />
                    </div>
                    <div className={cs.createPurchaseToggleDesc}>
                      <span className="she-subtext">{t("SpecialText.CreatePurchase")}</span>
                      <span className="she-subtext">
                        {t("SpecialText.CreatePurchaseDescription")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SheForm>
      </div>
    </SheProductCard>
  );
}
