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
import { SheToggleTypeEnum } from "@/const/enums/SheToggleTypeEnum.ts";
import {
  ProductDefaultModel,
  ProductModel,
} from "@/const/models/ProductModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { IProductConfigurationForm } from "@/const/interfaces/forms/IProductConfigurationForm.ts";

export default function ProductConfigurationForm({
  data,
  countryCodes,
  brands,
  categories,
  productCode,
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
  });

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    setValue("productCode", productCode);
  }, [productCode]);

  // ==================================================================== PRIVATE
  function svgStringToComponent(svgString: string): React.FC<any> {
    return (props) => (
      <span dangerouslySetInnerHTML={{ __html: svgString }} {...props} />
    );
  }

  // --------------------------------------------- MODEL CONVERTORS
  function convertCountryCodeToSelectItems(
    data: CountryCodeModel[],
  ): ISheSelectItem<any>[] {
    return data?.map(
      (item): ISheSelectItem<any> => ({
        value: item.countryId,
        text: item.countryName,
        icon: svgStringToComponent(item.flagIcon),
      }),
    );
  }

  function convertBrandsCodeToSelectItems(
    data: BrandModel[],
  ): ISheSelectItem<any>[] {
    return data?.map(
      (item): ISheSelectItem<any> => ({
        value: item.brandId,
        text: item.brandName,
      }),
    );
  }

  function convertCategoriesCodeToSelectItems(
    data: CategoryModel[],
  ): ISheSelectItem<any>[] {
    return data?.map(
      (item): ISheSelectItem<any> => ({
        value: item.categoryId,
        text: item.categoryName,
      }),
    );
  }

  // ==================================================================== LAYOUT
  return (
    <SheForm<ProductModel>
      id="USER_FORM"
      className={cs.productConfigurationForm}
      form={form}
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
      onSubmit={onSubmit}
      onCancel={onCancel}
    >
      <SheFormField
        name="productName"
        required
        render={({ field }) => (
          <SheInput
            label="Product Name"
            labelTransKey="ProductForm.Labels.ProductName"
            placeholder="enter product name..."
            placeholderTransKey="ProductForm.Placeholders.ProductName"
            value={field.value}
            fullWidth
          />
        )}
      />
      <div className={cs.componentWithButton}>
        <SheFormField
          name="productCode"
          render={({ field }) => (
            <SheInput
              label="Product Code"
              labelTransKey="ProductForm.Labels.ProductCode"
              placeholder="enter product code..."
              placeholderTransKey="ProductForm.Placeholders.ProductCode"
              value={field.value || ""}
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
            label="Product Barcode"
            labelTransKey="ProductForm.Labels.ProductBarcode"
            placeholder="enter product barcode..."
            placeholderTransKey="ProductForm.Placeholders.ProductBarcode"
            value={field.value || ""}
            fullWidth
          />
        )}
      />
      <div className={cs.componentWithButton}>
        <SheFormField
          name="productCategoryId"
          render={({ field }) => (
            <SheSelect
              label="Category Name"
              labelTransKey="ProductForm.Labels.CategoryName"
              placeholder="enter category name..."
              placeholderTransKey="ProductForm.Placeholders.SelectCategory"
              items={convertCategoriesCodeToSelectItems(categories)}
              selected={field.value}
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
              label="Brand Name"
              labelTransKey="ProductForm.Labels.BrandName"
              placeholder="enter brand name..."
              placeholderTransKey="ProductForm.Placeholders.SelectBrand"
              items={convertBrandsCodeToSelectItems(brands)}
              selected={field.value}
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
        name="countryId"
        render={({ field }) => (
          <SheSelect
            label="Country of origin"
            labelTransKey="ProductForm.Labels.CountryOfOrigin"
            placeholder="select country of origin..."
            placeholderTransKey="ProductForm.Placeholders.CountryOfOrigin"
            items={convertCountryCodeToSelectItems(countryCodes)}
            selected={field.value}
            hideFirstOption
            fullWidth
          />
        )}
      />
      <div>
        <SheFormField
          name="isActive"
          ignoreFormAction
          render={({ field }) => (
            <SheToggle
              text="Is Active"
              textTransKey="ProductForm.Labels.IsActive"
              checked={field.value}
              type={SheToggleTypeEnum.SWITCH}
              onChecked={(value) => {
                field.onChange(value);
              }}
            />
          )}
        />
      </div>
    </SheForm>
  );
}
