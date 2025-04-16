import React, { JSX } from "react";
import { Trans } from "react-i18next";
import { Loader2 } from "lucide-react";

import cs from "./SheButton.module.scss";
import { ISheButton } from "@/const/interfaces/primitive-components/ISheButton.ts";
import { Button } from "@/components/ui/button.tsx";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";

export default function SheButton({
  className,
  children,
  value,
  valueTransKey,
  isLoading,
  disabled,
  fullWidth,
  minWidth,
  minHeight,
  icon,
  iconPosition = DirectionEnum.LEFT,
  ...props
}: ISheButton): JSX.Element {
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
      className={`${cs.sheButton} ${className || ""} ${icon ? cs.withIcon : ""} ${cs[`icon-${iconPosition}`] || ""}`}
      style={{
        minWidth,
        minHeight,
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
          {icon && iconPosition === "left" && (
            <SheIcon minWidth="20px" maxWidth="20px" {...icon} />
          )}
          {value && (
            <span>
              <Trans i18nKey={valueTransKey}>{value}</Trans>
            </span>
          )}
          {children && <span>{children}</span>}
          {icon && iconPosition === DirectionEnum.RIGHT && (
            <SheIcon minWidth="20px" maxWidth="20px" {...icon} />
          )}
        </>
      </>
    </Button>
  );
}
