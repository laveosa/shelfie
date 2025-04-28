import React, { useEffect, useMemo, useRef } from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./VariantConfigurationCard.module.scss";
import { IVariantConfigurationCard } from "@/const/interfaces/complex-components/custom-cards/IVariantConfigurationCard.ts";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import {
  Blocks,
  Clock,
  ImagePlus,
  Minus,
  Plus,
  WandSparklesIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator.tsx";
import { DndGridDataTable } from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { useForm } from "react-hook-form";
import { SheForm } from "@/components/forms/she-form/SheForm.tsx";
import { ProductCodeModel } from "@/const/models/ProductCodeModel.ts";
import { VariantModel } from "@/const/models/VariantModel.ts";
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
import { VariantConfigurationGridColumns } from "@/components/complex/grid/variant-configuration-grid/VariantConfigurationGridColumns.tsx";
import { VariantPhotosGridColumns } from "@/components/complex/grid/product-photos-grid/VariantPhotosGridColumns.tsx";

export default function VariantConfigurationCard({
  variant,
  data,
  onAction,
  taxesList,
  onGenerateProductCode,
  onSecondaryButtonClick,
  ...props
}: IVariantConfigurationCard) {
  const traitsColumns = VariantConfigurationGridColumns;
  const photoColumns = VariantPhotosGridColumns(onGridAction);
  const form = useForm({
    defaultValues: {
      variantName: variant?.variantName || "",
      variantCode: variant?.variantCode || "",
      salePrice: {
        brutto: variant?.salePrice?.brutto,
        netto: variant?.salePrice?.netto,
        taxTypeId: taxesList?.[0].id,
      },
    },
  });
  const { watch, setValue } = form;

  const netto = watch("salePrice.netto");
  const brutto = watch("salePrice.brutto");
  const taxTypeId = watch("salePrice.taxTypeId");
  const selectedTax = taxesList?.find((tax) => tax.id === taxTypeId);
  const taxRate = selectedTax?.value || 0;
  const lastChanged = useRef<"netto" | "brutto" | null>(null);
  const priceValues = useMemo(() => {
    return {
      netto,
      brutto,
      taxRate,
    };
  }, [netto, brutto, taxRate]);

  function calculatePrices() {
    if (!lastChanged.current) return null;

    const currentValues = form.getValues();
    let needRecalculate = false;

    if (lastChanged.current === "netto") {
      const calculatedBrutto = +(
        currentValues.salePrice.netto *
        (1 + taxRate)
      ).toFixed(2);
      if (currentValues.salePrice.brutto !== calculatedBrutto) {
        setValue("salePrice.brutto", calculatedBrutto);
        needRecalculate = true;
      }
    } else if (lastChanged.current === "brutto") {
      const calculatedNetto = +(
        currentValues.salePrice.brutto /
        (1 + taxRate)
      ).toFixed(2);
      if (currentValues.salePrice.netto !== calculatedNetto) {
        setValue("salePrice.netto", calculatedNetto);
        needRecalculate = true;
      }
    }

    return {
      values: currentValues,
      needRecalculate,
    };
  }

  useEffect(() => {
    const result = calculatePrices();

    if (result && !result.needRecalculate) {
      onSubmit(result.values);
    }
  }, [priceValues]);

  function onGenerateCode() {
    onGenerateProductCode().then((res: ProductCodeModel) => {
      form.setValue("variantCode", res.code, { shouldDirty: true });

      const formData = form.getValues();
      const formattedData = {
        ...formData,
        salePrice: {
          brutto: Number(formData.salePrice.brutto),
          netto: Number(formData.salePrice.netto),
          taxTypeId: Number(formData.salePrice.taxTypeId),
        },
      };

      onAction("updateVariantDetails", { formattedData, variant });
    });
  }

  function onSubmit(data: VariantModel) {
    console.log("Data:", data);
    const formattedData = {
      ...data,
      salePrice: {
        brutto: Number(data.salePrice.brutto),
        netto: Number(data.salePrice.netto),
        taxTypeId: Number(data.salePrice.taxTypeId),
      },
    };
    console.log("Submitted data:", variant);
    onAction("updateVariantDetails", { formattedData, variant });
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
      title="Manage Variant"
      view="card"
      showCloseButton
      width="420px"
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
                onDelay={form.handleSubmit(onSubmit)}
                fullWidth
              />
            </SheForm.Field>
            <div className={cs.variantCodeFormRow}>
              <SheForm.Field name="variantCode" label="Variant Code">
                <div className={cs.inputBlockRow}>
                  <SheInput
                    {...form.register("variantCode")}
                    value={variant?.variantCode}
                    onDelay={form.handleSubmit(onSubmit)}
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
                <SheForm.Field
                  label="Sale price brutto"
                  name="salePrice.brutto"
                >
                  <SheInput
                    type="number"
                    step="any"
                    {...form.register("salePrice.brutto", {
                      valueAsNumber: true,
                      onChange: () => (lastChanged.current = "brutto"),
                    })}
                    onDelay={form.handleSubmit(onSubmit)}
                  />
                </SheForm.Field>
              </div>
              <div className={cs.priceFormRowItem}>
                <FormField
                  control={form.control}
                  name="salePrice.taxTypeId"
                  render={({ field }) => (
                    <FormItem className={cs.select}>
                      <FormLabel>VAT</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
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
                <SheForm.Field label="Sale price netto" name="salePrice.netto">
                  <SheInput
                    type="number"
                    step="any"
                    {...form.register("salePrice.netto", {
                      valueAsNumber: true,
                      onChange: () => (lastChanged.current = "netto"),
                    })}
                    onDelay={form.handleSubmit(onSubmit)}
                  />
                </SheForm.Field>
              </div>
            </div>
          </SheForm>
        </div>
        <Separator className={cs.separator} />
        <div className={cs.stockDetailsBlock}>
          <div className={cs.buttonBlock}>
            <span className="she-title">Stock Details</span>
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
              onClick={() => onAction("openVariantHistoryCard")}
            >
              History
            </SheButton>
          </div>
          <div className={cs.stockBlock}>
            <div className={cs.stockBlockRow}>
              <span className="she-text">Currently in stock</span>
              <span className={cs.stockBlockRowNumber}>
                {variant.stockAmount}
              </span>
            </div>
            <div className={cs.stockBlockRow}>
              <span className="she-text">Units sold</span>
              <span className={cs.stockBlockRowNumber}>
                {variant.soldUnits}
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
              showHeader={false}
              columns={traitsColumns}
              data={variant.traitOptions.filter((option) => option.isRemoved)}
              gridModel={data}
            />
          </div>
        </div>
        <div className={cs.variantGridBlock}>
          <div className={cs.variantGridBlockHeader}>
            <span className="she-title">Variant Photos</span>
            <SheButton
              icon={ImagePlus}
              variant="outline"
              onClick={() => onAction("openVariantPhotosCard")}
            >
              Manage
            </SheButton>
          </div>
          {variant.photos?.length > 0 && (
            <div className={cs.managePhotosGrid}>
              <DndGridDataTable
                enableDnd={true}
                showHeader={false}
                columns={photoColumns}
                data={variant.photos}
                gridModel={data}
                onNewItemPosition={(newIndex, activeItem) =>
                  onAction("dndVariantPhoto", { newIndex, activeItem })
                }
              />
            </div>
          )}
        </div>
      </div>
    </SheProductCard>
  );
}
