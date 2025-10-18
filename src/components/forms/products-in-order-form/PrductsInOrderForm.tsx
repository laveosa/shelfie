import { zodResolver } from "@hookform/resolvers/zod";
import { Equal, Trash2, X } from "lucide-react";
import React, { useEffect } from "react";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import cs from "./ProductsInOrderForm.module.scss";
import ProductsInOrderFormScheme from "@/utils/validation/schemes/ProductsInOrderFormScheme.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { IProductsInOrderForm } from "@/const/interfaces/forms/IProductsInOrderForm.ts";
import SheFormField from "@/components/complex/she-form/components/she-form-field/SheFormField.tsx";

interface ProductsInOrderFormData {
  stockDocumentPrice: {
    brutto?: number;
  };
  unitsAmount?: number;
}

export default function ProductsInOrderForm<T>({
  className,
  data,
  onSubmit,
  onDelete,
}: IProductsInOrderForm<T>) {
  const form = useAppForm<ProductsInOrderFormData>({
    mode: "onSubmit",
    resolver: zodResolver(ProductsInOrderFormScheme),
    defaultValues: {
      stockDocumentPrice: { brutto: 0 },
      unitsAmount: 0,
      total: 0,
    },
  });
  const [total, setTotal] = React.useState(0);

  function handleFormSubmit(formData: ProductsInOrderFormData) {
    onSubmit({
      brutto: Number(formData.stockDocumentPrice.brutto),
      unitsAmount: Number(formData.unitsAmount),
    } as T);
  }

  useEffect(() => {
    const subscription = form.watch((value) => {
      const brutto = Number(value.stockDocumentPrice?.brutto) || 0;
      const units = Number(value.unitsAmount) || 0;
      setTotal(brutto * units);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // useEffect(() => {
  //   form.reset({ stockDocumentPrice: { brutto: 0 }, unitsAmount: 0 });
  // }, [data]);

  useEffect(() => {
    form.reset(data);
  }, [data]);

  return (
    <div className={`${cs.productsInOrderForm} ${className}`}>
      <SheForm
        form={form}
        defaultValues={{ stockDocumentPrice: { brutto: 0 }, unitsAmount: 0 }}
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
                  maxWidth="100px"
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
                  maxWidth="75px"
                  onDelay={() => {
                    handleFormSubmit(form.getValues() as any);
                  }}
                />
              )}
            />
          </div>
          <SheIcon className={cs.formIcon} icon={Equal} maxWidth="30px" />
          <div className={`${cs.formItem} ${cs.formItemTotal}`}>
            <span>Total</span>
            <span
              className={`${cs.totalValue} she-title`}
            >{`${total} ${data?.stockDocumentPrice?.currencyName ?? ""}`}</span>
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
