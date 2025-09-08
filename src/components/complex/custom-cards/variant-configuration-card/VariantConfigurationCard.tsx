import React, { useEffect, useRef, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Blocks,
  Clock,
  ImagePlus,
  Minus,
  Plus,
  Trash2,
  WandSparklesIcon
} from "lucide-react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select.tsx";
import SheProductCard
  from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./VariantConfigurationCard.module.scss";
import {
  IVariantConfigurationCard
} from "@/const/interfaces/complex-components/custom-cards/IVariantConfigurationCard.ts";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import {
  DataWithId,
  DndGridDataTable
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { SheForm } from "@/components/forms/she-form/SheForm.tsx";
import { ProductCodeModel } from "@/const/models/ProductCodeModel.ts";
import { VariantModel } from "@/const/models/VariantModel.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon";
import InfoIcon from "@/assets/icons/Info-icon.svg?react";
import SheCardNotification
  from "@/components/complex/she-card-notification/SheCardNotification.tsx";
import {
  VariantConfigurationGridColumns
} from "@/components/complex/grid/custom-grids/variant-configuration-grid/VariantConfigurationGridColumns.tsx";
import {
  VariantPhotosGridColumns
} from "@/components/complex/grid/custom-grids/product-photos-grid/VariantPhotosGridColumns.tsx";

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
  ...props
}: IVariantConfigurationCard) {
  const { t } = useTranslation();
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

  const debouncedSubmit = useRef(
    debounce(() => {
      if (userModifiedForm.current) {
        form.handleSubmit(onSubmit)();
      }
    }, 1500),
  );

  const { setValue, register, getValues } = form;
  const lastChanged = useRef<"netto" | "brutto" | null>(null);
  const preparedTraitOptions = prepareTraitOptionsData(variant?.traitOptions);

  useEffect(() => {
    if (debouncedSubmit.current) {
      debouncedSubmit.current = debounce(() => {
        if (userModifiedForm.current) {
          form.handleSubmit(onSubmit)();
        }
      }, 1500);
    }
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
            message: t("ValidationMessages.TraitOptionRemoved"),
          });
        }

        if (trait.isMissing) {
          expandableRows.push({
            id: `${trait.id}-missing`,
            type: "missing",
            message: t("ValidationMessages.TraitOptionMissingConfiguration"),
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
          <div className={cs.expandableRow} key={item.id}>
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
      debouncedSubmit.current();
    }
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
    onAction("detachPhotoFromVariant", row.original);
    onAction("deletePhoto", row.original);
  }

  return (
    <SheProductCard
      loading={isLoading}
      title={t("CardTitles.ManageVariant")}
      showCloseButton
      onSecondaryButtonClick={() => onAction("closeVariantConfigurationCard")}
      className={cs.variantConfigurationCard}
      {...props}
    >
      <div className={cs.variantConfigurationCardContentWrapper}>
        <div className={cs.variantConfigurationCardContent}>
          <div className={cs.variantConfigurationForm}>
            <SheForm form={form as any} onSubmit={onSubmit}>
              <SheForm.Field name="variantName">
                <SheInput
                  label={t("ProductForm.Labels.OptionalVariantName")}
                  onDelay={handleFieldChange}
                  fullWidth
                />
              </SheForm.Field>
              <div className={cs.variantCodeFormRow}>
                <SheForm.Field
                  name="variantCode"
                  label={t("ProductForm.Labels.VariantCode")}
                >
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
                  <SheForm.Field
                    label={t("ProductForm.Labels.SalePriceNetto")}
                    name="salePrice.netto"
                  >
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
                        <FormLabel>{t("ProductForm.Labels.VAT")}</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(Number(value));
                            handleFieldChange();
                          }}
                          value={field.value ? field.value.toString() : ""}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={t("SelectOptions.SelectVAT")}
                              />
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
                    label={t("ProductForm.Labels.SalePriceBrutto")}
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
                {t("SectionTitles.StockDetails")}
              </span>
              <SheButton
                icon={Plus}
                variant="secondary"
                onClick={() => onAction("openAddStockCard")}
              >
                {t("CommonButtons.Add")}
              </SheButton>
              <SheButton
                icon={Minus}
                variant="secondary"
                onClick={() => onAction("openDisposeStockCard")}
              >
                {t("StockActions.Dispose")}
              </SheButton>
              <SheButton
                icon={Clock}
                variant="secondary"
                maxWidth="89px"
                onClick={() =>
                  onAction("openVariantHistoryCard", variant.variantId)
                }
              >
                {t("CommonButtons.History")}
              </SheButton>
            </div>
            <div className={cs.stockBlock}>
              <div className={cs.stockBlockRow}>
                <span className="she-text">
                  {t("StockForm.Labels.CurrentlyInStock")}
                </span>
                <span className={cs.stockBlockRowNumber}>
                  {variant?.stockAmount}
                </span>
              </div>
              <div className={cs.stockBlockRow}>
                <span className="she-text">
                  {t("ProductForm.Labels.UnitsSold")}
                </span>
                <span className={cs.stockBlockRowNumber}>
                  {variant?.soldUnits}
                </span>
              </div>
            </div>
          </div>
          <div className={cs.variantGridBlock}>
            <div className={cs.variantGridBlockHeader}>
              <span className="she-title">
                {t("ProductForm.Labels.VariantTraits")}
              </span>
              <SheButton
                icon={Blocks}
                variant="secondary"
                onClick={() => onAction("openManageTraitsCard")}
              >
                {t("CommonButtons.Manage")}
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
              <span className="she-title">
                {t("ProductForm.Labels.VariantPhotos")}
              </span>
              <SheButton
                icon={ImagePlus}
                variant="secondary"
                onClick={() =>
                  onAction("openVariantPhotosCard", variant.variantId)
                }
              >
                {t("CommonButtons.Manage")}
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
          title={t("CardTitles.DeleteVariant")}
          text={t("ConfirmationMessages.DeleteVariant")}
          buttonColor="#EF4343"
          buttonVariant="outline"
          buttonText={t("CommonButtons.Delete")}
          buttonIcon={Trash2}
          onClick={() => onAction("deleteVariant", variant)}
        />
      </div>
    </SheProductCard>
  );
}
