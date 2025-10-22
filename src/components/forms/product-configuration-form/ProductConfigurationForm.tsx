import React, { JSX, useEffect } from "react";

import { CheckCheck, Plus, WandSparkles } from "lucide-react";

import cs from "./ProductConfigurationForm.module.scss";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheFormField from "@/components/complex/she-form/components/she-form-field/SheFormField.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheToggle from "@/components/primitive/she-toggle/SheToggle.tsx";
import productConfigurationFormScheme from "@/utils/validation/schemes/ProductConfigurationFormScheme.ts";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { ReactHookFormMode } from "@/const/enums/ReactHookFormMode.ts";
import { SheToggleTypeEnum } from "@/const/enums/SheToggleTypeEnum.ts";
import {
  ProductDefaultModel,
  ProductModel,
} from "@/const/models/ProductModel.ts";
import { IProductConfigurationForm } from "@/const/interfaces/forms/IProductConfigurationForm.ts";

export default function ProductConfigurationForm({
  data,
  categories,
  brands,
  countryCodes,
  productCode,
  selectedCategory,
  showSecondaryButton,
  onSubmit,
  onCancel,
  onAction,
}: IProductConfigurationForm): JSX.Element {
  // ==================================================================== UTILITIES
  const { form, isDisabled, setValue } = useAppForm<ProductModel>({
    values: data,
    defaultValues: ProductDefaultModel,
    scheme: productConfigurationFormScheme,
    mode: ReactHookFormMode.CHANGE,
  });

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    if (data?.productId) {
      form.reset(data);
    } else form.reset(ProductDefaultModel);
  }, [data]);

  useEffect(() => {
    if (selectedCategory) setValue("productCategoryId", selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    setValue("productCode", productCode);
  }, [productCode]);

  // ==================================================================== LAYOUT
  return (
    <SheForm<ProductModel>
      form={form}
      className={cs.productConfigurationForm}
      footerClassName={
        data?.productId ? cs.formFooterTwoButton : cs.formFooterOneButton
      }
      footerPosition={DirectionEnum.RIGHT}
      primaryBtnProps={{
        value: data?.productId ? "Save" : "Add Product",
        valueTransKey: data?.productId
          ? "CommonButtons.Save"
          : "ProductActions.AddProduct",
        icon: CheckCheck,
        disabled: isDisabled,
      }}
      hideSecondaryBtn={!data || !data.productId || !showSecondaryButton}
      onCancel={onCancel}
      onSubmit={onSubmit}
    >
      <SheFormField
        name="productName"
        required
        render={({ field }) => (
          <SheInput
            value={field.value}
            label="Product Name"
            labelTransKey="ProductForm.Labels.ProductName"
            placeholder="enter product name..."
            placeholderTransKey="ProductForm.Placeholders.ProductName"
            autoFocus
            fullWidth
          />
        )}
      />
      <div className={cs.componentWithButton}>
        <SheFormField
          name="productCode"
          render={({ field }) => (
            <SheInput
              value={field.value || ""}
              label="Product Code"
              labelTransKey="ProductForm.Labels.ProductCode"
              placeholder="enter product code..."
              placeholderTransKey="ProductForm.Placeholders.ProductCode"
              fullWidth
              onDelay={(value) => onAction("checkProductCode", value)}
            />
          )}
        />
        <SheButton
          className={cs.formButton}
          icon={WandSparkles}
          type="button"
          variant="outline"
          onClick={() => onAction("generateProductCode")}
        />
      </div>
      <SheFormField
        name="barcode"
        render={({ field }) => (
          <SheInput
            value={field.value || ""}
            label="Product Barcode"
            labelTransKey="ProductForm.Labels.ProductBarcode"
            placeholder="enter product barcode..."
            placeholderTransKey="ProductForm.Placeholders.ProductBarcode"
            fullWidth
          />
        )}
      />
      <div className={cs.componentWithButton}>
        <SheFormField
          name="productCategoryId"
          render={({ field }) => (
            <SheSelect
              items={categories}
              selected={field.value}
              label="Category Name"
              labelTransKey="ProductForm.Labels.CategoryName"
              placeholder="enter category name..."
              placeholderTransKey="ProductForm.Placeholders.SelectCategory"
              hideFirstOption
              fullWidth
            />
          )}
        />
        <SheButton
          className={cs.formButton}
          icon={Plus}
          variant="outline"
          type="button"
          onClick={() => onAction("openCreateProductCategoryCard")}
        />
      </div>
      <div className={cs.componentWithButton}>
        <SheFormField
          name="brandId"
          render={({ field }) => (
            <SheSelect
              items={brands}
              selected={field.value}
              label="Brand Name"
              labelTransKey="ProductForm.Labels.BrandName"
              placeholder="enter brand name..."
              placeholderTransKey="ProductForm.Placeholders.SelectBrand"
              hideFirstOption
              fullWidth
            />
          )}
        />
        <SheButton
          className={cs.formButton}
          icon={Plus}
          variant="outline"
          type="button"
          onClick={() => onAction("openCreateProductBrandCard")}
        />
      </div>
      <SheFormField
        name="countryOfOriginId"
        render={({ field }) => (
          <SheSelect
            items={countryCodes}
            selected={field.value || selectedCategory}
            label="Country of origin"
            labelTransKey="ProductForm.Labels.CountryOfOrigin"
            placeholder="select country of origin..."
            placeholderTransKey="ProductForm.Placeholders.CountryOfOrigin"
            hideFirstOption
            fullWidth
          />
        )}
      />
      <SheFormField
        name="isActive"
        render={({ field }) => (
          <SheToggle
            checked={field.value}
            text="Is Active"
            textTransKey="ProductForm.Labels.IsActive"
            type={SheToggleTypeEnum.SWITCH}
          />
        )}
      />
    </SheForm>
  );
}
