import { useForm } from "react-hook-form";
import React, { useEffect } from "react";

import { Plus } from "lucide-react";

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
import cs from "./ProductTraitConfigurationCard.module.scss";
import { SheForm } from "@/components/forms/she-form/SheForm.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { IProductTraitConfigurationCard } from "@/const/interfaces/complex-components/custom-cards/IProductTraitConfigurationCard.ts";
import { ColorOptionsGridColumns } from "@/components/complex/grid/trait-options-grid/color-options-grid/ColorOptionsGridColumns.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { SizeOptionsGridColumns } from "@/components/complex/grid/trait-options-grid/size-options-grid/SizeOptionsGridColumns.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import SheCard from "@/components/complex/she-card/SheCard.tsx";

export default function ProductTraitConfigurationCard({
  isLoading,
  isGridLoading,
  data,
  typesOfTraits,
  selectedTrait,
  onAction,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  ...props
}: IProductTraitConfigurationCard) {
  // ==================================================================== STATE MANAGEMENT
  const [localItems, setLocalItems] = React.useState(data?.items ?? []);

  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();
  const form = useForm({
    defaultValues: {
      traitName: selectedTrait ? selectedTrait.traitName : "",
      traitTypeId: selectedTrait ? selectedTrait.traitTypeId : "",
    },
  });

  // ==================================================================== SIDE EFFECTS
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

  // ==================================================================== EVENT HANDLERS
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

  // ==================================================================== LAYOUT
  console.log(selectedTrait);

  return (
    <SheCard
      className={cs.productTraitConfigurationCard}
      title={
        selectedTrait?.traitId
          ? translate("CardTitles.ManageTrait", {
              traitName: selectedTrait.traitName,
            })
          : translate("CardTitles.CreateProductTrait")
      }
      isLoading={isLoading}
      showNotificationCard={!!selectedTrait?.traitId}
      notificationCardProps={{
        title: "Delete Trait",
        titleTransKey: "CardTitles.DeleteTrait",
        text: "This trait will be deleted, it will no longer be available for selection but you will still see it in products where it was used, until you change the trait",
        textTransKey: "ConfirmationMessages.DeleteTrait",
        onClick: () => onAction("deleteTrait", selectedTrait),
      }}
      showCloseButton
      onSecondaryButtonClick={onSecondaryButtonClick}
      {...props}
    >
      <div className={cs.productTraitConfigurationContent}>
        <div className={cs.productTraitConfigurationForm}>
          <SheForm form={form as any} onSubmit={onSubmit}>
            <SheForm.Field
              rules={{
                required: true,
                minLength: {
                  value: 3,
                  message: translate(
                    "ProductForm.Validation.TraitNameMinLength",
                  ),
                },
                maxLength: {
                  value: 50,
                  message: translate(
                    "ProductForm.Validation.TraitNameMaxLength",
                  ),
                },
              }}
              name="traitName"
            >
              <SheInput
                className={cs.formInput}
                label="Trait Name"
                labelTransKey="ProductForm.Labels.TraitName"
                placeholder="enter trait name..."
                placeholderTransKey="ProductForm.Placeholders.TraitName"
                isValid={!form.formState.errors.traitName}
                patternErrorMessage={form.formState.errors.traitName?.message}
                showError={true}
                onDelay={
                  selectedTrait?.traitId && (() => onSubmit(form.getValues()))
                }
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
                    <FormItem>
                      <FormLabel>
                        {translate("ProductForm.Labels.TraitType")}
                      </FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(Number(value));
                          selectedTrait?.traitId && onSubmit(form.getValues());
                        }}
                        value={field.value ? field.value.toString() : ""}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={translate(
                                "ProductForm.Placeholders.SelectTraitType",
                              )}
                            />
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
                  value="Cancel"
                  valueTransKey="CommonButtons.Cancel"
                  variant="secondary"
                  onClick={() =>
                    onAction("closeProductTraitConfigurationCard", null)
                  }
                />
                <SheButton
                  value="Create Trait"
                  valueTransKey="ProductActions.CreateTrait"
                  icon={Plus}
                  variant="info"
                  disabled={!form.formState.isValid}
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
              <span className="she-title">
                {translate("ProductForm.Labels.Options")}
              </span>
              {selectedTrait?.traitTypeId === 1 && (
                <SheGrid
                  isLoading={isGridLoading}
                  className={cs.productTraitConfigurationGrid}
                  enableDnd={true}
                  showHeader={false}
                  showColumnsHeader={false}
                  columns={SizeOptionsGridColumns(onGridAction)}
                  data={localItems as any}
                  gridRequestModel={data}
                  cellPadding="10px 10px"
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
                <SheGrid
                  isLoading={isGridLoading}
                  className={cs.productTraitConfigurationGrid}
                  enableDnd={true}
                  showHeader={false}
                  showColumnsHeader={false}
                  columns={ColorOptionsGridColumns(onGridAction)}
                  data={localItems as any}
                  gridRequestModel={data}
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
            value="Add option"
            valueTransKey="ProductActions.AddTraitOption"
            icon={Plus}
            variant="outline"
            onClick={() => onGridAction("addOption")}
          />
        )}
      </div>
    </SheCard>
  );
}
