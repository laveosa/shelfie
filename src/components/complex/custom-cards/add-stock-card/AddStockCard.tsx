import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { ImageIcon, Link2, Plus, RefreshCcw } from "lucide-react";
import React from "react";

import { FormField } from "@/components/ui/form.tsx";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./AddStockCard.module.scss";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { IAddStockCard } from "@/const/interfaces/complex-components/custom-cards/IAddStockCard.ts";
import { SheForm } from "@/components/forms/she-form/SheForm.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { formatDate } from "@/utils/helpers/quick-helper.ts";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { CurrencyModel } from "@/const/models/CurrencyModel.ts";
import SheFormItem from "@/components/complex/she-form/components/she-form-item/SheFormItem.tsx";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";

export default function AddStockCard({
  isLoading,
  variant,
  onAction,
  taxTypes,
  purchase,
  currencyTypes,
  ...props
}: IAddStockCard) {
  const { t } = useTranslation();
  const form = useForm({
    defaultValues: {
      unitAmount: null,
      priceModel: {
        price: null,
        taxTypeId: null,
        currencyId: null,
      },
      purchaseId: null,
    },
  });

  function onSubmit(data) {
    const formattedData = {
      priceModel: {
        variantId: variant.variantId,
        nettoPrice: Number(data.priceModel.price) || 0,
        taxTypeId: Number(data.priceModel.taxTypeId) || 0,
        currencyId: Number(data.priceModel.currencyId) || 0,
        unitsAmount: Number(data.unitAmount) || 0,
      },
      purchaseId: Number(purchase.purchaseId),
    };
    onAction("increaseStockAmount", formattedData);
  }

  function convertCurrencyToSelectItems(
    data: CurrencyModel[],
  ): ISheSelectItem<CurrencyModel>[] {
    return data?.map(
      (item: CurrencyModel): ISheSelectItem<any> => ({
        value: item.id,
        text: item.name,
      }),
    );
  }

  function convertTaxesToSelectItems(
    data: TaxTypeModel[],
  ): ISheSelectItem<any>[] {
    return data?.map(
      (item): ISheSelectItem<any> => ({
        value: item.id,
        text: item.name,
      }),
    );
  }

  return (
    <SheProductCard
      loading={isLoading}
      title={`${t("StockActions.AddToStock")} ${variant?.variantName} ${t("SectionTitles.Product")}`}
      onPrimaryButtonClick={form.handleSubmit(onSubmit)}
      onSecondaryButtonClick={() => onAction("closeAddStockCard")}
      showCloseButton
      className={cs.addStockCard}
      {...props}
    >
      <div className={cs.addStockCardContent}>
        <SheForm form={form as any} onSubmit={onSubmit}>
          <div className={cs.addStockConfigurationForm}>
            <div>
              <span className="she-title">
                {t("PurchaseForm.Labels.PurchasePrice")}
              </span>
            </div>
            <div className={cs.purchasePriceFormRow}>
              <div
                className={`${cs.purchaseFormItem} ${cs.purchaseFormItemPrice}`}
              >
                <SheForm.Field
                  label={t("PurchaseForm.Labels.PurchasePrice")}
                  name="priceModel.price"
                >
                  <SheInput
                    type="number"
                    placeholder="enter price netto..."
                    fullWidth
                    onDelay={() => form.handleSubmit(onSubmit)}
                  />
                </SheForm.Field>
              </div>
              <div className={cs.formRowItem}>
                <FormField
                  control={form.control}
                  name="priceModel.currencyId"
                  render={({ field }) => (
                    <SheFormItem
                      className={`${cs.purchaseFormItem} ${cs.purchaseFormItemCurrency}`}
                      label="Currency"
                    >
                      <SheSelect
                        selected={field.value as any}
                        items={convertCurrencyToSelectItems(currencyTypes)}
                        placeholder="select vat..."
                        hideFirstOption
                        minWidth="100px"
                        onSelect={(value) => {
                          field.onChange(value);
                          void form.trigger("priceModel.currencyId");
                        }}
                      />
                    </SheFormItem>
                  )}
                />
              </div>
              <div className={cs.formRowItem}>
                <FormField
                  control={form.control}
                  name="priceModel.taxTypeId"
                  render={({ field }) => (
                    <SheFormItem
                      className={`${cs.purchaseFormItem} ${cs.purchaseFormItemVat}`}
                      label="VAT"
                    >
                      <SheSelect
                        selected={field.value}
                        items={convertTaxesToSelectItems(taxTypes)}
                        placeholder="select tax..."
                        hideFirstOption
                        minWidth="100px"
                        onSelect={(value) => {
                          field.onChange(value);
                          void form.trigger("priceModel.taxTypeId");
                        }}
                      />
                    </SheFormItem>
                  )}
                />
              </div>
            </div>
            <SheForm.Field name="unitAmount">
              <SheInput
                label={t("PurchaseForm.Labels.Units")}
                placeholder="enter unit amount..."
                type="number"
                fullWidth
                onDelay={() => {
                  form.handleSubmit(onSubmit);
                }}
              />
            </SheForm.Field>
          </div>
        </SheForm>
        <Separator />
        {purchase ? (
          <div className={cs.connectedPurchase}>
            <div className={cs.connectedPurchaseInfo}>
              <div className={cs.connectedPurchaseHeader}>
                <div className={cs.connectedPurchaseHeaderTitle}>
                  <span className="she-title">Connected Purchase</span>
                  <span className="she-subtext">
                    If this is not the right purchase :{" "}
                  </span>
                </div>
                <SheButton
                  icon={RefreshCcw}
                  variant="secondary"
                  value={"Replace Purchase"}
                  onClick={() => onAction("openSelectPurchaseCard")}
                />
              </div>
              <div className={cs.connectedPurchaseSupplier}>
                <div className={cs.supplierInfo}>
                  {purchase.supplier?.thumbnailUrl ? (
                    <div className={cs.supplierInfoImageWrapper}>
                      <img
                        src={purchase.supplier?.thumbnailUrl}
                        alt={purchase.supplier?.supplierName || "Supplier"}
                        className={cs.supplierInfoImage}
                      />
                    </div>
                  ) : (
                    <div className={cs.supplierInfoIcon}>
                      <SheIcon icon={ImageIcon} maxWidth="30px" />
                    </div>
                  )}
                  <div className={cs.supplierInfoDetails}>
                    <span className={cs.supplierInfoDetailsName}>
                      {purchase.supplier?.supplierName}
                    </span>
                    <span className="she-text">
                      {formatDate(purchase.date, "date")}
                    </span>
                  </div>
                </div>
                <SheButton
                  icon={Link2}
                  variant="ghost"
                  value="Purchase Details"
                  txtColor="#007AFF"
                />
              </div>
            </div>
            <div className={cs.connectedPurchaseProductsSummary}>
              <span className={cs.connectedPurchaseProductsSummaryTitle}>
                Products in purchase summary
              </span>
              <Separator />
              <div className={cs.connectedPurchaseProductsSummaryHeaders}>
                <span className={cs.connectedPurchaseProductsSummaryHeader}>
                  Units
                </span>
                <span className={cs.connectedPurchaseProductsSummaryHeader}>
                  Expense
                </span>
                <span className={cs.connectedPurchaseProductsSummaryHeader}>
                  Projected value
                </span>
              </div>
              <Separator />
              <div className={cs.connectedPurchaseProductsSummaryInfo}>
                <div className={cs.unitsColumn}>
                  <span>{purchase.unitsAmount}</span>
                </div>
                <div className={cs.expenseColumn}>
                  <span>{`${purchase.expense} ${purchase.currencyBrief}`}</span>
                </div>
                <div className={cs.valueColumn}>
                  <span>{`${purchase.orderValueAmount} ${purchase.currencyBrief}`}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={cs.purchaseDetails}>
            <span className="she-title">Purchase Details</span>
            <span className="she-text">
              If you want to be able to track this stock change in the purchase
              section, please select the purchase this change is connected to.
            </span>
            <div className={cs.purchaseDetailsButtonBlock}>
              <SheButton
                icon={Plus}
                variant="secondary"
                value="Select Purchase"
                onClick={() => onAction("openSelectPurchaseCard")}
              />
              <span className="she-text">or</span>
              <SheButton
                icon={Plus}
                variant="secondary"
                value="Report Purchase"
                onClick={() => onAction("openSupplierCard")}
              />
            </div>
          </div>
        )}
        <Separator />
        <div className={cs.footerButtons}>
          <SheButton
            variant="secondary"
            value="Cancel"
            onClick={() => onAction("closeAddStockCard")}
          />
          <SheButton
            icon={Plus}
            value="Add to Stock"
            onClick={() => onSubmit(form.getValues())}
          />
        </div>
      </div>
    </SheProductCard>
  );
}
