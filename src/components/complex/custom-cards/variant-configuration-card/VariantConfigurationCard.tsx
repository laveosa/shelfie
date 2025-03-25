import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./VariantConfigurationCard.module.scss";
import { ManageVariantsGridColumns } from "@/components/complex/grid/manage-variants-grid/ManageVariantsGridColumns.tsx";
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

export default function VariantConfigurationCard({
  variant,
  ...props
}: IVariantConfigurationCard) {
  const columns = ManageVariantsGridColumns(onGridAction);

  function onGridAction() {}

  return (
    <SheProductCard
      title="Manage Variant"
      view="card"
      className={cs.variantConfigurationCard}
      {...props}
    >
      <div className={cs.VariantConfigurationCardContent}>
        <div className={cs.inputBlock}>
          <SheInput label="Optional Variant Name" />
          <div className={cs.inputBlockRow}>
            <SheInput fullWidth label="Optional Variant Name" />
            <SheButton icon={WandSparklesIcon} variant="outline" />
          </div>
        </div>
        <div className={cs.salePriceBlock}>
          <div className=""></div>
          <SheInput label="Sale price" />
          <SheInput label="VAT" />
          <SheInput label="Sale price brutto" />
        </div>
        <Separator />
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
            <div className={cs.stockBlockRow}>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className={cs.variantTraitsBlock}>
            <div className={cs.variantTraitsBlockHeader}>
              <span className="she-title">Variant Traits</span>
              <SheButton icon={Blocks} variant="outline">
                Manage
              </SheButton>
            </div>
            <div className={cs.variantTraitsList}></div>
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
      </div>
    </SheProductCard>
  );
}
