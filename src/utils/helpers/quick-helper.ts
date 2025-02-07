import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";

export function getCurrentSectionUrl(url: string): NavUrlEnum {
  const chang = url.split("/")[1].toUpperCase();
  return NavUrlEnum[chang];
}

export function removeObjectProperty(obj: any, identifier: string) {
  const { [identifier]: _, ...rest } = obj;
  return rest;
}
