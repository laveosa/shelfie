// =================================================================================== DATE FORMATING LOGIC

import moment from "moment";
import _ from "lodash";

export function inferCalendarMode(value: any): "single" | "multiple" | "range" {
  if (isCalendarMultipleDateValue(value)) return "multiple";
  if (isCalendarRangeDateValue(value)) return "range";
  if (isCalendarSingleDateValue(value)) return "single";
  return null;
}

export function parseValidDate(
  value: any,
): Date | Date[] | { from: Date; to: Date } {
  if (!value) return null;

  switch (inferCalendarMode(value)) {
    case "multiple":
      return parseCalendarMultipleDate(value);
    case "range":
      return parseCalendarRangeDate(value);
    case "single":
      return parseCalendarSingleDate(value);
    default: {
      console.error("Invalid date to parse: ", value);
      return null;
    }
  }
}

// -------------------------------------------------------------- CALENDAR MODE DETECTION

export function isCalendarMultipleDateValue(value: unknown): boolean {
  if (!value || !Array.isArray(value) || value.length === 0) return null;

  let isValueDates = true;
  const invalidDateIndexes: number[] = [];

  for (const item of value) {
    if (isValueDates) {
      isValueDates = !!parseCalendarSingleDate(item);
    }

    if (!parseCalendarSingleDate(item)) {
      invalidDateIndexes.push(value.indexOf(item));
    }
  }

  if (invalidDateIndexes.length > 0) {
    console.error("Invalid Multiple Date value indexes: ", invalidDateIndexes);
  }

  return isValueDates;
}

export function isCalendarRangeDateValue(
  value: unknown,
): value is { from: Date | string; to: Date | string } {
  return (
    value &&
    typeof value === "object" &&
    "from" in value &&
    "to" in value &&
    (typeof (value as any).from === "string" ||
      (value as any).from instanceof Date) &&
    (typeof (value as any).to === "string" ||
      (value as any).to instanceof Date) &&
    !!parseCalendarSingleDate(value.from) &&
    !!parseCalendarSingleDate(value.to)
  );
}

export function isCalendarSingleDateValue(value: any): boolean {
  if (!value || (typeof value === "object" && value.from)) return null;

  const tmpDate: Date = parseCalendarSingleDate(value);

  if (!tmpDate) {
    console.error("Invalid single Date value : ", value);
  }

  return tmpDate && typeof tmpDate === "object";
}

// -------------------------------------------------------------- DATE PARSERS

export function parseCalendarMultipleDate(
  value: string[] | Date[] | (string | Date)[],
): Date[] | null {
  if (!isCalendarMultipleDateValue(value)) return null;

  const dateList: Date[] = value.map((item) =>
    item instanceof Date && !isNaN(item.getTime()) ? item : new Date(item),
  );

  return sortDateListByDate(dateList);
}

export function parseCalendarRangeDate(
  value:
    | { from: string; to: string }
    | { from: Date; to: Date }
    | { from: string | Date; to: string | Date },
): { from: Date; to: Date } {
  if (!isCalendarRangeDateValue(value)) return null;

  const from: Date =
    value.from instanceof Date && !isNaN(value.from.getTime())
      ? value.from
      : new Date(value.from);
  let to: Date =
    value.to instanceof Date && !isNaN(value.to.getTime())
      ? value.to
      : new Date(value.to);

  if (moment(from).isSameOrAfter(to)) {
    console.error(`FROM: "${from}" date, can't be more the TO: "${to}" date!`);
    const fromDateCopy = _.clone(from);
    to = new Date(fromDateCopy.setDate(fromDateCopy.getDate() + 1));
  }

  return {
    from,
    to,
  };
}

export function parseCalendarSingleDate(value: string | Date): Date | null {
  if (!value) return null; // this func can be use outside of this helper scope, so we need this check here!

  if (value instanceof Date && !isNaN(value.getTime())) return value;

  if (typeof value === "string") {
    const patterns = [
      /\b(\d{2})[./-](\d{2})[./-](\d{4})\b/, // MM.DD.YYYY / MM-DD-YYYY / MM/DD/YYYY
    ];
    for (const pattern of patterns) {
      const match = value.match(pattern);
      if (match) {
        const [_, mm, dd, yyyy] = match;
        const date = new Date(+yyyy, +mm - 1, +dd);
        if (!isNaN(date.getTime())) return date;
      }
    }
  }

  return null;
}

// -------------------------------------------------------------- TOTAL

export function sortDateListByDate(list: Date[]): Date[] {
  if (!list || list.length === 0) return null;
  return list.sort((a, b) => new Date(b) - new Date(a)).reverse();
}
