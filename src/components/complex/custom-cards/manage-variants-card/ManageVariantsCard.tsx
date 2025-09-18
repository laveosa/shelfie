import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import React, { Fragment } from "react";

import { Plus, SlidersVertical } from "lucide-react";

import cs from "./ManageVariantsCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { TraitModel } from "@/const/models/TraitModel.ts";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { ManageVariantsGridColumns } from "@/components/complex/grid/custom-grids/manage-variants-grid/ManageVariantsGridColumns.tsx";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";
import { IManageVariantsCard } from "@/const/interfaces/complex-components/custom-cards/IManageVariantsCard.ts";

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
  const { t } = useTranslation();

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
      title={t("CardTitles.ManageVariants")}
      showPrimaryButton={false}
      primaryButtonTitle={t("CommonButtons.Save")}
      showSecondaryButton={false}
      secondaryButtonTitle={t("CommonButtons.Cancel")}
      className={cs.manageVariantsCard}
      minWidth={"420px"}
      {...props}
    >
      <div className={cs.manageVariantsContent}>
        <div className={cs.textBlock}>
          {traits?.length > 0 ? (
            <>
              <span className="she-text">
                {t("ProductForm.Labels.ProductDescribedByTraits")}{" "}
                {traits.map((trait: TraitModel, index: number) => (
                  <Fragment key={trait.traitId}>
                    <b>{trait.traitName}</b>
                    {index < traits.length - 1 ? ", " : ""}
                  </Fragment>
                ))}
              </span>
              <SheButton
                icon={SlidersVertical}
                variant="secondary"
                value={t("ProductActions.ManageTraits")}
                onClick={() => onAction("openChooseVariantTraitsCard")}
              />
            </>
          ) : (
            <>
              <span className="she-text">
                {t("ProductForm.Labels.ProductNotDescribedByTraits")}
              </span>
              <SheButton
                icon={Plus}
                variant="secondary"
                value={t("ProductActions.SelectTraits")}
                onClick={() => {
                  onAction("openChooseVariantTraitsCard");
                }}
              />
            </>
          )}
        </div>
        <Separator />
        <div className={cs.buttonBlock}>
          <span className="she-title">{t("SectionTitles.Variant")}</span>
          {traits.length > 0 && (
            <SheButton
              icon={Plus}
              variant="secondary"
              value={t("ProductActions.CreateVariant")}
              onClick={() => {
                onAction("openAddVariantCard");
              }}
            />
          )}

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
          <SheGrid
            isLoading={isVariantsLoading}
            className={cs.manageVariantsCardGrid}
            enableDnd={true}
            showHeader={false}
            columns={
              ManageVariantsGridColumns(onGridAction) as ColumnDef<DataWithId>[]
            }
            data={variants}
            gridRequestModel={data}
            customMessage={t("ProductMessages.NoVariants")}
            onNewItemPosition={(newIndex, activeItem) =>
              handleAction("dnd", { newIndex, activeItem })
            }
          />
        </div>
      </div>
    </SheProductCard>
  );
}
