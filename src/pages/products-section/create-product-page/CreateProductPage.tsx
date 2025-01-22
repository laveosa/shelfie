import cs from "./CreateProductPage.module.scss";
import useCreateProductPageService from "@/pages/products-section/create-product-page/useCreateProductPageService.ts";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import { ProductsFakeData } from "@/components/complex/grid/products-grid/FakeData.ts";
import { Separator } from "@/components/ui/separator.tsx";
import {
  FileText,
  ImagesIcon,
  Layers2,
  Plus,
  ReceiptEuroIcon,
  Ruler,
  SlidersHorizontal,
  WandSparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge.tsx";
import { SheForm } from "@/components/forms/she-form/SheForm.tsx";
import { useForm } from "react-hook-form";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import React from "react";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
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

export function CreateProductPage() {
  const service = useCreateProductPageService();
  const productsData = ProductsFakeData;
  const form = useForm({
    defaultValues: {
      productName: "",
      productCode: "",
      productBarcode: "",
      productCategory: "",
      productBrand: "",
      phoneNumber: "",
      verifyPhoneNumber: null,
      code: null,
      phoneCodeModel: null,
    },
  });

  function onSubmit(_data) {}

  return (
    <div className={cs.CreateProductPage}>
      <SheProductCard
        title="Products"
        showToggleButton={true}
        className={cs.productsCard}
      >
        <div className={cs.productsList}>
          {productsData.items.map((item) => (
            <>
              <div key={item.id} className={cs.productsListItem}>
                <img
                  src={item.image.photoUrl}
                  alt={item.productName}
                  className={cs.productItemImage}
                />
                <div className={cs.productItemName}>{item.productName}</div>
              </div>
              <Separator orientation="horizontal" />
            </>
          ))}
        </div>
      </SheProductCard>
      <SheProductCard
        title="Create Product"
        showToggleButton={true}
        className={cs.createProductCard}
        // width={"500px"}
      >
        <div className={cs.createProductItems}>
          <div className={cs.createProductItem}>
            <div className={cs.itemIconText}>
              <FileText />
              <div>Basic Data</div>
            </div>
          </div>
          <div className={cs.createProductItem}>
            <div className={cs.itemIconText}>
              <ImagesIcon />
              <div>Gallery</div>
            </div>
            <Badge className={cs.itemBadge}>0</Badge>
          </div>
          <div className={cs.createProductItem}>
            <div className={cs.itemIconText}>
              <Layers2 />
              <div>Variants</div>
            </div>
            <Badge className={cs.itemBadge}>0</Badge>
          </div>
          <div className={cs.createProductItem}>
            <div className={cs.itemIconText}>
              <SlidersHorizontal />
              <div>Attributes</div>
            </div>
            <Badge className={cs.itemBadge}>0</Badge>
          </div>
          <div className={cs.createProductItem}>
            <div className={cs.itemIconText}>
              <Ruler />
              <div>Size Chart</div>
            </div>
          </div>
          <div className={cs.createProductItem}>
            <div className={cs.itemIconText}>
              <ReceiptEuroIcon />
              <div>Purchase</div>
            </div>
          </div>
        </div>
      </SheProductCard>
      <SheProductCard
        view="card"
        title="Create Products"
        showPrimaryButton={true}
        primaryButtonTitle="Add Product"
        showSecondaryButton={true}
        secondaryButtonTitle="Cancel"
        className={cs.createProductFormCard}
      >
        <div className={cs.createProductForm}>
          <SheForm form={form} onSubmit={onSubmit}>
            <SheForm.Field
              rules={{
                required: "Product name is required",
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
                rules={{
                  required: "Product code is required",
                }}
                name="productCode"
              >
                <SheInput
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
                variant="outline"
              />
            </div>
            <div className={cs.createProductFormRow}>
              <SheForm.Field
                rules={{
                  required: "Product barcode is required",
                }}
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
                rules={{
                  required: "Country code is required",
                }}
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
              />
            </div>
            <div className={cs.createProductFormRow}>
              <FormField
                control={form.control}
                name="productBrand"
                rules={{
                  required: "Country code is required",
                }}
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
              />
            </div>
            <div
              className={`${cs.createProductFormRow} ${cs.createProductFormSwitch}`}
            >
              <Switch />
              <div>Is Active</div>
            </div>
          </SheForm>
        </div>
      </SheProductCard>
    </div>
  );
}
