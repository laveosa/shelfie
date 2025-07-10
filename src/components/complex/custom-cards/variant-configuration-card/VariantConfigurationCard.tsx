import React, { useEffect, useRef, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import {
  Blocks,
  Clock,
  ImagePlus,
  Minus,
  Plus,
  Trash2,
  WandSparklesIcon,
} from "lucide-react";

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
import cs from "./VariantConfigurationCard.module.scss";
import { IVariantConfigurationCard } from "@/const/interfaces/complex-components/custom-cards/IVariantConfigurationCard.ts";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import {
  DataWithId,
  DndGridDataTable,
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { SheForm } from "@/components/forms/she-form/SheForm.tsx";
import { ProductCodeModel } from "@/const/models/ProductCodeModel.ts";
import { VariantConfigurationGridColumns } from "@/components/complex/grid/variant-configuration-grid/VariantConfigurationGridColumns.tsx";
import { VariantPhotosGridColumns } from "@/components/complex/grid/product-photos-grid/VariantPhotosGridColumns.tsx";
import { VariantModel } from "@/const/models/VariantModel.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon";
import InfoIcon from "@/assets/icons/Info-icon.svg?react";
import SheCardNotification from "@/components/complex/she-card-notification/SheCardNotification.tsx";

const debounce = (fn: (...args: any[]) => void, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export default function VariantConfigurationCard({
  isLoading,
  isVariantOptionsGridLoading,
  isVariantPhotoGridLoading,
  variant,
  variantPhotos,
  data,
  onAction,
  taxesList,
  productCounter,
  onGenerateProductCode,
  onSecondaryButtonClick,
  ...props
}: IVariantConfigurationCard) {
  const traitsColumns =
    VariantConfigurationGridColumns as ColumnDef<DataWithId>[];
  const photoColumns = VariantPhotosGridColumns(
    onGridAction,
  ) as ColumnDef<DataWithId>[];

  const [initialFormValues, setInitialFormValues] = useState({
    variantName: variant?.variantName || "",
    variantCode: variant?.variantCode || "",
    salePrice: {
      brutto: variant?.salePrice?.brutto,
      netto: variant?.salePrice?.netto,
      taxTypeId: variant?.salePrice?.taxTypeId || taxesList?.[0]?.id,
    },
  });
  const form = useForm({
    defaultValues: initialFormValues,
  });
  const currentVariantIdRef = useRef<string | number | null>(
    variant?.variantId || null,
  );
  const userModifiedForm = useRef(false);
  const debouncedFnRef = useRef<any>(null);

  const { setValue, register, getValues } = form;
  const lastChanged = useRef<"netto" | "brutto" | null>(null);
  const preparedTraitOptions = prepareTraitOptionsData(variant?.traitOptions);

  useEffect(() => {
    if (debouncedFnRef.current && debouncedFnRef.current.cancel) {
      debouncedFnRef.current.cancel();
    }
    return () => {
      if (debouncedFnRef.current && debouncedFnRef.current.cancel) {
        debouncedFnRef.current.cancel();
      }
    };
  }, [variant?.variantId]);

  useEffect(() => {
    if (currentVariantIdRef.current !== variant?.variantId) {
      currentVariantIdRef.current = variant?.variantId || null;

      const newValues = {
        variantName: variant?.variantName || "",
        variantCode: variant?.variantCode || "",
        salePrice: {
          brutto: variant?.salePrice?.brutto,
          netto: variant?.salePrice?.netto,
          taxTypeId: variant?.salePrice?.taxTypeId || taxesList?.[0]?.id,
        },
      };

      setInitialFormValues(newValues);
      form.reset(newValues);
      userModifiedForm.current = false;
    }
  }, [variant?.variantId, variant, taxesList, form]);

  function prepareTraitOptionsData(traitOptions) {
    return (
      traitOptions?.map((trait) => {
        const expandableRows = [];

        if (trait.isRemoved) {
          expandableRows.push({
            id: `${trait.id}-removed`,
            type: "removed",
            message: "Trait option is removed",
          });
        }

        if (trait.isMissing) {
          expandableRows.push({
            id: `${trait.id}-missing`,
            type: "missing",
            message: "Trait option is missing configuration",
          });
        }

        return {
          ...trait,
          expandableRows: expandableRows,
        };
      }) || []
    );
  }

  function renderExpandedContent(expandableItem) {
    return (
      <div>
        {expandableItem.original.expandableRows.map((item) => (
          <div className={cs.expandableRow}>
            <SheIcon
              maxWidth="20px"
              minWidth="20px"
              className={cs.expandableRowIcon}
              icon={InfoIcon}
            />
            <span className={cs.expandableRowText}>{item.message}</span>
          </div>
        ))}
      </div>
    );
  }

  function onGenerateCode() {
    onGenerateProductCode().then((res: ProductCodeModel) => {
      form.setValue("variantCode", res.code, { shouldDirty: true });
      userModifiedForm.current = true;
      form.handleSubmit(onSubmit)();
    });
  }

  function handleFieldChange() {
    const currentValues = getValues();
    const initialValues = initialFormValues;

    const hasChanged =
      currentValues.variantName !== initialValues.variantName ||
      currentValues.variantCode !== initialValues.variantCode ||
      currentValues.salePrice.netto !== initialValues.salePrice.netto ||
      currentValues.salePrice.brutto !== initialValues.salePrice.brutto ||
      currentValues.salePrice.taxTypeId !== initialValues.salePrice.taxTypeId;

    if (hasChanged) {
      userModifiedForm.current = true;
      createDebouncedSubmit()();
    }
  }

  function createDebouncedSubmit() {
    const fn = debounce(() => {
      const currentValues = getValues();
      if (userModifiedForm.current) {
        form.handleSubmit(onSubmit)();
      }
    }, 1500);

    debouncedFnRef.current = fn;
    return fn;
  }

  function onSubmit(formData: VariantModel) {
    if (!userModifiedForm.current) return;

    let netto =
      typeof formData.salePrice.netto === "string"
        ? Number(formData.salePrice.netto)
        : formData.salePrice.netto || 0;

    let brutto =
      typeof formData.salePrice.brutto === "string"
        ? Number(formData.salePrice.brutto)
        : formData.salePrice.brutto || 0;

    const taxTypeId = formData.salePrice.taxTypeId;
    const taxRate = taxesList.find((t) => t.id === taxTypeId)?.value ?? 0;

    if (lastChanged.current === "netto") {
      brutto = +(netto * (1 + taxRate)).toFixed(2);
    } else if (lastChanged.current === "brutto") {
      netto = +(brutto / (1 + taxRate)).toFixed(2);
    }

    setValue("salePrice.netto", netto, { shouldDirty: false });
    setValue("salePrice.brutto", brutto, { shouldDirty: false });

    const formattedData = {
      ...formData,
      salePrice: {
        netto,
        brutto,
        taxTypeId,
      },
    };

    if (variant) {
      onAction("updateVariantDetails", { formattedData, variant });
    }

    setInitialFormValues({
      variantName: formData.variantName || "",
      variantCode: formData.variantCode || "",
      salePrice: { netto, brutto, taxTypeId },
    });

    userModifiedForm.current = false;
  }

  function onGridAction(
    _actionType: string,
    _rowId?: string,
    _setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: any,
  ) {
    onAction("detachPhotoFromVariant", { row, variant });
    onAction("deletePhoto", row.original);
  }

  return (
    <SheProductCard
      loading={isLoading}
      title="Manage Variant"
      showCloseButton
      onSecondaryButtonClick={onSecondaryButtonClick}
      className={cs.variantConfigurationCard}
      {...props}
    >
      <div className={cs.variantConfigurationCardContent}>
        <div className={cs.variantConfigurationForm}>
          <SheForm form={form} onSubmit={onSubmit}>
            <SheForm.Field name="variantName">
              <SheInput
                label="Optional Variant Name"
                onDelay={handleFieldChange}
                fullWidth
              />
            </SheForm.Field>
            <div className={cs.variantCodeFormRow}>
              <SheForm.Field name="variantCode" label="Variant Code">
                <div>
                  <SheInput
                    value={variant?.variantCode}
                    {...(register("variantCode", {}) as any)}
                    onDelay={handleFieldChange}
                  />
                </div>
              </SheForm.Field>
              <SheButton
                icon={WandSparklesIcon}
                type="button"
                variant="outline"
                onClick={onGenerateCode}
              />
            </div>
            <div className={cs.priceFormRow}>
              <div className={cs.priceFormRowItem}>
                <SheForm.Field label="Sale price netto" name="salePrice.netto">
                  <SheInput
                    type="number"
                    step="any"
                    {...(register("salePrice.netto", {
                      onChange: () => {
                        lastChanged.current = "netto";
                        handleFieldChange();
                      },
                    }) as any)}
                  />
                </SheForm.Field>
              </div>
              <div className={cs.priceFormRowItem}>
                <FormField
                  control={form.control}
                  name="salePrice.taxTypeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>VAT</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(Number(value));
                          handleFieldChange();
                        }}
                        value={field.value ? field.value.toString() : ""}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select VAT" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {taxesList?.map((taxType) => (
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
                />
              </div>
              <div className={cs.priceFormRowItem}>
                <SheForm.Field
                  label="Sale price brutto"
                  name="salePrice.brutto"
                >
                  <SheInput
                    type="number"
                    step="any"
                    {...(register("salePrice.brutto", {
                      onChange: () => {
                        lastChanged.current = "brutto";
                        handleFieldChange();
                      },
                    }) as any)}
                  />
                </SheForm.Field>
              </div>
            </div>
          </SheForm>
        </div>
        <Separator />
        <div className={cs.stockDetailsBlock}>
          <div className={cs.buttonBlock}>
            <span className={`${cs.stockDetailsTitle} she-title`}>
              Stock Details
            </span>
            <SheButton
              icon={Plus}
              variant="outline"
              onClick={() => onAction("openAddStockCard")}
            >
              Add
            </SheButton>
            <SheButton
              icon={Minus}
              variant="outline"
              onClick={() => onAction("openDisposeStockCard")}
            >
              Dispose
            </SheButton>
            <SheButton
              icon={Clock}
              variant="outline"
              maxWidth="89px"
              onClick={() =>
                onAction("openVariantHistoryCard", variant.variantId)
              }
            >
              History
            </SheButton>
          </div>
          <div className={cs.stockBlock}>
            <div className={cs.stockBlockRow}>
              <span className="she-text">Currently in stock</span>
              <span className={cs.stockBlockRowNumber}>
                {variant?.stockAmount}
              </span>
            </div>
            <div className={cs.stockBlockRow}>
              <span className="she-text">Units sold</span>
              <span className={cs.stockBlockRowNumber}>
                {variant?.soldUnits}
              </span>
            </div>
          </div>
        </div>
        <div className={cs.variantGridBlock}>
          <div className={cs.variantGridBlockHeader}>
            <span className="she-title">Variant Traits</span>
            <SheButton
              icon={Blocks}
              variant="outline"
              onClick={() => onAction("openManageTraitsCard")}
            >
              Manage
            </SheButton>
          </div>
          <div>
            <DndGridDataTable
              isLoading={isVariantOptionsGridLoading}
              showHeader={false}
              columns={traitsColumns}
              data={preparedTraitOptions}
              gridModel={data}
              enableExpansion={true}
              renderExpandedContent={renderExpandedContent}
            />
          </div>
        </div>
        <div className={cs.variantGridBlock}>
          <div className={cs.variantGridBlockHeader}>
            <span className="she-title">Variant Photos</span>
            <SheButton
              icon={ImagePlus}
              variant="outline"
              onClick={() =>
                onAction("openVariantPhotosCard", variant.variantId)
              }
            >
              Manage
            </SheButton>
          </div>
          {variant?.photos?.length > 0 && (
            <div>
              <DndGridDataTable
                isLoading={isVariantPhotoGridLoading}
                enableDnd={true}
                showHeader={false}
                columns={photoColumns}
                data={variantPhotos}
                gridModel={data}
                skeletonQuantity={productCounter?.gallery}
                onNewItemPosition={(newIndex, activeItem) =>
                  onAction("dndVariantPhoto", { newIndex, activeItem })
                }
              />
            </div>
          )}
        </div>
      </div>
      <SheCardNotification
        title="Delete Variant"
        text="This variant will be deleted, it will no longer be available for sale but you will still see it in the orders where it sold"
        buttonColor="#EF4343"
        buttonVariant="outline"
        buttonText="Delete"
        buttonIcon={Trash2}
        onClick={() => onAction("deleteVariant", variant)}
      />
    </SheProductCard>
  );
}
