import React, { JSX, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Home, User } from "lucide-react";
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
import SheToggle from "@/components/primitive/she-toggle/SheToggle.tsx";
import { SheToggleTypeEnum } from "@/const/enums/SheToggleTypeEnum.ts";
import SheBadgeList from "@/components/primitive/she-badge-list/SheBadgeList.tsx";

export default function UserForm({
  data,
  genders,
  positions,
  badges,
  notDisabledSubmit,
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
        notDisabledSubmit={notDisabledSubmit}
        onSubmit={onSubmit}
        onError={onErrorHandler}
        onCancel={onCancel}
      >
        <SheFormField
          name="tags"
          render={(field) => (
            <SheBadgeList<any>
              label="Tags"
              items={badges}
              required
              showCloseBtn
              showClearBtn
              // elementMinWidth="100px"
              // itemsWrap="nowrap"
              maxWidth="400px"
              // icon={Home}
            />
          )}
        />
        <SheFormField
          name="nikName"
          render={({ field }) => (
            <SheAutocomplete
              label="Nik Name"
              items={positions}
              showClearBtn
              fullWidth
              required
              hideErrorMessage
            />
          )}
        />
        <SheFormField
          name="isAvailable"
          render={({ field }) => (
            <SheToggle
              label="Is Available"
              checked={field.value}
              type={SheToggleTypeEnum.SWITCH}
            />
          )}
        />
        <SheFormField<UserModel>
          name="name"
          render={({ field }) => (
            <SheInput
              label="Name"
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
          name="email"
          render={({ field }) => (
            <SheInput
              label="Email"
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
          name="address"
          render={({ field }) => (
            <SheInput
              label="Address"
              value={field.value}
              placeholder="enter user address..."
              showClearBtn
              fullWidth
            />
          )}
        />
        <SheFormField<UserModel>
          name="gender"
          render={({ field }) => (
            <SheSelect<string>
              label="Gender"
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
          name="position"
          render={({ field }) => (
            <SheSelect
              label="Position"
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
