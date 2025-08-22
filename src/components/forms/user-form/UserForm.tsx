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
import SheAutocomplete from "@/components/primitive/she-autocomplete/SheAutocomplete.tsx";

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
        <SheFormField
          label="Nik Name"
          name="nikName"
          render={({ field }) => (
            <SheAutocomplete
              items={positions}
              showClearBtn
              fullWidth
              required
              hideErrorMessage
            />
          )}
        />
        <SheFormField<UserModel>
          label="Name"
          name="name"
          render={({ field }) => (
            <SheInput
              value={field.value}
              placeholder="enter user name..."
              showClearBtn
              fullWidth
              minLength={4}
              maxLength={16}
              required
              hideErrorMessage
            />
          )}
        />
        <SheFormField
          label="Email"
          name="email"
          render={({ field }) => (
            <SheInput
              value={field.value}
              placeholder="enter user email..."
              type="email"
              showClearBtn
              fullWidth
              required
              hideErrorMessage
            />
          )}
        />
        <SheFormField
          label="Address"
          name="address"
          render={({ field }) => (
            <SheInput
              value={field.value}
              placeholder="enter user address..."
              showClearBtn
              fullWidth
            />
          )}
        />
        <SheFormField<UserModel>
          label="Gender"
          name="gender"
          render={({ field }) => (
            <SheSelect<string>
              selected={field?.value}
              items={genders}
              hideFirstOption
              showClearBtn
              fullWidth
              required
              placeholder="select user gender..."
            />
          )}
        />
        <SheFormField
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
