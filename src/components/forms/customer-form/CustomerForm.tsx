import React, { useEffect } from "react";

import useAppForm from "@/utils/hooks/useAppForm.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import { FormField } from "@/components/ui/form.tsx";
import SheFormItem from "@/components/complex/she-form/components/she-form-item/SheFormItem.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import { Plus, Save } from "lucide-react";
import { CustomerRequestModel, CustomerRequestModelDefault } from "@/const/models/CustomerRequestModel";
import CustomerFormScheme from "@/utils/validation/schemes/CustomerFormScheme";
import cs from "./CustomerForm.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton";

interface ICustomerForm {
  data: CustomerRequestModel;
  isCreate: boolean;
  onSubmit: (data: CustomerRequestModel) => void;
  onCancel: () => void;
}

export default function CustomerForm({
  data,
  isCreate,
  onSubmit,
  onCancel,
}: ICustomerForm): React.ReactNode {

  const form = useAppForm<CustomerRequestModel>({
    mode: "onBlur",
    resolver: zodResolver(CustomerFormScheme),
    defaultValues: CustomerRequestModelDefault,
  });


  useEffect(() => {
    form.reset(data);
  }, [data]);


  // ================================================================ RENDER



  function onErrorHandler(model) {
    console.log(model);
  }

  return (
    <SheForm form={form} onSubmit={onSubmit}
        className={cs.customerForm}
        onError={onErrorHandler}
        onCancel={onCancel}
        view={ComponentViewEnum.STANDARD}
        hidePrimary
        hideSecondary
    >
        <FormField
            control={form.control}
            name="firstName"
            render={({ field }): React.ReactElement => (
            <SheFormItem label="First Name">
                <SheInput fullWidth {...field} placeholder="Enter first name..." />
            </SheFormItem>
            )}
        />

        <FormField
            control={form.control}
            name="lastName"
            render={({ field }): React.ReactElement => (
            <SheFormItem label="Last Name">
                <SheInput fullWidth {...field} placeholder="Enter last name..." />
            </SheFormItem>
            )}
        />
        <FormField
            control={form.control}
            name="email"
            render={({ field }): React.ReactElement => (
            <SheFormItem label="Email">
                <SheInput fullWidth {...field} placeholder="Enter email..." />
            </SheFormItem>
            )}
        />
        <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }): React.ReactElement => (
            <SheFormItem label="Phone Number">
                <SheInput fullWidth {...field} placeholder="Enter phone number..." />
            </SheFormItem>
            )}
        />
        <div
            className={cs.customerFormFooter}
            style={{ justifyContent: "space-between", }}
        >
            <SheButton
                variant="secondary"
                onClick={() => {onCancel()}}
                value="Cancel"
            />
            
            <SheButton
                variant="default"
                icon={isCreate ? Plus : Save}
                onClick={() => {form.handleSubmit(onSubmit)}}
                value={isCreate ? "Add Customer" : "Save Changes"}
            />
        </div>
    </SheForm>
  );
}
