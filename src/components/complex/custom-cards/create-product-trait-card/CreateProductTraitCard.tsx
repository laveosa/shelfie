import { useForm } from "react-hook-form";
import React from "react";

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
import cs from "./CreateProductTraitCard.module.scss";
import { SheForm } from "@/components/forms/she-form/SheForm.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { DndGridDataTable } from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { ProductPhotosGridColumns } from "@/components/complex/grid/product-photos-grid/ProductPhotosGridColumns.tsx";
import { ICreateProductTraitCard } from "@/const/interfaces/complex-components/custom-cards/ICreateProductTraitCard.ts";

type ActionType = "submit" | "delete" | "dnd";

export default function CreateProductTraitCard({
  data,
  typesOfTraits,
  onAction,
  onPrimaryButtonClick,
  ...props
}: ICreateProductTraitCard) {
  const form = useForm({
    defaultValues: {
      traitName: "",
      traitTypeId: null,
    },
  });

  function onSubmit(data) {
    handleAction("submit", data);
  }

  const columns = ProductPhotosGridColumns(onGridAction);

  function handleAction(actionType: ActionType, payload?: any) {
    switch (actionType) {
      case "submit":
        onAction("submit", payload);
        break;
      case "delete":
        onAction("delete", payload);
        break;
      case "dnd":
        const { newIndex, activeItem } = payload;
        onAction("dnd", { newIndex, activeItem });
        break;
    }
  }

  function onGridAction(
    _actionType: string,
    _rowId?: string,
    _setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: any,
  ) {
    handleAction("delete", row.original);
  }

  return (
    <SheProductCard
      title="Create product trait"
      view="card"
      showPrimaryButton={true}
      primaryButtonTitle="Create"
      showSecondaryButton={true}
      secondaryButtonTitle="Cancel"
      showCloseButton={true}
      primaryButtonDisabled={!form.formState.isValid}
      onPrimaryButtonClick={() => onSubmit(form.getValues())}
      className={cs.createProductTraitCard}
      {...props}
    >
      <div className={cs.createProductTraitContent}>
        <div className={cs.createProductTraitForm}>
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
              name="traitName"
            >
              <SheInput
                label="Trait Name"
                placeholder="enter trait name..."
                isValid={!form.formState.errors.traitName}
                error={form.formState.errors.traitName?.message}
                showError={true}
              />
            </SheForm.Field>
            <div className={cs.productConfigurationFormRow}>
              <FormField
                control={form.control}
                name="traitTypeId"
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
                        {typesOfTraits.map((option) => (
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
          </SheForm>
        </div>
        <Separator />
        <div className={cs.createProductTraitGrid}>
          <span className="she-title">Options</span>
          <DndGridDataTable
            enableDnd={true}
            showHeader={false}
            columns={columns}
            data={data}
            gridModel={data}
            onNewItemPosition={(newIndex, activeItem) =>
              handleAction("dnd", { newIndex, activeItem })
            }
          />
        </div>
      </div>
    </SheProductCard>
  );
}
