import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./AddStockCard.module.scss";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { MoreHorizontal } from "lucide-react";
import { Switch } from "@/components/ui/switch.tsx";
import image from "@/assets/images/AuthLogo.png";
import { IAddStockCard } from "@/const/interfaces/complex-components/custom-cards/IAddStockCard.ts";

export default function AddStockCard({
  variant,
  onAction,
  onSecondaryButtonClick,
  ...props
}: IAddStockCard) {
  return (
    <SheProductCard
      title={`Add ${variant?.variantName} Stock`}
      view="card"
      showPrimaryButton={true}
      primaryButtonTitle="Add to Stock"
      showSecondaryButton={true}
      secondaryButtonTitle="Cancel"
      onSecondaryButtonClick={onSecondaryButtonClick}
      showCloseButton
      width="370px"
      className={cs.addStockCard}
      {...props}
    >
      <div className={cs.addStockCardContent}>
        <div className={cs.stockAmount}>
          <SheInput
            fullWidth
            label="Units"
            value={variant?.stockAmount ?? "0"}
          />
        </div>
        <div className={cs.purchasePriceBlock}>
          <span className="she-title">Purchase Price</span>
          <div className={cs.salePriceBlockInput}>
            <SheInput
              fullWidth
              label="Sale price"
              value={variant?.salePrice ?? "0"}
            />
            <SheInput fullWidth label="VAT" />
            <SheInput fullWidth label="Netto/Brutto" />
          </div>
          <SheInput fullWidth label="Currency" />
        </div>
        <div className={cs.purchaseDetailsBlock}>
          <div className={cs.purchaseDetailsTitle}>
            <span className="she-title">Purchase Details</span>
          </div>
          <div className={cs.purchaseDetailsInputRow}>
            <SheInput fullWidth label="Invoice number (optional)" />
          </div>
          <div className={cs.purchaseDetailsInputRow}>
            <SheInput
              fullWidth
              label="Set date when purchase took place
                    (for valid exchange rate)"
            />
          </div>
          <div className={cs.supplierInformationBlock}>
            <SheInput
              fullWidth
              label="Set date when purchase took place
                    (for valid exchange rate)"
            />
            <div className={cs.supplierInformationBlock}>
              <span className="she-text">
                Select which supplier provided the products
              </span>
              <div className={cs.supplierInformation}>
                <div>
                  <img src={image} alt="" />
                </div>
                <span className="she-subtext">
                  Babylon Srl VIA DEI NOTAI 135-137 BL, Centergross, 30, Italy
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SheButton
                      variant="secondary"
                      className="flex h-8 p-0 data-[state=open]:bg-muted"
                    >
                      <MoreHorizontal />
                    </SheButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-[160px]">
                    <DropdownMenuItem onClick={() => onAction("deleteTrait")}>
                      <span className="she-text">Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className={cs.createPurchaseToggleBlock}>
                <div className={cs.createPurchaseToggle}>
                  <Switch />
                </div>
                <div className={cs.createPurchaseToggleDesc}>
                  <span className="she-subtext">Create Purchase</span>
                  <span className="she-subtext">
                    (Or connect to the existing purchase if invoice number is
                    already in the system)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SheProductCard>
  );
}
