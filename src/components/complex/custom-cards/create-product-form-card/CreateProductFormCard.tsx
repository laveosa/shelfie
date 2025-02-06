import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./CreateProductFormCard.module.scss";
import { SheForm } from "@/components/forms/she-form/SheForm.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
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
import { Switch } from "@/components/ui/switch.tsx";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ProductsFakeData } from "@/components/complex/grid/products-grid/FakeData.ts";
import useCreateProductPageService from "@/pages/products-section/create-product-page/useCreateProductPageService.ts";
import { Input } from "@/components/ui/input.tsx";

export default function CreateProductFormCard({
  onOpenCreateProductCategoryCard,
  onOpenCreateProductBrandCard,
  ...props
}) {
  const [product, setProduct] = useState("");
  const service = useCreateProductPageService();
  const productsData = ProductsFakeData;
  const form = useForm({
    defaultValues: {
      productName: "",
      productCode: "",
      productBarcode: "",
      productCategory: "",
      productBrand: "",
      isActive: true,
    },
  });

  useEffect(() => {
    service.getSimpleListOfAllBrandsHandler().then((res) => {
      console.log("BRANDS", res);
    });
    service.getAllCategoriesByOrganizationHandler().then((res) => {
      console.log("CATEGORIES", res);
    });
  }, []);

  function onSubmit(_data) {}

  function onAction() {
    service.generateProductCodeHandler();
  }

  function onCheckCode(value) {
    console.log("VALUE", value);
    service.checkProductCodeHandler({ code: value });
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
        {...props}
      >
        <Input
          name="product"
          value={product} // Set the input value from state
          onChange={(e) => setProduct(e.target.value)} // Update state on change
          onBlur={() => onCheckCode(product)} // Call onCheckCode with the current value on blur
          placeholder="Enter product code..."
        />

        <div className={cs.createProductForm}>
          <SheForm form={form} onSubmit={onSubmit}>
            <SheForm.Field
              rules={{
                // required: "Product name is required",
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
                error={form.formState.errors.productName?.message}
                showError={true}
              />
            </SheForm.Field>
            <div className={cs.createProductFormRow}>
              <SheForm.Field
                rules={
                  {
                    // required: "Product code is required",
                  }
                }
                name="productCode"
              >
                <SheInput
                  label="Product Code"
                  placeholder="enter product code..."
                  isValid={!form.formState.errors.productCode}
                  error={form.formState.errors.productCode?.message}
                  showError={true}
                  onBlur={() => onCheckCode(form.getValues("productCode"))}
                />
              </SheForm.Field>
              <SheButton
                className={cs.formRowButton}
                icon={WandSparkles}
                variant="outline"
                onClick={onAction}
              />
            </div>
            <div className={cs.createProductFormRow}>
              <SheForm.Field
                rules={
                  {
                    // required: "Product barcode is required",
                  }
                }
                name="productBarcode"
              >
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
                name="productCategory"
                rules={
                  {
                    // required: "Country code is required",
                  }
                }
                render={({ field }) => (
                  <FormItem className={cs.select}>
                    <FormLabel>Product Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {productsData.items.map((option) => (
                          <SelectItem
                            key={option.id}
                            value={option.productName}
                          >
                            <div>{option.productName}</div>
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
                onClick={onOpenCreateProductCategoryCard}
              />
            </div>
            <div className={cs.createProductFormRow}>
              <FormField
                control={form.control}
                name="productBrand"
                rules={
                  {
                    // required: "Country code is required",
                  }
                }
                render={({ field }) => (
                  <FormItem className={cs.select}>
                    <FormLabel>Product Brand</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {productsData.items.map((option) => (
                          <SelectItem
                            key={option.id}
                            value={option.productName}
                          >
                            <div>{option.productName}</div>
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
