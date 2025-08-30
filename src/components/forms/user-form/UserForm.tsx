import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

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

import { User } from "lucide-react";
import TNFLogoIcon from "@/assets/icons/TNF_logo.svg";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";

export default function UserForm<T>({
  data,
  genders,
  positions,
  onSubmit,
  onCancel,
}: IUserForm<T>): React.ReactNode {
  const { t } = useTranslation();
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

  function convertGendersToSelectItems(data: any[]): ISheSelectItem<T>[] {
    return data?.map(
      (item): ISheSelectItem<T> => ({
        value: item,
        text: item,
      }),
    );
  }

  function convertPositionsToSelectItems(data: any[]): ISheSelectItem<T>[] {
    return data?.map(
      (item): ISheSelectItem<T> => ({
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
        title={t("UserForm.Title")}
        view={ComponentViewEnum.CARD}
        onSubmit={onSubmit}
        onError={onErrorHandler}
        onCancel={onCancel}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }): React.ReactElement => (
            <SheFormItem label={t("UserForm.Labels.Name")}>
              <SheInput {...field} placeholder={t("UserForm.Placeholders.Name")} />
            </SheFormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }): React.ReactElement => (
            <SheFormItem label={t("UserForm.Labels.Email")}>
              <SheInput
                {...field}
                placeholder={t("UserForm.Placeholders.Email")}
                type="email"
              />
            </SheFormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }): React.ReactElement => (
            <SheFormItem label={t("UserForm.Labels.Address")}>
              <SheInput {...field} placeholder={t("UserForm.Placeholders.Address")} />
            </SheFormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <SheFormItem label={t("UserForm.Labels.Gender")}>
              <SheSelect
                selected={field.value}
                items={convertGendersToSelectItems(genders)}
                hideFirstOption
                placeholder={t("UserForm.Placeholders.Gender")}
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
            <SheFormItem label={t("UserForm.Labels.Position")}>
              <SheSelect
                selected={field.value}
                items={convertPositionsToSelectItems(positions)}
                hideFirstOption
                placeholder={t("UserForm.Placeholders.Position")}
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
