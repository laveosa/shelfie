import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import { IUndefinedProperties } from "@/const/interfaces/IUndefinedProperties.ts";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { GridRowsColorsEnum } from "@/const/enums/GridRowsColorsEnum.ts";
import { GridRowColorCondition } from "@/const/interfaces/GridRowColorCondition.ts";

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

export function generateSafeItemId(base: string, idx: number): string {
  const safeBase =
    typeof base === "string" && base.length > 0
      ? base
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9_-]/gi, "_")
      : generateId();
  return `${safeBase}_${(idx + 1).toString()}`;
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

// Generic function to format date rows with custom format patterns
export function formatDateRow(
  dateString: string | null,
  format: string = "dd-mm-yyyy hh:mm",
  fallbackText: string = "No Orders",
): string {
  if (!dateString) {
    return fallbackText;
  }

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return fallbackText;
    }

    // Parse the format string and replace placeholders
    let formattedDate = format;

    // Replace format placeholders with actual date values
    formattedDate = formattedDate
      .replace(/dd/g, String(date.getDate()).padStart(2, "0"))
      .replace(/mm/g, String(date.getMonth() + 1).padStart(2, "0"))
      .replace(/yyyy/g, String(date.getFullYear()))
      .replace(/hh/g, String(date.getHours()).padStart(2, "0"))
      .replace(/mm/g, String(date.getMinutes()).padStart(2, "0"))
      .replace(/ss/g, String(date.getSeconds()).padStart(2, "0"));

    return formattedDate;
  } catch (error) {
    return fallbackText;
  }
}

export function getInitials(
  name?: string,
  firstName?: string,
  lastName?: string,
): string {
  if (name) {
    const names = name.trim().split(" ");
    const initials = names.map((n) => n.charAt(0).toUpperCase()).slice(0, 2);
    return initials.join("");
  }

  const firstInitial = firstName?.trim().charAt(0).toUpperCase() ?? "";
  const lastInitial = lastName?.trim().charAt(0).toUpperCase() ?? "";

  return (firstInitial + lastInitial).trim();
}

export function addGridRowColor(
  items: any[],
  identifier: string,
  conditions: GridRowColorCondition[],
) {
  return items.map((item) => ({
    ...item,
    [identifier]:
      conditions.find((condition) => item[condition.field] === condition.value)
        ?.color || GridRowsColorsEnum.DEFAULT,
  }));
}

export function setSelectedGridItem<T extends Record<string | number, any>>(
  itemId: string | number,
  itemsList: T[],
  idKey: keyof T,
): T[] {
  return itemsList.map((item) => ({
    ...item,
    isGridItemSelected: item[idKey] === itemId,
  }));
}

export function clearSelectedGridItems(itemsList: any[]) {
  return itemsList.map((item) => ({
    ...item,
    isGridItemSelected: false,
  }));
}

export function scrollToRefElement(
  refs: { [key: string]: HTMLElement | null },
  id: string,
  offsetX: number = 20,
  offsetY: number = 20,
  delay: number = 300,
): void {
  setTimeout(() => {
    const element = refs[id];
    if (!element) return;

    element.offsetHeight;

    let scrollParent: HTMLElement | Document | null = element;
    let isWindowScroll = true;
    while (scrollParent && !(scrollParent instanceof Document)) {
      const { overflowY, overflowX } = window.getComputedStyle(
        scrollParent as HTMLElement,
      );
      if (
        overflowY === "auto" ||
        overflowY === "scroll" ||
        overflowX === "auto" ||
        overflowX === "scroll"
      ) {
        isWindowScroll = false;
        break;
      }
      scrollParent = (scrollParent as HTMLElement).parentElement;
    }

    const containerStyles = isWindowScroll
      ? {
          paddingLeft: "0px",
          paddingTop: "0px",
        }
      : window.getComputedStyle(scrollParent as HTMLElement);
    const containerPaddingLeft = parseFloat(containerStyles.paddingLeft) || 0;
    const containerPaddingTop = parseFloat(containerStyles.paddingTop) || 0;

    element.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });

    setTimeout(() => {
      const rect = element.getBoundingClientRect();
      const parentRect = isWindowScroll
        ? {
            top: 0,
            left: 0,
          }
        : (scrollParent as HTMLElement).getBoundingClientRect();
      const scrollTop = isWindowScroll
        ? window.pageYOffset || document.documentElement.scrollTop
        : (scrollParent as HTMLElement).scrollTop;
      const scrollLeft = isWindowScroll
        ? window.pageXOffset || document.documentElement.scrollLeft
        : (scrollParent as HTMLElement).scrollLeft;

      const targetY =
        rect.top + scrollTop - parentRect.top - offsetY - containerPaddingTop;
      const targetX =
        rect.left +
        scrollLeft -
        parentRect.left -
        offsetX -
        containerPaddingLeft;

      const scrollTarget = isWindowScroll ? window : scrollParent;
      scrollTarget.scrollTo({
        top: Math.max(0, targetY),
        left: Math.max(0, targetX),
        behavior: "smooth",
      });
    }, 500);
  }, delay);
}
