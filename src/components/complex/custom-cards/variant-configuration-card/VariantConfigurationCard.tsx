import React from "react";

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
import { VariantConfigurationGridColumns } from "@/components/complex/grid/variant-configuration-grid/VariantConfigurationGridColumns.tsx";
import { DndGridDataTable } from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { ProductPhotosGridColumns } from "@/components/complex/grid/product-photos-grid/ProductPhotosGridColumns.tsx";

export default function VariantConfigurationCard({
  variant,
  data,
  onAction,
  ...props
}: IVariantConfigurationCard) {
  const traitsColumns = VariantConfigurationGridColumns;
  const photoColumns = ProductPhotosGridColumns(onGridAction);

  function onGridAction(
    _actionType: string,
    _rowId?: string,
    _setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: any,
  ) {
    onAction("delete", row.original);
  }

  return (
    <SheProductCard
      title="Manage Variant"
      view="card"
      showCloseButton
      width="420px"
      className={cs.variantConfigurationCard}
      {...props}
    >
      <div className={cs.variantConfigurationCardContent}>
        <div className={cs.inputBlock}>
          <SheInput
            label="Optional Variant Name"
            value={variant?.variantName}
          />
          <div className={cs.inputBlockRow}>
            <SheInput
              fullWidth
              label="Variant Code"
              value={variant?.variantCode}
            />
            <SheButton icon={WandSparklesIcon} variant="outline" />
          </div>
        </div>
        <div className={cs.salePriceBlock}>
          <div className={`${cs.salePriceBlockTitle} she-title`}>
            Current Sale Price
          </div>
          <div className={cs.salePriceBlockInput}>
            <SheInput label="Sale price" value={variant?.salePrice ?? "0"} />
            <SheInput label="VAT" />
            <SheInput label="Sale price brutto" />
          </div>
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
            <SheButton icon={Blocks} variant="outline">
              Manage
            </SheButton>
          </div>
          <div>
            <DndGridDataTable
              showHeader={false}
              columns={traitsColumns}
              data={variant.traitOptions}
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
              onClick={() => onAction("openProductPhotosCard")}
            >
              Manage
            </SheButton>
          </div>
          {variant.photos.length > 0 && (
            <div className={cs.managePhotosGrid}>
              <DndGridDataTable
                enableDnd={true}
                showHeader={false}
                columns={photoColumns}
                data={variant.photos}
                gridModel={data}
                onNewItemPosition={(newIndex, activeItem) =>
                  onAction("dnd", { newIndex, activeItem })
                }
              />
            </div>
          )}
        </div>
      </div>
    </SheProductCard>
  );
}
