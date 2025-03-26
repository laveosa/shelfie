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

export default function VariantConfigurationCard({
  variant,
  data,
  ...props
}: IVariantConfigurationCard) {
  console.log("VARIANT", variant);

  return (
    <SheProductCard
      title="Manage Variant"
      view="card"
      showCloseButton
      width="450px"
      className={cs.variantConfigurationCard}
      {...props}
    >
      <div className={cs.VariantConfigurationCardContent}>
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
            <SheButton icon={Plus} variant="outline">
              Add
            </SheButton>
            <SheButton icon={Minus} variant="outline">
              Dispose
            </SheButton>
            <SheButton icon={Clock} variant="outline">
              History
            </SheButton>
          </div>
          <div className={cs.stockBlock}>
            <div className={cs.stockBlockRow}>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div className={cs.variantTraitsBlock}>
          <div className={cs.variantTraitsBlockHeader}>
            <span className="she-title">Variant Traits</span>
            <SheButton icon={Blocks} variant="outline">
              Manage
            </SheButton>
          </div>
          <div className={cs.variantTraitsList}>
            <DndGridDataTable
              showHeader={false}
              columns={VariantConfigurationGridColumns}
              data={variant.traitOptions}
              gridModel={data}
            />
          </div>
        </div>
        <div className={cs.variantPhotosBlock}>
          <div className={cs.variantTraitsBlockHeader}>
            <span className="she-title">Variant Photos</span>
            <SheButton icon={ImagePlus} variant="outline">
              Manage
            </SheButton>
          </div>
          <div className={cs.variantTraitsList}></div>
        </div>
      </div>
    </SheProductCard>
  );
}
