import React from "react";

import useAppForm from "@/utils/hooks/useAppForm.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserModel, UserModelDefault } from "@/const/models/UserModel.ts";
import UserFormScheme from "@/utils/validation/schemes/UserFormScheme.ts";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import { ISheForm } from "@/const/interfaces/forms/ISheForm.ts";
import { FormField } from "@/components/ui/form.tsx";
import SheFormItem from "@/components/complex/she-form/components/she-form-item/SheFormItem.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import { User } from "lucide-react";

import logo from "@/assets/icons/TNF_logo.svg";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";

export default function UserForm({
  data,
  onSubmit,
  onCancel,
}: ISheForm<UserModel>) {
  const form = useAppForm<UserModel>({
    mode: "onBlur",
    resolver: zodResolver(UserFormScheme),
    defaultValues: data || UserModelDefault,
  });

  function onErrorHandler(model) {
    console.log(model);
  }

  return (
    <div className="flex justify-center">
      <SheForm
        form={form}
        image="https://img.freepik.com/free-vector/flat-design-atheism-logo-template_23-2149242249.jpg?t=st=1743008409~exp=1743012009~hmac=de721b3755982cb690d6dc5ece0ae4790654c0196151bfd40cc992ecaec2fcdb&w=740"
        title="User Form"
        text="some text"
        description="so sodisn einweo noin"
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
      </SheForm>
    </div>
  );
}

/*<SheForm
        form={form}
        title="Auth Form Title"
        onSubmit={onSubmitHandler}
        onError={onErrorHandler}
        onCancel={onCancelHandler}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }): React.ReactElement => (
            <SheFormItem
              label="Name"
              description={`min: 4 value: ${field?.value?.length || 0} max: 20`}
            >
              <SheInput
                {...field}
                type="text"
                isSearch
                placeholder="enter name..."
              />
            </SheFormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }): React.ReactElement => (
            <SheFormItem label="Email">
              <input {...field} type="email" placeholder="enter email..." />
            </SheFormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) =>
            (
              <FormItem className="flex flex-col items-start">
                <FormLabel>Gender</FormLabel>

                <FormControl>
                  <SheSelect
                    items={convertProductToSelectModels(products)}
                    onSelect={onSelectHandler}
                  />
                </FormControl>
                <FormDescription>
                  You can find all available gender here{" "}
                  <a
                    href="https://www.shutterstock.com/shutterstock/photos/2234473535/display_1500/stock-vector-all-gender-symbol-icon-vector-set-illustration-sexual-orientation-sex-symbol-icon-pride-flag-2234473535.jpg"
                    target="_blank"
                    className="text-blue-500"
                  >
                    "genders"
                  </a>
                </FormDescription>
                <FormMessage />
              </FormItem>
            ) as any
          }
        />
      </SheForm>*/
