import React, { JSX } from "react";
import { Trans } from "react-i18next";

import cs from "./SheButton.module.scss";
import { ISheButton } from "@/const/interfaces/primitive-components/ISheButton.ts";
import { Button } from "@/components/ui/button.tsx";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { Loader2 } from "lucide-react";

export default function SheButton({
  className = "",
  style,
  icon,
  iconPosition = DirectionEnum.LEFT,
  twistIcon,
  value,
  valueTransKey,
  valueWrap,
  variant = "default",
  size = "sizeNormal",
  view = "viewNormal",
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
  const iconSize: string = size === "sizeSmall" ? "14px" : "20px";
  const loaderSize: string = size === "sizeSmall" ? "24px" : "30px";
  const loaderColor: string = _isLoaderDark();

  // ==================================================================== EVENT

  // ==================================================================== PRIVATE

  function _isLoaderDark(): string {
    switch (variant) {
      case "ghost":
      case "link":
      case "outline":
      case "secondary":
        return "black";
      default:
        return "white";
    }
  }

  // ==================================================================== LAYOUT

  return (
    <Button
      className={`${cs.sheButton} ${className} ${cs[variant]} ${cs[`icon-${iconPosition}`] || ""} ${value || children ? cs.withText : ""} ${fullWidth ? cs.fullWidth : ""} ${cs[size]} ${cs[view]} ${twistIcon ? cs.twistIcon : ""} ${valueWrap ? cs.valueWrap : ""} ${icon ? cs[iconPosition + "Icon"] : ""}`}
      style={{
        color: txtColor,
        backgroundColor: bgColor,
        minWidth,
        maxWidth,
        minHeight,
        maxHeight,
        ...style,
      }}
      variant={variant}
      disabled={isLoading || disabled}
      {...props}
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
              className={cs.iconElement}
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
              className={cs.iconElement}
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
