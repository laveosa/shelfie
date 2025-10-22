import React, { JSX } from "react";
import { CheckCheck } from "lucide-react";

import cs from "./PasswordChangeForm.module.scss";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheFormField from "@/components/complex/she-form/components/she-form-field/SheFormField.tsx";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { ReactHookFormMode } from "@/const/enums/ReactHookFormMode.ts";
import PasswordChangeFormScheme from "@/utils/validation/schemes/PasswordChangeFormScheme.ts";
import { IChangePasswordForm } from "@/const/interfaces/forms/IChangePasswordForm.ts";
import {
  PasswordModel,
  PasswordModelDefaultModel,
} from "@/const/models/PasswordModel.ts";

export default function PasswordChangeForm({
  data,
  onSubmit,
}: IChangePasswordForm): JSX.Element {
  // ==================================================================== UTILITIES
  const { form } = useAppForm<PasswordModel>({
    values: data,
    defaultValues: PasswordModelDefaultModel,
    scheme: PasswordChangeFormScheme,
    mode: ReactHookFormMode.CHANGE,
  });

  // ==================================================================== EVENT HANDLERS
  function onSubmitHandler(data: PasswordModel) {
    onSubmit?.(data);
    form.reset({}, { keepErrors: false, keepDirty: false });
    setTimeout(() => form.clearErrors(), 0);
  }

  // ==================================================================== LAYOUT
  return (
    <SheForm<PasswordModel>
      form={form}
      className={cs.changePasswordForm}
      footerClassName={cs.formFooter}
      footerPosition={DirectionEnum.RIGHT}
      hideSecondaryBtn
      primaryBtnTitle="Save Changes"
      primaryBtnProps={{
        icon: CheckCheck,
      }}
      onSubmit={onSubmitHandler}
    >
      <SheFormField
        name="password"
        render={({ field }) => (
          <SheInput
            value={field.value}
            label="Password"
            placeholder="enter your first name..."
            type="password"
            fullWidth
          />
        )}
      />
      <SheFormField
        name="newPassword"
        render={({ field }) => (
          <SheInput
            value={field.value}
            label="New Password"
            placeholder="enter new password..."
            type="password"
            fullWidth
          />
        )}
      />
      <SheFormField
        name="confirmPassword"
        render={({ field }) => (
          <SheInput
            value={field.value}
            label="Confirm Password"
            placeholder="enter new password..."
            type="password"
            fullWidth
          />
        )}
      />
    </SheForm>
  );
}
