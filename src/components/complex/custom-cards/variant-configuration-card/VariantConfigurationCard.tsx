import React, { useEffect, useRef, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";

import {
  Blocks,
  Clock,
  ImagePlus,
  Minus,
  Plus,
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
import cs from "./VariantConfigurationCard.module.scss";
import {
  IVariantConfigurationCard
} from "@/const/interfaces/complex-components/custom-cards/IVariantConfigurationCard.ts";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { SheForm } from "@/components/forms/she-form/SheForm.tsx";
import { ProductCodeModel } from "@/const/models/ProductCodeModel.ts";
import { VariantModel } from "@/const/models/VariantModel.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon";
import InfoIcon from "@/assets/icons/Info-icon.svg?react";
import {
  VariantConfigurationGridColumns
} from "@/components/complex/grid/custom-grids/variant-configuration-grid/VariantConfigurationGridColumns.tsx";
import {
  VariantPhotosGridColumns
} from "@/components/complex/grid/custom-grids/product-photos-grid/VariantPhotosGridColumns.tsx";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";

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
  // ==================================================================== STATE MANAGEMENT
  const [initialFormValues, setInitialFormValues] = useState({
    variantName: variant?.variantName || "",
    variantCode: variant?.variantCode || "",
    salePrice: {
      brutto: variant?.salePrice?.brutto,
      netto: variant?.salePrice?.netto,
      taxTypeId: variant?.salePrice?.taxTypeId || taxesList?.[0]?.id,
    },
  });

  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();
  const traitsColumns =
    VariantConfigurationGridColumns as ColumnDef<DataWithId>[];
  const photoColumns = VariantPhotosGridColumns(
    onGridActionHandler,
  ) as ColumnDef<DataWithId>[];
  const form = useForm({
    defaultValues: initialFormValues,
  });
  const { setValue, register, getValues } = form;
  const preparedTraitOptions = prepareTraitOptionsData(variant?.traitOptions);

  // ==================================================================== REF
  const currentVariantIdRef = useRef<string | number | null>(
    variant?.variantId || null,
  );
  const userModifiedForm = useRef(false);
  const lastChanged = useRef<"netto" | "brutto" | null>(null);
  const debouncedSubmit = useRef(
    debounce(() => {
      if (userModifiedForm.current) {
        form.handleSubmit(onSubmitHandler)();
      }
    }, 1500),
  );

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    if (debouncedSubmit.current) {
      debouncedSubmit.current = debounce(() => {
        if (userModifiedForm.current) {
          form.handleSubmit(onSubmitHandler)();
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

  // ==================================================================== EVENT HANDLERS
  function onGenerateCodeHandler() {
    onGenerateProductCode().then((res: ProductCodeModel) => {
      form.setValue("variantCode", res.code, { shouldDirty: true });
      userModifiedForm.current = true;
      form.handleSubmit(onSubmitHandler)();
    });
  }

  function onFieldChangeHandler() {
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

  function onSubmitHandler(formData: VariantModel) {
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

  function onGridActionHandler(
    _actionType: string,
    _rowId?: string,
    _setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: any,
  ) {
    onAction("detachPhotoFromVariant", row.original);
    onAction("deletePhoto", row.original);
  }

  // ==================================================================== PRIVATE
  function prepareTraitOptionsData(traitOptions) {
    return (
      traitOptions?.map((trait) => {
        const expandableRows = [];

        if (trait.isRemoved) {
          expandableRows.push({
            id: `${trait.id}-removed`,
            type: "removed",
            message: translate("ValidationMessages.TraitOptionRemoved"),
          });
        }

        if (trait.isMissing) {
          expandableRows.push({
            id: `${trait.id}-missing`,
            type: "missing",
            message: translate(
              "ValidationMessages.TraitOptionMissingConfiguration",
            ),
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

  // ==================================================================== LAYOUT
  return (
    <SheCard
      className={cs.variantConfigurationCard}
      title="Manage Variant"
      titleTransKey="CardTitles.ManageVariant"
      showCloseButton
      isLoading={isLoading}
      showNotificationCard
      notificationCardProps={{
        title: "Delete Variant",
        titleTransKey: "CardTitles.DeleteVariant",
        text: "This variant will be deleted, it will no longer be available for sale but you will still see it in the orders where it sold",
        textTransKey: "ConfirmationMessages.DeleteVariant",
        onClick: () => onAction("deleteVariant", variant),
      }}
      onSecondaryButtonClick={() => onAction("closeVariantConfigurationCard")}
      {...props}
    >
      <div className={cs.variantConfigurationCardContent}>
        <div className={cs.variantConfigurationForm}>
          <SheForm form={form as any} onSubmit={onSubmitHandler}>
            <SheForm.Field name="variantName">
              <SheInput
                label="Optional Variant Name"
                labelTransKey="ProductForm.Labels.OptionalVariantName"
                fullWidth
                onDelay={onFieldChangeHandler}
              />
            </SheForm.Field>
            <div className={cs.variantCodeFormRow}>
              <SheForm.Field
                name="variantCode"
                label={translate("ProductForm.Labels.VariantCode")}
              >
                <div>
                  <SheInput
                    value={variant?.variantCode}
                    {...(register("variantCode", {}) as any)}
                    onDelay={onFieldChangeHandler}
                  />
                </div>
              </SheForm.Field>
              <SheButton
                icon={WandSparklesIcon}
                type="button"
                variant="outline"
                onClick={onGenerateCodeHandler}
              />
            </div>
            <div className={cs.priceFormRow}>
              <div className={cs.priceFormRowItem}>
                <SheForm.Field
                  label={translate("ProductForm.Labels.SalePriceNetto")}
                  name="salePrice.netto"
                >
                  <SheInput
                    type="number"
                    step="any"
                    {...(register("salePrice.netto", {
                      onChange: () => {
                        lastChanged.current = "netto";
                        onFieldChangeHandler();
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
                      <FormLabel>
                        {translate("ProductForm.Labels.VAT")}
                      </FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(Number(value));
                          lastChanged.current = "netto";
                          onFieldChangeHandler();
                        }}
                        value={field.value ? field.value.toString() : ""}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={translate("SelectOptions.SelectVAT")}
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
                  label={translate("ProductForm.Labels.SalePriceBrutto")}
                  name="salePrice.brutto"
                >
                  <SheInput
                    type="number"
                    step="any"
                    {...(register("salePrice.brutto", {
                      onChange: () => {
                        lastChanged.current = "brutto";
                        onFieldChangeHandler();
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
              {translate("SectionTitles.StockDetails")}
            </span>
            <SheButton
              value="Add"
              valueTransKey="CommonButtons.Add"
              icon={Plus}
              variant="secondary"
              onClick={() => onAction("openAddStockCard")}
            />
            <SheButton
              value="Dispose"
              valueTransKey="StockActions.Dispose"
              icon={Minus}
              variant="secondary"
              maxWidth="100px"
              minWidth="100px"
              onClick={() => onAction("openDisposeStockCard")}
            />
            <SheButton
              value="History"
              valueTransKey="CommonButtons.History"
              icon={Clock}
              variant="secondary"
              maxWidth="100px"
              minWidth="100px"
              onClick={() =>
                onAction("openVariantHistoryCard", variant.variantId)
              }
            />
          </div>
          <div className={cs.stockBlock}>
            <div className={cs.stockBlockRow}>
              <span className="she-text">
                {translate("StockForm.Labels.CurrentlyInStock", {
                  stockAmount: "",
                })}
              </span>
              <span className={cs.stockBlockRowNumber}>
                {variant?.stockAmount}
              </span>
            </div>
            <div className={cs.stockBlockRow}>
              <span className="she-text">
                {translate("ProductForm.Labels.UnitsSold")}
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
              {translate("ProductForm.Labels.VariantTraits")}
            </span>
            <SheButton
              value="Manage"
              valueTransKey="CommonButtons.Manage"
              icon={Blocks}
              variant="secondary"
              onClick={() => onAction("openManageTraitsCard")}
            />
          </div>
          <div>
            <SheGrid
              isLoading={isVariantOptionsGridLoading}
              showHeader={false}
              columns={traitsColumns}
              data={preparedTraitOptions}
              gridRequestModel={data}
              enableExpansion={true}
              renderExpandedContent={renderExpandedContent}
            />
          </div>
        </div>
        <div className={cs.variantGridBlock}>
          <div className={cs.variantGridBlockHeader}>
            <span className="she-title">
              {translate("ProductForm.Labels.VariantPhotos")}
            </span>
            <SheButton
              value="Manage"
              valueTransKey="CommonButtons.Manage"
              icon={ImagePlus}
              variant="secondary"
              onClick={() =>
                onAction("openVariantPhotosCard", variant.variantId)
              }
            />
          </div>
          {variant?.photos?.length > 0 && (
            <div>
              <SheGrid
                isLoading={isVariantPhotoGridLoading}
                enableDnd={true}
                showHeader={false}
                columns={photoColumns}
                data={variantPhotos}
                gridRequestModel={data}
                skeletonQuantity={productCounter?.gallery}
                onNewItemPosition={(newIndex, activeItem) =>
                  onAction("dndVariantPhoto", { newIndex, activeItem })
                }
              />
            </div>
          )}
        </div>
      </div>
    </SheCard>
  );
}
