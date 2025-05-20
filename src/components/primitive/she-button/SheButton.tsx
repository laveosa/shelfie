import React, { JSX } from "react";
import { Trans } from "react-i18next";
import { Loader2 } from "lucide-react";

import cs from "./SheButton.module.scss";
import { ISheButton } from "@/const/interfaces/primitive-components/ISheButton.ts";
import { Button } from "@/components/ui/button.tsx";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";

export default function SheButton({
  className = "",
  style,
  icon,
  iconPosition = DirectionEnum.LEFT,
  value,
  valueTransKey,
  disabled,
  isLoading,
  minWidth,
  maxWidth,
  fullWidth,
  minHeight,
  maxHeight,
  txtColor,
  bgColor,
  children,
  ...props
}: ISheButton): JSX.Element {
  const iconSize: string = "20px";
  const loaderSize: string = "30px";
  const loaderColor: string = isLoaderDark();

  function isLoaderDark(): string {
    switch (props.variant) {
      case "ghost":
      case "link":
      case "outline":
      case "secondary":
        return "black";
      default:
        return "white";
    }
  }

  // ==================================================================== EVENT

  // ==================================================================== PRIVATE

  // ==================================================================== LAYOUT

  return (
    <Button
      {...props}
      className={`${cs.sheButton} ${className} ${cs[`icon-${iconPosition}`] || ""} ${value || children ? cs.withText : ""} ${fullWidth ? cs.fullWidth : ""}`}
      style={{
        color: txtColor,
        backgroundColor: bgColor,
        minWidth,
        maxWidth,
        minHeight,
        maxHeight,
        ...style,
      }}
      disabled={isLoading || disabled}
    >
      <>
        {isLoading && (
          <div className={cs.loaderContainer}>
            <Loader2
              className="animate-spin"
              style={{
                width: loaderSize,
                height: loaderSize,
                color: loaderColor,
              }}
            />
          </div>
        )}
        <>
          {iconPosition === DirectionEnum.LEFT && (
            <SheIcon
              icon={icon}
              minWidth={iconSize}
              maxWidth={iconSize}
              minHeight={iconSize}
              maxHeight={iconSize}
            />
          )}
          {value && (
            <span>
              <Trans i18nKey={valueTransKey}>{value}</Trans>
            </span>
          )}
          {children && <div>{children}</div>}
          {icon && iconPosition === DirectionEnum.RIGHT && (
            <SheIcon
              icon={icon}
              minWidth={iconSize}
              maxWidth={iconSize}
              minHeight={iconSize}
              maxHeight={iconSize}
            />
          )}
        </>
      </>
    </Button>
  );
}
