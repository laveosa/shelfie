import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import useAppForm from "@/utils/hooks/useAppForm.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import { Plus, Save } from "lucide-react";
import {
  CustomerRequestModel,
  CustomerRequestModelDefault,
} from "@/const/models/CustomerRequestModel";
import CustomerFormScheme from "@/utils/validation/schemes/CustomerFormScheme";
import cs from "./CustomerForm.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton";
import SheFormField from "@/components/complex/she-form/components/she-form-field/SheFormField.tsx";

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
  const { t } = useTranslation();
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
    <SheForm
      form={form}
      onSubmit={onSubmit}
      className={cs.customerForm}
      onError={onErrorHandler}
      onCancel={onCancel}
      view={ComponentViewEnum.STANDARD}
      hideFooter
    >
      <SheFormField
        name="firstName"
        render={({ field }) => (
          <SheInput
            label={t("CustomerForm.Labels.FirstName")}
            value={field.value}
            fullWidth
            placeholder={t("CustomerForm.Placeholders.FirstName")}
          />
        )}
      />

      <SheFormField
        name="lastName"
        render={({ field }) => (
          <SheInput
            label={t("CustomerForm.Labels.LastName")}
            value={field.value}
            fullWidth
            placeholder={t("CustomerForm.Placeholders.LastName")}
          />
        )}
      />
      <SheFormField
        name="email"
        render={({ field }) => (
          <SheInput
            label={t("CustomerForm.Labels.Email")}
            value={field.value}
            fullWidth
            placeholder={t("CustomerForm.Placeholders.Email")}
          />
        )}
      />
      <SheFormField
        name="phoneNumber"
        render={({ field }) => (
          <SheInput
            label={t("CustomerForm.Labels.PhoneNumber")}
            value={field.value}
            fullWidth
            placeholder={t("CustomerForm.Placeholders.PhoneNumber")}
          />
        )}
      />
      <div
        className={cs.customerFormFooter}
        style={{ justifyContent: "space-between" }}
      >
        <SheButton
          value={t("CommonButtons.Cancel")}
          variant="secondary"
          onClick={() => {
            onCancel();
          }}
        />
        <SheButton
          value={isCreate ? t("CustomerActions.CreateCustomer") : t("CommonButtons.Save")}
          variant="default"
          icon={isCreate ? Plus : Save}
          onClick={() => {
            form.handleSubmit(onSubmit);
          }}
        />
      </div>
    </SheForm>
  );
}
