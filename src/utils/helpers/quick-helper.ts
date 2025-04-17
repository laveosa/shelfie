import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import { IUndefinedProperties } from "@/const/interfaces/IUndefinedProperties.ts";
import { ComponentPropsWithRef } from "react";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";

export function getCurrentSectionUrl(url: string): NavUrlEnum {
  const chang = url.split("/")[1].toUpperCase();
  return NavUrlEnum[chang];
}

export function removeObjectProperty(obj: any, identifier: string) {
  const { [identifier]: _, ...rest } = obj;
  return rest;
}

export const createEmptyProps = <
  T extends object,
>(): IUndefinedProperties<T> => {
  return {} as IUndefinedProperties<T>;
};

export const filterCustomProps = <
  TCustomProps extends object,
  TDefaultProps extends ComponentPropsWithRef<"div">,
>(
  props: TCustomProps & TDefaultProps,
  customProps: Record<
    keyof TCustomProps,
    any
  > = createEmptyProps<TCustomProps>(),
) => {
  const { ...defaultProps } = props;

  (Object.keys(customProps) as Array<keyof TCustomProps>).forEach((key) => {
    delete (defaultProps as any)[key];
  });

  return defaultProps as TDefaultProps;
};

export function isSheIconConfig(
  icon: unknown,
): icon is Partial<ISheIcon> & { icon: any } {
  return typeof icon === "object" && icon !== null && "icon" in icon;
}
