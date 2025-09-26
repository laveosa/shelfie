import React, { JSX, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCheck, Plus, WandSparkles } from "lucide-react";

import {
  ProductDefaultModel,
  ProductModel
} from "@/const/models/ProductModel.ts";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import SheFormField
  from "@/components/complex/she-form/components/she-form-field/SheFormField.tsx";
import { ReactHookFormMode } from "@/const/enums/ReactHookFormMode.ts";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import {
  ISheSelectItem
} from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import cs from "./ProductConfigurationForm.module.scss";
import {
  IProductConfigurationForm
} from "@/const/interfaces/forms/IProductConfigurationForm.ts";
import productConfigurationFormScheme
  from "@/utils/validation/schemes/ProductConfigurationFormScheme.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import SheToggle from "@/components/primitive/she-toggle/SheToggle.tsx";
import { SheToggleTypeEnum } from "@/const/enums/SheToggleTypeEnum.ts";

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
  const { t } = useTranslation();
  const form = useAppForm<ProductModel>({
    mode: ReactHookFormMode.CHANGE,
    resolver: zodResolver(productConfigurationFormScheme),
    defaultValues: ProductDefaultModel,
  });

  useEffect(() => {
    if (data?.productId) {
      form.reset(data);
    } else {
      form.reset(ProductDefaultModel);
    }
  }, [data, form]);

  function svgStringToComponent(svgString: string): React.FC<any> {
    return (props) => (
      <span dangerouslySetInnerHTML={{ __html: svgString }} {...props} />
    );
  }

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

  useEffect(() => {
    form.reset(data);
  }, [data]);

  useEffect(() => {
    if (productCode) {
      form.setValue("productCode", productCode);
    }
  }, [productCode, form]);

  function onErrorHandler(model) {
    console.log(model);
  }

  return (
    <SheForm<ProductModel>
      id="USER_FORM"
      className={cs.productConfigurationForm}
      form={form}
      defaultValues={ProductDefaultModel}
      view={ComponentViewEnum.STANDARD}
      footerPosition={DirectionEnum.RIGHT}
      primaryBtnTitle={
        data?.productId
          ? t("CommonButtons.Save")
          : t("ProductActions.AddProduct")
      }
      primaryBtnProps={{
        icon: CheckCheck,
      }}
      hideSecondaryBtn={!data?.productId || showSecondaryButton}
      footerClassName={
        !data?.productId ? cs.formFooterOneButton : cs.formFooterTwoButton
      }
      onSubmit={onSubmit}
      onError={onErrorHandler}
      onCancel={onCancel}
    >
      <SheFormField
        name="productName"
        render={({ field }) => (
          <SheInput
            label={t("ProductForm.Labels.ProductName")}
            placeholder={t("ProductForm.Placeholders.ProductName")}
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
              label={t("ProductForm.Labels.ProductCode")}
              placeholder={t("ProductForm.Placeholders.ProductCode")}
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
            label={t("ProductForm.Labels.ProductBarcode")}
            placeholder={t("ProductForm.Placeholders.ProductBarcode")}
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
              label={t("ProductForm.Labels.CategoryName")}
              placeholder={t("ProductForm.Placeholders.SelectCategory")}
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
              label={t("ProductForm.Labels.BrandName")}
              placeholder={t("ProductForm.Placeholders.SelectBrand")}
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
          required
          ignoreFormAction
          render={({ field }) => (
            <SheToggle
              text={t("ProductForm.Labels.IsActive")}
              type={SheToggleTypeEnum.SWITCH}
              checked={field.value}
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
