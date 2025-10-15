import React from "react";

import { Plus, Save } from "lucide-react";

import cs from "./CustomerForm.module.scss";
import SheFormField from "@/components/complex/she-form/components/she-form-field/SheFormField.tsx";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import CustomerFormScheme from "@/utils/validation/schemes/CustomerFormScheme";
import { ICustomerForm } from "@/const/interfaces/forms/ICustomerForm.ts";
import {
  CustomerRequestModel,
  CustomerRequestModelDefault,
} from "@/const/models/CustomerRequestModel";

export default function CustomerForm({
  data,
  isCreate,
  onSubmit,
  onCancel,
}: ICustomerForm): React.ReactNode {
  const { form } = useAppForm<CustomerRequestModel>({
    values: data,
    defaultValues: CustomerRequestModelDefault,
    scheme: CustomerFormScheme,
  });

  // ---------------------------------- REMOVE THIS LOGIC IF ALL WORK FINE
  /*useEffect(() => {
    if (data) {
      form.reset({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        phoneNumber: data.phoneNumber || "",
      });
    }
  }, [data]);*/

  // ================================================================ LAYOUT
  return (
    <SheForm<CustomerRequestModel>
      form={form}
      className={cs.customerForm}
      footerPosition={DirectionEnum.SPACE}
      primaryBtnProps={{
        value: isCreate ? "Create Customer" : "Save",
        valueTransKey: isCreate
          ? "CustomerActions.CreateCustomer"
          : "CommonButtons.Save",
        icon: isCreate ? Plus : Save,
      }}
      onCancel={onCancel}
      onSubmit={onSubmit}
    >
      <SheFormField
        name="firstName"
        render={({ field }) => (
          <SheInput
            value={field.value}
            label="First Name"
            labelTransKey="CustomerForm.Labels.FirstName"
            placeholder="Enter first name..."
            placeholderTransKey="CustomerForm.Placeholders.FirstName"
            fullWidth
          />
        )}
      />
      <SheFormField
        name="lastName"
        render={({ field }) => (
          <SheInput
            value={field.value}
            label="Last Name"
            labelTransKey="CustomerForm.Labels.LastName"
            placeholder="Enter last name..."
            placeholderTransKey="CustomerForm.Placeholders.LastName"
            fullWidth
          />
        )}
      />
      <SheFormField
        name="email"
        render={({ field }) => (
          <SheInput
            value={field.value}
            label="Email"
            labelTransKey="CustomerForm.Labels.Email"
            placeholder="Enter email..."
            placeholderTransKey="CustomerForm.Placeholders.Email"
            fullWidth
          />
        )}
      />
      <SheFormField
        name="phoneNumber"
        render={({ field }) => (
          <SheInput
            value={field.value}
            label="Phone Number"
            labelTransKey="CustomerForm.Labels.PhoneNumber"
            placeholder="Enter phone number..."
            placeholderTransKey="CustomerForm.Placeholders.PhoneNumber"
            fullWidth
          />
        )}
      />
    </SheForm>
  );
}
