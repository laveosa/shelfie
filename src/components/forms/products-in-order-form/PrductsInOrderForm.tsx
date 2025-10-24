import React from "react";

import { Equal, Trash2, X } from "lucide-react";

import cs from "./ProductsInOrderForm.module.scss";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import SheFormField
  from "@/components/complex/she-form/components/she-form-field/SheFormField.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import ProductsInOrderFormScheme
  from "@/utils/validation/schemes/ProductsInOrderFormScheme.ts";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import { ReactHookFormMode } from "@/const/enums/ReactHookFormMode.ts";
import {
  IProductsInOrderForm
} from "@/const/interfaces/forms/IProductsInOrderForm.ts";
import {
  ProductsInOrderFormDataModel
} from "@/const/models/ProductsInOrderFormDataModel.ts";

export default function ProductsInOrderForm<T>({
  className,
  data,
  onSubmit,
  onDelete,
}: IProductsInOrderForm<T>) {
  const { form } = useAppForm<any>({
    values: setValues(data),
    defaultValues: {
      stockDocumentPrice: { brutto: 0 },
      unitsAmount: 0,
      total: 0,
    },
    scheme: ProductsInOrderFormScheme,
    mode: ReactHookFormMode.CHANGE,
  });

  function handleFormSubmit(formData: ProductsInOrderFormDataModel) {
    onSubmit({
      brutto: Number(formData.stockDocumentPrice.brutto),
      unitsAmount: Number(formData.unitsAmount),
    } as T);
  }

  function setValues(
    model: ProductsInOrderFormDataModel,
  ): ProductsInOrderFormDataModel {
    const brutto = Number(model.stockDocumentPrice?.brutto) || 0;
    const units = Number(model.unitsAmount) || 0;
    const total = brutto * units;
    return {
      stockDocumentPrice: { brutto },
      unitsAmount: units,
      total: total,
    };
  }

  return (
    <div className={`${cs.productsInOrderForm} ${className}`}>
      <SheForm
        form={form}
        formPosition={DirectionEnum.CENTER}
        view={ComponentViewEnum.STANDARD}
        fullWidth
        hidePrimaryBtn
        hideSecondaryBtn
        onSubmit={handleFormSubmit}
      >
        <div className={cs.formItems}>
          <div className={cs.formItem}>
            <span>Price Brutto</span>
            <SheFormField
              name="stockDocumentPrice.brutto"
              className={cs.inputFormItem}
              render={({ field }) => (
                <SheInput
                  value={field.value}
                  type="number"
                  maxWidth="90px"
                  minWidth="90px"
                  onDelay={() => {
                    handleFormSubmit(form.getValues() as any);
                  }}
                />
              )}
            />
          </div>
          <SheIcon className={cs.formIcon} icon={X} maxWidth="30px" />
          <div className={cs.formItem}>
            <span>Quantity</span>
            <SheFormField
              name="unitsAmount"
              className={cs.inputFormItem}
              render={({ field }): React.ReactElement => (
                <SheInput
                  value={field.value}
                  type="number"
                  maxWidth="70px"
                  minWidth="70"
                  onDelay={() => {
                    handleFormSubmit(form.getValues() as any);
                  }}
                />
              )}
            />
          </div>
          <SheIcon className={cs.formIcon} icon={Equal} maxWidth="30px" />
          <div className={cs.formItem}>
            <span>Total</span>
            <SheFormField
              name="total"
              render={({ field }): React.ReactElement => (
                <span
                  className={`${cs.totalValue} she-title`}
                >{`${field.value.toFixed(2)} ${data?.stockDocumentPrice?.currencyName ?? ""}`}</span>
              )}
            />
          </div>
          <div className={cs.formItem}>
            <span>Remove</span>
            <SheButton
              icon={Trash2}
              variant="secondary"
              type="button"
              onClick={() => onDelete()}
            />
          </div>
        </div>
      </SheForm>
    </div>
  );
}
