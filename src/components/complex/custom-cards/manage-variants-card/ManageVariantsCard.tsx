import { Plus, SlidersVertical } from "lucide-react";
import React, { Fragment } from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ManageVariantsCard.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { TraitModel } from "@/const/models/TraitModel.ts";
import { ManageVariantsGridColumns } from "@/components/complex/grid/manage-variants-grid/ManageVariantsGridColumns.tsx";
import { IManageVariantsCard } from "@/const/interfaces/complex-components/custom-cards/IManageVariantsCard.ts";
import {
  DataWithId,
  DndGridDataTable,
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { ColumnDef } from "@tanstack/react-table";
import { Separator } from "@/components/ui/separator.tsx";

export default function ManageVariantsCard({
  isLoading,
  isVariantsLoading,
  data,
  traits,
  variants,
  productCounter,
  onAction,
  ...props
}: IManageVariantsCard) {
  function handleAction(actionType: any, payload?: any) {
    switch (actionType) {
      case "manageVariant":
        onAction("manageVariant", payload);
        break;
      case "activateVariant":
        onAction("activateVariant", payload);
        break;
      case "dnd":
        const { newIndex, activeItem } = payload;
        onAction("changeVariantPosition", { newIndex, activeItem });
        break;
      case "deleteVariant":
        onAction("deleteVariant", payload);
        break;
    }
  }

  function onGridAction(
    actionType: string,
    _rowId?: string,
    _setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: any,
  ) {
    switch (actionType) {
      case "activateVariant":
        handleAction("activateVariant", row.original);
        break;
      case "manageVariant":
        handleAction("manageVariant", row);
        break;
      case "changeVariantPosition":
        handleAction("changeVariantPosition", {
          newIndex: row.newIndex,
          activeItem: row.original,
        });
        break;
      case "deleteVariant":
        handleAction("deleteVariant", row);
        break;
    }
  }

  return (
    <SheProductCard
      loading={isLoading}
      title="Manage Variants"
      showPrimaryButton={false}
      primaryButtonTitle="Save"
      showSecondaryButton={false}
      secondaryButtonTitle="Cancel"
      className={cs.manageVariantsCard}
      minWidth={"420px"}
      {...props}
    >
      <div className={cs.manageVariantsContent}>
        <div className={cs.textBlock}>
          {traits.length > 0 ? (
            <span className="she-text">
              The product is described by following traits:{" "}
              {traits.map((trait: TraitModel, index: number) => (
                <Fragment key={trait.traitId}>
                  <b>{trait.traitName}</b>
                  {index < traits.length - 1 ? ", " : ""}
                </Fragment>
              ))}
            </span>
          ) : (
            <span className="she-text">
              The product is not described by traits yet. Please select at least
              one trait to create variants.
            </span>
          )}
          {traits.length > 0 && (
            <SheButton
              icon={SlidersVertical}
              variant="secondary"
              value="Manage Traits"
              onClick={() => onAction("openChooseVariantTraitsCard")}
            />
          )}
        </div>
        <Separator />
        <div className={cs.buttonBlock}>
          <span className="she-title">Variants</span>
          <SheButton
            icon={Plus}
            variant="outline"
            onClick={() => {
              onAction?.(
                traits.length > 0
                  ? "openAddVariantCard"
                  : "openChooseVariantTraitsCard",
              );
            }}
          >
            {traits.length > 0 ? "Create Variant" : "Select Traits"}
          </SheButton>
          {/*{traits.length === 0 && (*/}
          {/*  <>*/}
          {/*    <span>or</span>*/}
          {/*    <SheButton icon={LayoutList} variant="outline">*/}
          {/*      Generate Set*/}
          {/*    </SheButton>*/}
          {/*  </>*/}
          {/*)}*/}
        </div>
        <div>
          <DndGridDataTable
            isLoading={isVariantsLoading}
            className={cs.manageVariantsCardGrid}
            enableDnd={true}
            showHeader={false}
            columns={
              ManageVariantsGridColumns(onGridAction) as ColumnDef<DataWithId>[]
            }
            data={variants}
            gridModel={data}
            customMessage="PRODUCT HAS NO VARIANTS"
            onNewItemPosition={(newIndex, activeItem) =>
              handleAction("dnd", { newIndex, activeItem })
            }
          />
        </div>
      </div>
    </SheProductCard>
  );
}
