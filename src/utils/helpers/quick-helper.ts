import { ComponentPropsWithRef } from "react";

import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import { IUndefinedProperties } from "@/const/interfaces/IUndefinedProperties.ts";
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

export function isSheIconConfig(
  icon: unknown,
): icon is Partial<ISheIcon> & { icon: any } {
  return typeof icon === "object" && icon !== null && "icon" in icon;
}

export function generateId(length: number = 8) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result.toString();
}

export const filterCustomProps = <
  TCustomProps extends object,
  TDefaultProps extends ComponentPropsWithRef<any>,
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

export function filterProps<T extends object>(
  props: any,
  validKeys: (keyof T)[],
): Partial<T> {
  const result: Partial<T> = {} as any;

  for (const key of validKeys) {
    if (key in props) {
      result[key] = props[key];
    }
  }

  return result;
}

export function formatDate(
  dateString: string,
  format: "date" | "time" = "date",
): string {
  const date = new Date(dateString);

  if (format === "date") {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  if (format === "time") {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  return "";
}

export function getInitials(name: string) {
  const names = name.trim().split(" ");
  const initials = names.map((n) => n.charAt(0).toUpperCase()).slice(0, 2);
  return initials.join("");
}
