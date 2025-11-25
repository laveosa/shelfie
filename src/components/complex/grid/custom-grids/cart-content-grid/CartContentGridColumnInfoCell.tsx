import { ImageIcon } from "lucide-react";
import React from "react";

import cs from "@/components/complex/grid/custom-grids/cart-content-grid/CartContentGridColumnsInfoCell.module.scss";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";

export function CartContentGridColumnInfoCell({ data, onAction }) {
  const [variantPrice, setVariantPrice] = React.useState(
    data.stockDocumentPrice.brutto,
  );

  return (
    <div className={cs.productCell}>
      <div className={cs.productPhoto}>
        {data.photo?.thumbnailUrl ? (
          <img
            src={data.photo?.thumbnailUrl}
            alt={data.variantName || "Variant"}
          />
        ) : (
          <div className={cs.productPhotoIcon}>
            <SheIcon icon={ImageIcon} maxWidth="30px" />
          </div>
        )}
      </div>
      <div className={cs.productInfoBlock}>
        <div className={cs.productNameBlock}>
          {data.brand && (
            <div>
              <SheTooltip
                delayDuration={200}
                text={data.brand?.brandName || "N/A"}
              >
                <div className={cs.productBrand}>
                  {data.brand?.thumbnail && (
                    <img
                      className={cs.productBrandPhoto}
                      src={data.brand?.thumbnail}
                      alt={data.brand?.brandName}
                    />
                  )}
                  <span className={`${cs.productBrandName} she-text`}>
                    {data.brand?.brandName || "N/A"}
                  </span>
                </div>
              </SheTooltip>
            </div>
          )}
          <SheTooltip
            delayDuration={200}
            text={data.variantName}
            className={cs.productName}
          >
            <span className="she-text">{data.variantName}</span>
          </SheTooltip>
          <div className={cs.productPrice}>
            <SheInput
              className={cs.priceInput}
              value={variantPrice}
              placeholder=""
              maxWidth="100px"
              onBeforeInput={(
                e: React.FormEvent<HTMLInputElement> & {
                  nativeEvent: InputEvent;
                },
              ) => {
                const char = e.nativeEvent.data ?? "";
                if (!/[0-9.,]/.test(char)) {
                  e.preventDefault();
                }
              }}
              onDelay={(value) => {
                setVariantPrice(value);
                onAction("updateStockActionPrice", { data, value });
              }}
            />
            <span className={`${cs.currencyName} she-text`}>
              {data.stockDocumentPrice.currencyName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
