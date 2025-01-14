import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";

export function getCurrentSectionUrl(url: string): NavUrlEnum {
  const chang = url.split("/")[1].toUpperCase();
  return NavUrlEnum[chang];
}
