import { GridRowsColorsEnum } from "@/const/enums/GridRowsColorsEnum.ts";

export interface GridRowColorCondition {
  field?: string;
  value?: any;
  color?: GridRowsColorsEnum;
}
