import { Replace, Search, ShoppingCart, Trash2 } from "lucide-react";
import React from "react";

import cs from "@/components/complex/grid/custom-grids/cart-content-grid/CartContentGridColumnActionsCell.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { formatDate } from "@/utils/helpers/quick-helper.ts";
import CartContentGridColumnActions from "@/components/complex/grid/custom-grids/cart-content-grid/CartContentGridColumnActions.tsx";

export function CartContentGridColumnActionsCell({ data, onAction }) {
  const traitOptions = data.traitOptions || [];
  const colorOptions = traitOptions.filter(
    (option) => option.traitTypeId === 2 && option.optionColor,
  );
  const sizeOptions = traitOptions.filter(
    (option) => option.traitTypeId === 1 && option.optionName,
  );
  return (
    <div className={cs.actionsCell}>
      <div className={cs.buttonBlock}>
        <SheButton
          icon={Replace}
          value="Replace"
          variant="secondary"
          onClick={() => onAction("openReplaceVariantCard", data)}
        />
        <SheButton
          icon={Search}
          value="Find"
          variant="secondary"
          onClick={() => onAction("openCartsWithSpecificProductCard", data)}
        />
        <SheButton
          icon={Trash2}
          value="Remove"
          variant="secondary"
          onClick={() => onAction("deleteStockAction", data)}
        />
        <CartContentGridColumnActions onAction={onAction} row={data} />
      </div>
      <div className={cs.productTraits}>
        {colorOptions?.map((colorOpt, index) => (
          <div className={cs.optionContainer}>
            <span className="she-text">{colorOpt.traitName}</span>
            <div
              className={cs.colorOptions}
              key={`color-${index}`}
              style={{
                background: colorOpt.optionColor,
              }}
            />
          </div>
        ))}
        {sizeOptions?.map((sizeOpt, index) => (
          <div className={cs.optionContainer}>
            <span className="she-text">{sizeOpt.traitName}</span>
            <span
              key={`size-${index}`}
              className={`${cs.sizeOptions} she-text`}
            >
              {sizeOpt.optionName}
            </span>
          </div>
        ))}
      </div>
      <div className={cs.variantInfoBlock}>
        {data.reservedUnitsAmount > 0 && (
          <div className={cs.reservationInfoBlock}>
            <span className="she-subtext">{`Item in high demand (${data.reservedUnitsAmount} in reserve)`}</span>
          </div>
        )}
        <div className={cs.expirationDateBlock}>
          <SheIcon
            icon={ShoppingCart}
            color="#64748b"
            maxWidth="10px"
            maxHeight="10px"
          />
          <span className="she-subtext">
            {formatDate(data?.addedToCart, "datetime")}
          </span>
        </div>
      </div>
    </div>
  );
}
