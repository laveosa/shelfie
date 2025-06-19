import React, { useEffect } from "react";
import { Plus, WandSparkles } from "lucide-react";

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
import { ProductCodeModel } from "@/const/models/ProductCodeModel.ts";
import { Switch } from "@/components/ui/switch.tsx";
import { IProductConfigurationCard } from "@/const/interfaces/complex-components/custom-cards/IProductConfigurationCard.ts";
import { useForm } from "react-hook-form";

export default function ProductConfigurationCard({
  isLoading,
  product,
  brandsList,
  categoriesList,
  onProductCodeChange,
  onGenerateProductCode,
  onOpenCreateProductCategoryCard,
  onOpenCreateProductBrandCard,
  onPrimaryButtonClick,
  ...props
}: IProductConfigurationCard) {
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
        productCode: null,
        barcode: "",
        productCategoryId: null,
        brandId: null,
        isActive: false,
      });
    }
  }, [product]);

  function onGenerateCode() {
    onGenerateProductCode().then((res: ProductCodeModel) => {
      form.setValue("productCode", res.code);
    });
  }

  function onCheckCode(value: string) {
    onProductCodeChange({ code: value }).then(() => {});
  }

  function onSubmit(data) {
    onPrimaryButtonClick(data);
  }

  return (
    <div>
      <SheProductCard
        loading={isLoading}
        title={product?.productId ? "Basic Product Data" : "Create Product"}
        showPrimaryButton={true}
        primaryButtonTitle={product?.productId ? "Save" : "Add Product"}
        showSecondaryButton={!product?.productId}
        secondaryButtonTitle="Cancel"
        className={cs.productConfigurationFormCard}
        onPrimaryButtonClick={form.handleSubmit(onSubmit)}
        {...props}
      >
        <div className={cs.productConfigurationForm}>
          <SheForm form={form} onSubmit={onSubmit}>
            <SheForm.Field
              rules={{
                required: true,
                minLength: {
                  value: 3,
                  message: "Product name must be at least 3 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Product name cannot exceed 50 characters",
                },
              }}
              name="productName"
            >
              <SheInput
                label="Product Name"
                placeholder="enter product name..."
                isValid={!form.formState.errors.productName}
                patternErrorMessage={form.formState.errors.productName?.message}
                showError={true}
                fullWidth={true}
              />
            </SheForm.Field>
            <div className={cs.productConfigurationFormRow}>
              <SheForm.Field name="productCode" onDelay={onCheckCode}>
                <SheInput
                  {...(form.register("productCode") as any)}
                  label="Product Code"
                  placeholder="enter product code..."
                  isValid={!form.formState.errors.productCode}
                  patternErrorMessage={
                    form.formState.errors.productCode?.message
                  }
                  showError={true}
                  fullWidth={true}
                />
              </SheForm.Field>
              <SheButton
                icon={WandSparkles}
                type="button"
                variant="outline"
                onClick={onGenerateCode}
              />
            </div>
            <SheForm.Field name="barcode">
              <SheInput
                label="Product Barcode"
                placeholder="enter product barcode..."
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
                    <FormLabel>Product Category</FormLabel>
                    <Select
                      key={form.watch("productCategoryId")}
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value ? field.value.toString() : ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category">
                            {categoriesList.find(
                              (item) =>
                                item.categoryId ===
                                form.watch("productCategoryId"),
                            )?.categoryName ?? "Select category"}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoriesList.map((option) => (
                          <SelectItem
                            key={option.categoryId}
                            value={option.categoryId.toString()}
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
                onClick={onOpenCreateProductCategoryCard}
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
                    <FormLabel>Product Brand</FormLabel>
                    <Select
                      key={form.watch("brandId")}
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value ? field.value.toString() : ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select brand" />
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
                onClick={onOpenCreateProductBrandCard}
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
                <div>Is Active</div>
              </div>
            </SheForm.Field>
          </SheForm>
        </div>
      </SheProductCard>
    </div>
  );
}
