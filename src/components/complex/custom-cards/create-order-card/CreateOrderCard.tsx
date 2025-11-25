import { Plus, X } from "lucide-react";
import React from "react";

import cs from "./CreateOrderCard.module.scss";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import { ICreateOrderCard } from "@/const/interfaces/complex-components/custom-cards/ICreateOrderCard.ts";
import { getInitials } from "@/utils/helpers/quick-helper.ts";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { Separator } from "@/components/ui/separator.tsx";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { SelectProductsForOrderGridColumns } from "@/components/complex/grid/custom-grids/select-products-for-order-grid/SelectProductsForOrderGridColumns.tsx";

export default function CreateOrderCard({
  isLoading,
  isGridLoading,
  cartContent,
  onAction,
}: ICreateOrderCard) {
  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();
  // ==================================================================== LAYOUT
  return (
    <div>
      <SheCard
        isLoading={isLoading}
        className={cs.createOrderCard}
        title="Create Order"
        minWidth="500px"
        showCloseButton
        onSecondaryButtonClick={() => onAction("closeCreateOrderCard")}
      >
        <div className={cs.createOrderCardContent}>
          <Separator />
          <div className={cs.customerDetailsContainer}>
            <span className="she-title">
              {translate("SectionTitles.Customer")}
            </span>
            <div className={cs.customerInfoBlock}>
              <div className={cs.customerDetailsItem}>
                <span className="she-text">
                  {translate("CustomerForm.Labels.Name")}
                </span>
                <div className={cs.customerInfoAvatarBlock}>
                  {cartContent?.customer?.thumbnailUrl ? (
                    <img
                      src={cartContent?.customer?.thumbnailUrl}
                      alt={cartContent?.customer?.customerName}
                      className={cs.avatarImage}
                    />
                  ) : (
                    <div className={cs.avatarInitials}>
                      {getInitials(cartContent?.customer?.customerName)}
                    </div>
                  )}
                  <span className={`${cs.customerName} she-text`}>
                    {cartContent?.customer?.customerName}
                  </span>
                </div>
              </div>

              {cartContent?.customer?.email && (
                <div className={cs.customerDetailsItem}>
                  <span className="she-text">
                    {translate("CustomerForm.Labels.Email")}
                  </span>
                  <span className="she-text">
                    {cartContent?.customer?.email}
                  </span>
                </div>
              )}
              {cartContent?.customer?.phone && (
                <div className={cs.customerDetailsItem}>
                  <span className="she-text">
                    {translate("CustomerForm.Labels.PhoneNumber")}
                  </span>
                  <span className="she-text">
                    {cartContent?.customer?.phone}
                  </span>
                </div>
              )}
            </div>
          </div>
          <Separator />
          <div className={cs.productsForOrder}>
            <span className="she-title">Select products for order</span>
            <SheGrid
              isLoading={isGridLoading}
              showHeader={false}
              data={cartContent?.stockActions}
              columns={SelectProductsForOrderGridColumns(onAction)}
            />
            <div className={cs.summaryBlock}>
              <span className="she-title">Order Summary</span>
              <div className={`${cs.summaryBlockItem} she-text`}>
                <span className="she-text">Products Subtotal</span>
                <span className="she-text">{`${cartContent?.sumAmount} ${cartContent?.currency.briefName}`}</span>
              </div>
              <div className={`${cs.summaryBlockItem} she-text`}>
                <span className="she-text">Profit</span>
                <span className="she-text">{`0 ${cartContent?.currency.briefName}`}</span>
              </div>
            </div>
          </div>
          <div className={cs.footerButtonsBlock}>
            <SheButton
              icon={X}
              variant="secondary"
              value="Cancel"
              onClick={() => onAction("closeCreateOrderCard")}
            />
            <SheButton
              icon={Plus}
              variant="info"
              value="Create Order"
              onClick={() => onAction("createNewOrder")}
            />
          </div>
        </div>
      </SheCard>
    </div>
  );
}
