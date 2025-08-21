import React from "react";
import { FieldPath } from "react-hook-form";

import { FormField } from "@/components/ui/form.tsx";
import SheFormItem from "@/components/complex/she-form/components/she-form-item/SheFormItem.tsx";
import { getCustomProps } from "@/utils/helpers/props-helper.ts";
import { ISheFormField } from "@/const/interfaces/forms/ISheFormField.ts";
import { SheFormItemDefaultModel } from "@/const/interfaces/forms/ISheFormItem.ts";
import { SheFormItemContextProvider } from "@/state/providers/she-form-item-context-provider.tsx";

export default function SheFormField<T = any, TName extends FieldPath<T>>(
  props: ISheFormField<T, TName>,
) {
  // ==================================================================== PROPS
  const { form, name, render } = props;
  const sheFormItemProps = getCustomProps<ISheFormField<T, TName>>(
    props,
    SheFormItemDefaultModel,
  );

  // ==================================================================== LAYOUT
  return (
    <FormField<T, TName>
      control={form.control}
      name={name}
      render={({ field, fieldState, formState }) =>
        (
          <SheFormItem {...sheFormItemProps}>
            <SheFormItemContextProvider value={{ field, form }}>
              {render({ field, fieldState, formState })}
            </SheFormItemContextProvider>
          </SheFormItem>
        ) as any
      }
    />
  );
}
