import React, { useEffect } from "react";

import useAppForm from "@/utils/hooks/useAppForm.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserModel, UserModelDefault } from "@/const/models/UserModel.ts";
import UserFormScheme from "@/utils/validation/schemes/UserFormScheme.ts";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import { FormField } from "@/components/ui/form.tsx";
import SheFormItem from "@/components/complex/she-form/components/she-form-item/SheFormItem.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { IUserForm } from "@/const/interfaces/forms/IUserForm.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelect.ts";

import { User } from "lucide-react";
import TNFLogoIcon from "@/assets/icons/TNF_logo.svg?react";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";

export default function UserForm<T>({
  data,
  genders,
  positions,
  onSubmit,
  onCancel,
}: IUserForm<T>): React.ReactNode {
  const form = useAppForm<UserModel>({
    mode: "onBlur",
    resolver: zodResolver(UserFormScheme),
    defaultValues: UserModelDefault,
  });

  useEffect(() => {
    form.reset(data);
  }, [data]);

  // ================================================================ EVENTS

  // ================================================================ PRIVATE

  function convertGendersToSelectItems(data: string[]): ISheSelectItem[] {
    return data?.map(
      (item: string): ISheSelectItem => ({
        value: item,
        text: item,
      }),
    );
  }

  function convertPositionsToSelectItems(data: any[]): ISheSelectItem[] {
    return data?.map(
      (item): ISheSelectItem => ({
        value: item.id,
        text: item.position,
      }),
    );
  }

  // ================================================================ RENDER

  function onErrorHandler(model) {
    console.log(model);
  }

  return (
    <div className="flex justify-center">
      <SheForm<T>
        form={form}
        defaultValues={UserModelDefault}
        image={TNFLogoIcon}
        formPosition={DirectionEnum.CENTER}
        title="User Form"
        view={ComponentViewEnum.CARD}
        onSubmit={onSubmit}
        onError={onErrorHandler}
        onCancel={onCancel}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }): React.ReactElement => (
            <SheFormItem label="Name">
              <SheInput {...field} placeholder="enter user name..." />
            </SheFormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }): React.ReactElement => (
            <SheFormItem label="Email">
              <SheInput
                {...field}
                placeholder="enter user email..."
                type="email"
              />
            </SheFormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }): React.ReactElement => (
            <SheFormItem label="Address">
              <SheInput {...field} placeholder="enter user address..." />
            </SheFormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <SheFormItem label="Gender">
              <SheSelect
                selected={field.value}
                items={convertGendersToSelectItems(genders)}
                hideFirstOption
                placeholder="select user gender..."
                onSelect={(value) => {
                  field.onChange(value);
                  void form.trigger("gender");
                }}
              />
            </SheFormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <SheFormItem label="Position">
              <SheSelect
                selected={field.value}
                items={convertPositionsToSelectItems(positions)}
                hideFirstOption
                placeholder="select user position..."
                icon={User}
                onSelect={(value) => {
                  field.onChange(value);
                  void form.trigger("position");
                }}
              />
            </SheFormItem>
          )}
        />
      </SheForm>
    </div>
  );
}
