import { MoreHorizontal, Plus } from "lucide-react";
import React, { Fragment } from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ManageVariantsCard.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { TraitModel } from "@/const/models/TraitModel.ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { ManageVariantsGridColumns } from "@/components/complex/grid/manage-variants-grid/ManageVariantsGridColumns.tsx";
import { IManageVariantsCard } from "@/const/interfaces/complex-components/custom-cards/IManageVariantsCard.ts";
import { DndGridDataTable } from "@/components/complex/grid/dnd-grid/DndGrid.tsx";

export default function ManageVariantsCard({
  data,
  traits,
  variants,
  onAction,
  ...props
}: IManageVariantsCard) {
  const columns = ManageVariantsGridColumns(onGridAction);

  function handleAction(actionType: any, payload?: any) {
    switch (actionType) {
      case "manageVariant":
        onAction("manageVariant", payload);
        break;
      case "activateVariant":
        console.log("OnAction", payload);
        onAction("activateVariant", payload);
        break;
      case "dnd":
        const { newIndex, activeItem } = payload;
        onAction("changeVariantPosition", { newIndex, activeItem });
        break;
    }
  }

  function onGridAction(
    _actionType: string,
    _rowId?: string,
    _setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: any,
  ) {
    handleAction("activateVariant", row);
    handleAction("manageVariant", row.original);
    handleAction("changeVariantPosition", {
      newIndex: row.newIndex,
      activeItem: row.original,
    });
  }

  return (
    <SheProductCard
      title="Manage Variants"
      view="card"
      showPrimaryButton={false}
      primaryButtonTitle="Save"
      showSecondaryButton={false}
      secondaryButtonTitle="Cancel"
      className={cs.manageVariantsCard}
      width="385px"
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
            <div className={cs.dropdownMenu}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SheButton variant="secondary">
                    <MoreHorizontal />
                  </SheButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[160px]">
                  <DropdownMenuItem
                    onClick={() => onAction("openChooseVariantTraitsCard")}
                  >
                    <span className="she-text">Manage traits</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
        <div className={cs.buttonBlock}>
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
          {variants?.length > 0 && (
            <DndGridDataTable
              className={cs.manageVariantsCardGrid}
              enableDnd={true}
              showHeader={false}
              columns={columns}
              data={variants}
              gridModel={data}
              onNewItemPosition={(newIndex, activeItem) =>
                handleAction("dnd", { newIndex, activeItem })
              }
            />
          )}
        </div>
      </div>
    </SheProductCard>
  );
}
