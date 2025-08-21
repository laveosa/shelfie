import React, { JSX, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { User } from "lucide-react";
import TNFLogoIcon from "@/assets/icons/TNF_logo.svg?react";

import useAppForm from "@/utils/hooks/useAppForm.ts";
import { UserModel, UserModelDefault } from "@/const/models/UserModel.ts";
import UserFormScheme from "@/utils/validation/schemes/UserFormScheme.ts";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { IUserForm } from "@/const/interfaces/forms/IUserForm.ts";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import SheFormField from "@/components/complex/she-form/components/she-form-field/SheFormField.tsx";
import { ReactHookFormMode } from "@/const/enums/ReactHookFormMode.ts";

export default function UserForm({
  data,
  genders,
  positions,
  onSubmit,
  onCancel,
}: IUserForm): JSX.Element {
  const form = useAppForm<UserModel>({
    mode: ReactHookFormMode.BLUR,
    resolver: zodResolver(UserFormScheme),
    defaultValues: UserModelDefault,
  });

  useEffect(() => {
    form.reset(data);
  }, [data]);

  // ================================================================ EVENTS

  // ================================================================ PRIVATE

  // ================================================================ RENDER

  function onErrorHandler(model) {
    console.log(model);
  }

  return (
    <div className="flex justify-center">
      <SheForm<UserModel>
        id="USER_FORM"
        form={form}
        defaultValues={UserModelDefault}
        icon={TNFLogoIcon}
        formPosition={DirectionEnum.CENTER}
        title="User Form"
        minWidth="400px"
        view={ComponentViewEnum.CARD}
        onSubmit={onSubmit}
        onError={onErrorHandler}
        onCancel={onCancel}
      >
        <SheFormField<UserModel>
          form={form}
          label="Name"
          name="name"
          render={() => (
            <SheInput
              placeholder="enter user name..."
              showClearBtn
              fullWidth
              minLength={4}
              maxLength={16}
              hideErrorMessage
            />
          )}
        />
        <SheFormField
          form={form}
          label="Email"
          name="email"
          render={() => (
            <SheInput
              placeholder="enter user email..."
              type="email"
              showClearBtn
              fullWidth
            />
          )}
        />
        <SheFormField
          form={form}
          label="Address"
          name="address"
          render={() => (
            <SheInput
              placeholder="enter user address..."
              showClearBtn
              fullWidth
            />
          )}
        />
        <SheFormField<UserModel>
          label="Gender"
          form={form}
          name="gender"
          render={({ field }) => (
            <SheSelect<string>
              selected={field?.value}
              items={genders}
              hideFirstOption
              showClearBtn
              fullWidth
              placeholder="select user gender..."
            />
          )}
        />
        <SheFormField
          form={form}
          label="Position"
          name="position"
          render={({ field }) => (
            <SheSelect
              selected={field?.value}
              items={positions}
              hideFirstOption
              showClearBtn
              fullWidth
              placeholder="select user position..."
              icon={User}
            />
          )}
        />
      </SheForm>
    </div>
  );
}
