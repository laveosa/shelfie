import React from "react";
import { FieldPath } from "react-hook-form";

import { FormField } from "@/components/ui/form.tsx";
import SheFormItem from "@/components/complex/she-form/components/she-form-item/SheFormItem.tsx";
import { getCustomProps } from "@/utils/helpers/props-helper.ts";
import { useSheFormContext } from "@/state/context/she-form-context.ts";
import { SheFormItemContextProvider } from "@/state/providers/she-form-item-context-provider.tsx";
import { ISheFormField } from "@/const/interfaces/forms/ISheFormField.ts";
import {
  ISheFormItem,
  SheFormItemDefaultModel,
} from "@/const/interfaces/forms/ISheFormItem.ts";

export default function SheFormField<T = any, TName extends FieldPath<T> = any>(
  props: ISheFormField<T, TName>,
) {
  // ==================================================================== PROPS
  const { form } = useSheFormContext();
  const { name, render, ignoreFormAction } = props;
  const sheFormItemProps = getCustomProps<
    ISheFormField<T, TName>,
    ISheFormItem
  >(props, SheFormItemDefaultModel);

  // ==================================================================== LAYOUT
  return (
    <FormField<T, TName>
      control={form.control}
      name={name}
      render={({ field, fieldState, formState }) => {
        const contextValue = !ignoreFormAction ? { field, form } : null;
        return (
          <SheFormItem {...sheFormItemProps}>
            <SheFormItemContextProvider<T, TName> value={contextValue}>
              {render({ field, fieldState, formState })}
            </SheFormItemContextProvider>
          </SheFormItem>
        ) as any;
      }}
    />
  );
}
