import { LayoutList, MoreHorizontal, Plus } from "lucide-react";
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
import { DndGridDataTable } from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { ManageVariantsGridColumns } from "@/components/complex/grid/manage-variants-grid/ManageVariantsGridColumns.tsx";
import { IManageVariantsCard } from "@/const/interfaces/complex-components/custom-cards/IManageVariantsCard.ts";

export default function ManageVariantsCard({
  data,
  traits,
  variants,
  onChooseVariantTraits,
  onAction,
  ...props
}: IManageVariantsCard) {
  const colorColumns = ManageVariantsGridColumns(onGridAction);

  function onGridAction() {}

  return (
    <SheProductCard
      title="Manage Variants"
      view="card"
      showPrimaryButton={false}
      primaryButtonTitle="Save"
      showSecondaryButton={false}
      secondaryButtonTitle="Cancel"
      showCloseButton={true}
      className={cs.manageVariantsCard}
      width="350px"
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
                  <DropdownMenuItem>
                    <span className="she-text">Delete</span>
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
            onClick={onChooseVariantTraits}
          >
            Create Variant
          </SheButton>
          {traits.length > 0 && (
            <>
              <span>or</span>
              <SheButton icon={LayoutList} variant="outline">
                Generate Set
              </SheButton>
            </>
          )}
        </div>
        <div>
          {traits.length > 10 && (
            <DndGridDataTable
              enableDnd={true}
              showHeader={false}
              showColumnsHeader={false}
              columns={colorColumns}
              data={variants}
              gridModel={data}
              onNewItemPosition={(newIndex, activeItem) =>
                onAction("dnd", { newIndex, activeItem })
              }
            />
          )}
        </div>
      </div>
    </SheProductCard>
  );
}
