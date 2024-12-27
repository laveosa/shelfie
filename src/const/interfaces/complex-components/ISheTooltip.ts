import { IBaseComponent } from "@/const/interfaces/IBaseComponent.ts";
import { ALIGN_OPTIONS, SIDE_OPTIONS } from "@radix-ui/react-popper";
import { SheTooltipEnum } from "@/const/enums/SheTooltipEnum.ts";

export interface ISheTooltip extends IBaseComponent {
  title?: string;
  titleTransKey?: string;
  text?: string;
  textTransKey?: string;
  description?: string;
  descriptionTransKey?: string;
  side?: (typeof SIDE_OPTIONS)[number];
  align?: (typeof ALIGN_OPTIONS)[number];
  view?: SheTooltipEnum;
  delayDuration?: any;
  onClick?: (value: any) => any;
}
