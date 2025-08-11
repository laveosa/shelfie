import { zodResolver } from "@hookform/resolvers/zod";
import { Equal, Trash2, X } from "lucide-react";
import React, { useEffect } from "react";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import { FormField } from "@/components/ui/form.tsx";
import SheFormItem
  from "@/components/complex/she-form/components/she-form-item/SheFormItem.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import cs from "./ProductsInOrderForm.module.scss";
import ProductsInOrderFormScheme
  from "@/utils/validation/schemes/ProductsInOrderFormScheme.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import {
  IProductsInOrderForm
} from "@/const/interfaces/forms/IProductsInOrderForm.ts";

interface ProductsInOrderFormData {
  priceBrutto?: number;
  quantity?: number;
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
    defaultValues: { priceBrutto: 0, quantity: 0, total: 0 },
  });
  const [total, setTotal] = React.useState(0);

  useEffect(() => {
    const subscription = form.watch((values) => {
      setTotal((values.priceBrutto ?? 0) * (values.quantity ?? 0));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  function handleFormSubmit(formData: ProductsInOrderFormData) {
    onSubmit({
      priceBrutto: Number(formData.priceBrutto),
      quantity: Number(formData.quantity),
    } as T);
  }

  useEffect(() => {
    form.reset({ priceBrutto: 0, quantity: 0 });
  }, [data]);

  return (
    <div className={`${cs.productsInOrderForm} ${className}`}>
      <SheForm<T>
        form={form}
        defaultValues={{ priceBrutto: 0, quantity: 0 }}
        formPosition={DirectionEnum.CENTER}
        view={ComponentViewEnum.STANDARD}
        fullWidth
        hidePrimary
        hideSecondary
        onSubmit={() => handleFormSubmit}
      >
        <div className={cs.formItems}>
          <div className={cs.formItem}>
            <span>Price Brutto</span>
            <FormField
              control={form.control}
              name="priceBrutto"
              render={({ field }): React.ReactElement => (
                <SheFormItem className={cs.inputFormItem}>
                  <SheInput
                    {...field}
                    type="number"
                    maxWidth="100px"
                    onDelay={(val) => {
                      field.onChange(val);
                      onSubmit(form.getValues() as T);
                    }}
                  />
                </SheFormItem>
              )}
            />
          </div>
          <SheIcon className={cs.formIcon} icon={X} maxWidth="30px" />
          <div className={cs.formItem}>
            <span>Quantity</span>
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }): React.ReactElement => (
                <SheFormItem className={cs.inputFormItem}>
                  <SheInput
                    {...field}
                    type="number"
                    maxWidth="75px"
                    onDelay={(val) => {
                      field.onChange(val);
                      onSubmit(form.getValues() as T);
                    }}
                  />
                </SheFormItem>
              )}
            />
          </div>
          <SheIcon className={cs.formIcon} icon={Equal} maxWidth="30px" />
          <div className={`${cs.formItem} ${cs.formItemTotal}`}>
            <span>Total</span>
            <span className={`${cs.totalValue} she-title`}>{total}</span>
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
