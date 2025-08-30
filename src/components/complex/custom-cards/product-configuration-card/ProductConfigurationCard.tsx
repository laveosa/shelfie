import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Plus, WandSparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

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
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ProductConfigurationCard.module.scss";
import { SheForm } from "@/components/forms/she-form/SheForm.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { Switch } from "@/components/ui/switch.tsx";
import { IProductConfigurationCard } from "@/const/interfaces/complex-components/custom-cards/IProductConfigurationCard.ts";

export default function ProductConfigurationCard({
  isLoading,
  product,
  brandsList,
  categoriesList,
  productCode,
  showSecondaryButton,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  onAction,
}: IProductConfigurationCard) {
  const { t } = useTranslation();
  
  const form = useForm({
    defaultValues: {
      productName: "",
      productCode: null,
      barcode: "",
      productCategoryId: null,
      brandId: null,
      isActive: false,
    },
  });

  useEffect(() => {
    if (product && product.productId && product.productName) {
      form.reset({
        productName: product.productName || "",
        productCode: product.productCode || null,
        barcode: product.barcode || "",
        productCategoryId: product.productCategory?.categoryId || null,
        brandId: product.brand?.brandId || null,
        isActive: product.isActive || false,
      });
    } else {
      form.reset({
        productName: "",
        productCode: "",
        barcode: "",
        productCategoryId: null,
        brandId: null,
        isActive: false,
      });
    }
  }, [product]);

  useEffect(() => {
    if (productCode) {
      form.setValue("productCode", productCode);
    }
  }, [productCode, form]);

  return (
    <div>
      <SheProductCard
        loading={isLoading}
        className={cs.productConfigurationFormCard}
        title={product?.productId ? t("CardTitles.BasicProductData") : t("CardTitles.CreateProduct")}
        showCloseButton={showSecondaryButton}
        showPrimaryButton={true}
        primaryButtonTitle={product?.productId ? t("CommonButtons.Save") : t("ProductActions.AddProduct")}
        showSecondaryButton={!product?.productId || showSecondaryButton}
        secondaryButtonTitle={t("CommonButtons.Cancel")}
        onPrimaryButtonClick={form.handleSubmit(onPrimaryButtonClick)}
        onSecondaryButtonClick={onSecondaryButtonClick}
      >
        <div className={cs.productConfigurationForm}>
          <SheForm form={form}>
            <SheForm.Field
              rules={{
                required: true,
                minLength: {
                  value: 3,
                  message: t("ProductForm.Validation.ProductNameMinLength"),
                },
                maxLength: {
                  value: 50,
                  message: t("ProductForm.Validation.ProductNameMaxLength"),
                },
              }}
              name="productName"
            >
              <SheInput
                label={t("ProductForm.Labels.ProductName")}
                placeholder={t("ProductForm.Placeholders.ProductName")}
                isValid={!form.formState.errors.productName}
                patternErrorMessage={form.formState.errors.productName?.message}
                showError={true}
                fullWidth={true}
              />
            </SheForm.Field>
            <div className={cs.productConfigurationFormRow}>
              <SheForm.Field name="productCode">
                <SheInput
                  {...(form.register("productCode") as any)}
                  label={t("ProductForm.Labels.ProductCode")}
                  placeholder={t("ProductForm.Placeholders.ProductCode")}
                  isValid={!form.formState.errors.productCode}
                  patternErrorMessage={
                    form.formState.errors.productCode?.message
                  }
                  showError={true}
                  fullWidth={true}
                  onDelay={(value) => onAction("checkProductCode", value)}
                />
              </SheForm.Field>
              <SheButton
                icon={WandSparkles}
                type="button"
                variant="outline"
                onClick={() => onAction("generateProductCode")}
              />
            </div>
            <SheForm.Field name="barcode">
              <SheInput
                label={t("ProductForm.Labels.ProductBarcode")}
                placeholder={t("ProductForm.Placeholders.ProductBarcode")}
                fullWidth={true}
              />
            </SheForm.Field>
            <div className={cs.productConfigurationFormRow}>
              <FormField
                control={form.control}
                name="productCategoryId"
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("ProductForm.Labels.CategoryName")}</FormLabel>
                    <Select
                      key={form.watch("productCategoryId")}
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value ? field.value.toString() : ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("ProductForm.Placeholders.SelectCategory")}>
                            {categoriesList.find(
                              (item) =>
                                item.categoryId ===
                                form.watch("productCategoryId"),
                            )?.categoryName ?? t("ProductForm.Placeholders.SelectCategory")}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoriesList.map((option) => (
                          <SelectItem
                            key={option.categoryId}
                            value={option?.categoryId?.toString()}
                          >
                            {option.categoryName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              ></FormField>
              <SheButton
                icon={Plus}
                variant="outline"
                type="button"
                onClick={() => onAction("openCreateProductCategoryCard")}
              />
            </div>
            <div className={cs.productConfigurationFormRow}>
              <FormField
                control={form.control}
                name="brandId"
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("ProductForm.Labels.BrandName")}</FormLabel>
                    <Select
                      key={form.watch("brandId")}
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value ? field.value.toString() : ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("ProductForm.Placeholders.SelectBrand")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {brandsList.map((option) => (
                          <SelectItem
                            key={option.brandId}
                            value={option.brandId.toString()}
                          >
                            <div>{option.brandName}</div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              ></FormField>
              <SheButton
                icon={Plus}
                variant="outline"
                type="button"
                onClick={() => onAction("openCreateProductBrandCard")}
              />
            </div>
            <SheForm.Field name="isActive">
              <div
                className={`${cs.productConfigurationFormRow} ${cs.productConfigurationFormSwitch}`}
              >
                <Switch
                  checked={form.watch("isActive")}
                  onCheckedChange={(checked) =>
                    form.setValue("isActive", checked)
                  }
                />
                <div>{t("ProductForm.Labels.IsActive")}</div>
              </div>
            </SheForm.Field>
          </SheForm>
        </div>
      </SheProductCard>
    </div>
  );
}
