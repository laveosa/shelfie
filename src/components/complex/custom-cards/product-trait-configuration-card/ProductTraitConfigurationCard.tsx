import { ColumnDef } from "@tanstack/react-table";
import { Plus, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";

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
import cs from "./ProductTraitConfigurationCard.module.scss";
import { SheForm } from "@/components/forms/she-form/SheForm.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import {
  DataWithId,
  DndGridDataTable,
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { IProductTraitConfigurationCard } from "@/const/interfaces/complex-components/custom-cards/IProductTraitConfigurationCard.ts";
import { ColorOptionsGridColumns } from "@/components/complex/grid/trait-options-grid/color-options-grid/ColorOptionsGridColumns.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { SizeOptionsGridColumns } from "@/components/complex/grid/trait-options-grid/size-options-grid/SizeOptionsGridColumns.tsx";
import SheCardNotification from "@/components/complex/she-card-notification/SheCardNotification.tsx";

export default function ProductTraitConfigurationCard({
  isLoading,
  isGridLoading,
  data,
  typesOfTraits,
  selectedTrait,
  onAction,
  onPrimaryButtonClick,
  ...props
}: IProductTraitConfigurationCard) {
  const [localItems, setLocalItems] = React.useState(data?.items ?? []);
  const form = useForm({
    defaultValues: {
      traitName: selectedTrait ? selectedTrait.traitName : "",
      traitTypeId: selectedTrait ? selectedTrait.traitTypeId : "",
    },
  });

  useEffect(() => {
    if (selectedTrait) {
      form.reset({
        traitName: selectedTrait.traitName,
        traitTypeId: selectedTrait.traitTypeId,
      });
    }

    setLocalItems(data?.items ?? []);
  }, [selectedTrait, form, data]);

  useEffect(() => {
    if (selectedTrait) {
      form.reset({
        traitName: selectedTrait.traitName,
        traitTypeId: selectedTrait.traitTypeId,
      });
    }
  }, [selectedTrait, form]);

  const colorColumns = ColorOptionsGridColumns(
    onGridAction,
  ) as ColumnDef<DataWithId>[];
  const sizeColumns = SizeOptionsGridColumns(
    onGridAction,
  ) as ColumnDef<DataWithId>[];

  function onSubmit(formData) {
    selectedTrait?.traitId
      ? onAction("updateTrait", formData)
      : onAction("createTrait", formData);
  }

  function onGridAction(
    actionType: string,
    _rowId?: string,
    _setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: any,
    optionId?: number,
    updatedModel?,
  ) {
    switch (actionType) {
      case "deleteOption":
        if (row) {
          onAction("deleteOption", row.original);
        }
        break;
      case "updateOption":
        if (updatedModel && optionId != null) {
          setLocalItems((prev) =>
            prev.map((item) =>
              item.optionId === optionId ? { ...item, ...updatedModel } : item,
            ),
          );
          onAction("updateOption", { optionId, updatedModel });
        }
        break;
      case "addOption":
        onAction("addOption", null);
        break;
    }
  }

  return (
    <SheProductCard
      loading={isLoading}
      title={`${selectedTrait?.traitId ? `Manage: ${selectedTrait.traitName}` : "Create product trait"}`}
      showCloseButton={true}
      className={cs.productTraitConfigurationCard}
      {...props}
    >
      <div className={cs.productTraitConfigurationContentWrapper}>
        <div className={cs.productTraitConfigurationContent}>
          <div className={cs.productTraitConfigurationForm}>
            <SheForm form={form as any} onSubmit={onSubmit}>
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
                name="traitName"
              >
                <SheInput
                  label="Trait Name"
                  placeholder="enter trait name..."
                  isValid={!form.formState.errors.traitName}
                  patternErrorMessage={form.formState.errors.traitName?.message}
                  showError={true}
                  onDelay={
                    selectedTrait?.traitId && (() => onSubmit(form.getValues()))
                  }
                  className={cs.formInput}
                />
              </SheForm.Field>
              {!selectedTrait?.traitId && (
                <div className={cs.productConfigurationFormRow}>
                  <FormField
                    control={form.control}
                    name="traitTypeId"
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <FormItem className={cs.select}>
                        <FormLabel>Trait type</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(Number(value));
                            selectedTrait?.traitId &&
                              onSubmit(form.getValues());
                          }}
                          value={field.value ? field.value.toString() : ""}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {typesOfTraits?.map((option) => (
                              <SelectItem
                                key={option.traitTypeId}
                                value={option.traitTypeId.toString()}
                              >
                                <div>{option.traitTypeName}</div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  ></FormField>
                </div>
              )}

              {!selectedTrait?.traitId && (
                <div className={cs.buttonBlock}>
                  <SheButton
                    variant="secondary"
                    value="Cancel"
                    onClick={() =>
                      onAction("closeProductTraitConfigurationCard", null)
                    }
                  />
                  <SheButton
                    disabled={!form.formState.isValid}
                    icon={Plus}
                    bgColor="#007AFF"
                    value={"Create Trait"}
                    onClick={form.handleSubmit(onSubmit)}
                  />
                </div>
              )}
            </SheForm>
          </div>
          {/*{localItems?.length > 0 && (*/}
          {selectedTrait?.traitId && (
            <>
              <Separator />
              <div
                className={`${cs.productTraitConfigurationGridContainer} she-title`}
              >
                <span className="she-title">Options</span>
                {selectedTrait?.traitTypeId === 1 && (
                  <DndGridDataTable
                    isLoading={isGridLoading}
                    className={cs.productTraitConfigurationGrid}
                    enableDnd={true}
                    showHeader={false}
                    showColumnsHeader={false}
                    columns={sizeColumns}
                    data={localItems}
                    gridModel={data}
                    // cellPadding="10px 10px"
                    onNewItemPosition={(newIndex, activeItem) =>
                      onAction("dndTraitOption", {
                        selectedTrait,
                        newIndex,
                        activeItem,
                      })
                    }
                  />
                )}
                {selectedTrait?.traitTypeId === 2 && (
                  <DndGridDataTable
                    isLoading={isGridLoading}
                    className={cs.productTraitConfigurationGrid}
                    enableDnd={true}
                    showHeader={false}
                    showColumnsHeader={false}
                    columns={colorColumns}
                    data={localItems}
                    gridModel={data}
                    // cellPadding="10px 10px"
                    onNewItemPosition={(newIndex, activeItem) =>
                      onAction("dndTraitOption", {
                        selectedTrait,
                        newIndex,
                        activeItem,
                      })
                    }
                  />
                )}
              </div>
            </>
          )}
          {selectedTrait?.traitId && (
            <SheButton
              icon={Plus}
              variant="outline"
              onClick={() => onGridAction("addOption")}
            >
              Add option
            </SheButton>
          )}
        </div>
        {selectedTrait?.traitId && (
          <SheCardNotification
            title="Delete Trait"
            text="This trait will be deleted, it will no longer be available for selection but you will still see it in products where it was used, until you change the trait"
            buttonColor="#EF4343"
            buttonVariant="outline"
            buttonText="Delete"
            buttonIcon={Trash2}
            onClick={() => onAction("deleteTrait", selectedTrait)}
          />
        )}
      </div>
    </SheProductCard>
  );
}
