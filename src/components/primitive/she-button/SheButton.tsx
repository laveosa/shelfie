import React, { JSX } from "react";
import { Trans } from "react-i18next";
import { Loader2 } from "lucide-react";

import cs from "./SheButton.module.scss";
import { ISheButton } from "@/const/interfaces/primitive-components/ISheButton.ts";
import { Button } from "@/components/ui/button.tsx";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";

export default function SheButton({
  className,
  children,
  value,
  valueTransKey,
  isLoading,
  disabled,
  fullWidth,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  color,
  icon,
  iconPosition = DirectionEnum.LEFT,
  style,
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

  function isSheIconConfig(
    icon: unknown,
  ): icon is Partial<ISheIcon> & { icon: any } {
    return typeof icon === "object" && icon !== null && "icon" in icon;
  }

  // ==================================================================== LAYOUT

  return (
    <Button
      {...props}
      className={`${cs.sheButton} ${className || ""} ${fullWidth ? cs.fullWidth : ""} ${value ? cs.withText : ""} ${cs[`icon-${iconPosition}`] || ""}`}
      style={{
        color,
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
          {icon &&
            iconPosition === DirectionEnum.LEFT &&
            (isSheIconConfig(icon) ? (
              <SheIcon
                {...icon}
                minWidth={iconSize}
                maxWidth={iconSize}
                minHeight={iconSize}
                maxHeight={iconSize}
              />
            ) : (
              <SheIcon
                icon={icon}
                minWidth={iconSize}
                maxWidth={iconSize}
                minHeight={iconSize}
                maxHeight={iconSize}
              />
            ))}
          {value && (
            <span>
              <Trans i18nKey={valueTransKey}>{value}</Trans>
            </span>
          )}
          {children && <span>{children}</span>}
          {icon &&
            iconPosition === DirectionEnum.RIGHT &&
            (isSheIconConfig(icon) ? (
              <SheIcon
                {...icon}
                minWidth={iconSize}
                maxWidth={iconSize}
                minHeight={iconSize}
                maxHeight={iconSize}
              />
            ) : (
              <SheIcon
                icon={icon}
                minWidth={iconSize}
                maxWidth={iconSize}
                minHeight={iconSize}
                maxHeight={iconSize}
              />
            ))}
        </>
      </>
    </Button>
  );
}
