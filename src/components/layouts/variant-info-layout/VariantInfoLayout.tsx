import { ImageIcon } from "lucide-react";
import React from "react";

import cs from "./VariantInfoLayout.module.scss";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import { IVariantInfoLayout } from "@/const/interfaces/layouts/IVariantInfoLayout.ts";

export default function VariantInfoLayout({
  variant,
  isFullWidth,
}: IVariantInfoLayout) {
  const traitOptions = variant?.traitOptions || [];
  const colorOptions = traitOptions.filter(
    (option) => option.traitTypeId === 2 && option.optionColor,
  );
  const sizeOptions = traitOptions.filter(
    (option) => option.traitTypeId === 1 && option.optionName,
  );

  return (
    <div className={cs.variantBlock}>
      <div className={cs.variantPhoto}>
        {variant?.photo?.thumbnailUrl ? (
          <img
            src={variant?.photo?.thumbnailUrl}
            alt={variant?.variantName || "Variant"}
          />
        ) : (
          <div className={cs.variantPhotoIcon}>
            <SheIcon icon={ImageIcon} maxWidth="30px" />
          </div>
        )}
      </div>
      <div className={cs.variantInfoBlock}>
        <div className={cs.variantNameBlock}>
          <SheTooltip
            delayDuration={200}
            text={variant?.variantName}
            className={isFullWidth ? "" : cs.variantName}
          >
            <span className="she-text">{variant?.variantName}</span>
          </SheTooltip>
        </div>
        <div className={cs.variantDetailsBlock}>
          <div className={cs.variantTraitsBlock}>
            <div className={cs.variantTraits}>
              {colorOptions?.map((colorOpt, index) => (
                <div
                  className={cs.colorOptions}
                  key={`color-${index}`}
                  style={{
                    background: colorOpt.optionColor,
                  }}
                />
              ))}
              {sizeOptions?.map((sizeOpt, index) => (
                <span key={`size-${index}`} className="she-text">
                  {sizeOpt.optionName}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
