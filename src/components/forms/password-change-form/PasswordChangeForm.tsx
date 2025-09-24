import React, { JSX, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCheck } from "lucide-react";

import {
  PasswordModel,
  PasswordModelDefaultModel,
} from "@/const/models/PasswordModel.ts";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import SheFormField from "@/components/complex/she-form/components/she-form-field/SheFormField.tsx";
import { ReactHookFormMode } from "@/const/enums/ReactHookFormMode.ts";
import { ContactInformationModelDefaultModel } from "@/const/models/ContactInformationModel.ts";
import cs from "./PasswordChangeForm.module.scss";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import passwordChangeFormScheme from "@/utils/validation/schemes/PasswordChangeFormScheme.ts";
import { IChangePasswordForm } from "@/const/interfaces/forms/IChangePasswordForm.ts";

export default function PasswordChangeForm({
  data,
  onSubmit,
  onCancel,
}: IChangePasswordForm): JSX.Element {
  const form = useAppForm<PasswordModel>({
    mode: ReactHookFormMode.CHANGE,
    resolver: zodResolver(passwordChangeFormScheme),
    defaultValues: PasswordModelDefaultModel,
  });

  useEffect(() => {
    form.reset(data);
  }, [data]);

  function onSubmitHandler(data: PasswordModel) {
    onSubmit(data);
    form.reset({}, { keepErrors: false, keepDirty: false });
    setTimeout(() => form.clearErrors(), 0);
  }

  function onErrorHandler(model) {
    console.log(model);
  }

  return (
    <SheForm<PasswordModel>
      className={cs.changePasswordForm}
      form={form}
      defaultValues={ContactInformationModelDefaultModel}
      view={ComponentViewEnum.STANDARD}
      footerPosition={DirectionEnum.RIGHT}
      primaryBtnTitle="Save Changes"
      primaryBtnProps={{
        icon: CheckCheck,
      }}
      hideSecondaryBtn
      footerClassName={cs.formFooter}
      onSubmit={(data) => onSubmitHandler(data)}
      onError={onErrorHandler}
      onCancel={onCancel}
    >
      <SheFormField
        name="password"
        render={({ field }) => (
          <SheInput
            label="Password"
            value={field.value}
            type="password"
            placeholder="enter your first name..."
            fullWidth
          />
        )}
      />
      <SheFormField
        name="newPassword"
        render={({ field }) => (
          <SheInput
            label="New Password"
            value={field.value}
            type="password"
            placeholder="enter new password..."
            fullWidth
          />
        )}
      />
      <SheFormField
        name="confirmPassword"
        render={({ field }) => (
          <SheInput
            label="Confirm Password"
            className={cs.phoneNumber}
            value={field.value}
            type="password"
            placeholder="enter new password..."
            fullWidth
          />
        )}
      />
    </SheForm>
  );
}
