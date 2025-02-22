import React, { useEffect } from "react";
import { Plus, WandSparkles } from "lucide-react";
import { useForm } from "react-hook-form";

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
import cs from "./CreateProductFormCard.module.scss";
import { SheForm } from "@/components/forms/she-form/SheForm.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import useCreateProductPageService from "@/pages/products-section/create-product-page/useCreateProductPageService.ts";
import { ProductCodeModel } from "@/const/models/ProductCodeModel.ts";
import { Switch } from "@/components/ui/switch.tsx";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { GridModel } from "@/const/models/GridModel.ts";
import { CreateProductPageSliceActions as actions } from "@/state/slices/CreateProductPageSlice.ts";
import { ProductsPageSliceActions as productsActions } from "@/state/slices/ProductsPageSlice.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { useToast } from "@/hooks/useToast.ts";
import { ICreateProductPageSlice } from "@/const/interfaces/store-slices/ICreateProductPageSlice.ts";

export default function CreateProductFormCard({
  onOpenCreateProductCategoryCard,
  onOpenCreateProductBrandCard,
  ...props
}) {
  const dispatch = useAppDispatch();
  const state = useAppSelector<ICreateProductPageSlice>(
    StoreSliceEnum.CREATE_PRODUCT,
  );
  const productsState = useAppSelector<IProductsPageSlice>(
    StoreSliceEnum.PRODUCTS,
  );
  const service = useCreateProductPageService();
  const productService = useProductsPageService();
  const { addToast } = useToast();
  const form = useForm({
    defaultValues: {
      name: "",
      productCode: "",
      productBarcode: "",
      categoryId: null,
      brandId: "",
      isActive: true,
    },
  });

  useEffect(() => {
    service.getSimpleListOfAllBrandsHandler().then((res) => {
      dispatch(actions.refreshBrandsList(res ? res : [])); // Dispatch action to set brands
    });

    service.getAllCategoriesByOrganizationHandler().then((res) => {
      dispatch(actions.refreshCategoriesList(res ? res : [])); // Dispatch action to set categories
    });
  }, []);

  function onAction() {
    service.generateProductCodeHandler().then((res: ProductCodeModel) => {
      form.setValue("productCode", res.code);
    });
  }

  function onCheckCode(value: string) {
    service.checkProductCodeHandler({ code: value }).then(() => {});
  }

  function onSubmit(data) {
    service.createNewProductHandler(data).then((res) => {
      if (res.data) {
        form.reset();
        productService
          .getTheProductsForGridHandler(productsState.gridRequestModel)
          .then((res: GridModel) => {
            dispatch(productsActions.refreshProductsGridModel(res));
          });
        addToast({
          text: "Product created successfully",
          type: "success",
        });
      } else {
        addToast({
          text: `${res.error.data.detail}`,
          type: "error",
        });
      }
    });
  }

  return (
    <div>
      <SheProductCard
        view="card"
        title="Create Products"
        showPrimaryButton={true}
        primaryButtonTitle="Add Product"
        showSecondaryButton={true}
        secondaryButtonTitle="Cancel"
        className={cs.createProductFormCard}
        onPrimaryButtonClick={form.handleSubmit(onSubmit)}
        {...props}
      >
        <div className={cs.createProductForm}>
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
              name="name"
            >
              <SheInput
                label="Product Name"
                placeholder="enter product name..."
                isValid={!form.formState.errors.name}
                error={form.formState.errors.name?.message}
                showError={true}
              />
            </SheForm.Field>
            <div className={cs.createProductFormRow}>
              <SheForm.Field
                name="productCode"
                rules={{
                  required: true,
                }}
                onDelay={onCheckCode}
                onBlur={onCheckCode}
              >
                <SheInput
                  {...form.register("productCode")}
                  label="Product Code"
                  placeholder="enter product code..."
                  isValid={!form.formState.errors.productCode}
                  error={form.formState.errors.productCode?.message}
                  showError={true}
                />
              </SheForm.Field>
              <SheButton
                className={cs.formRowButton}
                icon={WandSparkles}
                type="button"
                variant="outline"
                onClick={onAction}
              />
            </div>
            <div className={cs.createProductFormRow}>
              <SheForm.Field rules={{}} name="productBarcode">
                <SheInput
                  label="Product Barcode"
                  placeholder="enter product barcode..."
                  isValid={!form.formState.errors.productBarcode}
                  error={form.formState.errors.productBarcode?.message}
                  showError={true}
                />
              </SheForm.Field>
              <SheButton
                className={cs.formRowButton}
                icon={WandSparkles}
                variant="outline"
              />
            </div>
            <div className={cs.createProductFormRow}>
              <FormField
                control={form.control}
                name="categoryId"
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <FormItem className={cs.select}>
                    <FormLabel>Product Category</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value ? field.value.toString() : ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {state.categoriesList.map((option) => (
                          <SelectItem
                            key={option.categoryId}
                            value={option.categoryId.toString()}
                          >
                            <div>{option.categoryName}</div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              ></FormField>
              <SheButton
                className={cs.formRowButton}
                icon={Plus}
                variant="outline"
                type="button"
                onClick={onOpenCreateProductCategoryCard}
              />
            </div>
            <div className={cs.createProductFormRow}>
              <FormField
                control={form.control}
                name="brandId"
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <FormItem className={cs.select}>
                    <FormLabel>Product Brand</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value ? field.value.toString() : ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {state.brandsList.map((option) => (
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
                className={cs.formRowButton}
                icon={Plus}
                variant="outline"
                type="button"
                onClick={onOpenCreateProductBrandCard}
              />
            </div>
            <SheForm.Field name="isActive">
              <div
                className={`${cs.createProductFormRow} ${cs.createProductFormSwitch}`}
              >
                <Switch />
                <div>Is Active</div>
              </div>
            </SheForm.Field>
          </SheForm>
        </div>
      </SheProductCard>
    </div>
  );
}
