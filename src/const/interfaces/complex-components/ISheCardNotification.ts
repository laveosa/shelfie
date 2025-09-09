import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ISheButton } from "@/const/interfaces/primitive-components/ISheButton.ts";
import React from "react";

export interface ISheCardNotification {
  className?: string;
  title?: string;
  titleTransKey?: string;
  titleIcon?: Partial<ISheIcon> | string | React.FC<any>;
  text?: string;
  textTransKey?: string;
  buttonIcon?: Partial<ISheIcon> | string | React.FC<any>;
  buttonText?: string;
  buttonTextTransKey?: string;
  buttonColor?: string;
  buttonVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  backgroundColor?: string;
  borderColor?: string;
  buttonModel?: ISheButton;
  showButton?: boolean;
  showCloseButton?: boolean;
  onClick?: () => void;
  onClose?: () => void;
}
