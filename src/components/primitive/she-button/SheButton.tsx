import { Loader2 } from "lucide-react";

import cs from "./SheButton.module.scss";
import { ISheButton } from "@/const/interfaces/primitive-components/ISheButton.ts";
import { Button } from "@/components/ui/button.tsx";
import React from "react";
import { Trans } from "react-i18next";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";

export default function SheButton({
  id,
  className,
  children,
  value,
  valueTransKey,
  loading,
  disabled,
  minWidth,
  minHeight,
  fullWidth,
  icon,
  iconPosition = DirectionEnum.LEFT,
  iconSize = 16,
  iconClassName,
  ...props
}: ISheButton): React.ReactNode {
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
      id={id}
      className={`${cs.sheButton} ${className || ""} ${icon ? cs.withIcon : ""} ${cs[`icon-${iconPosition}`] || ""}`}
      style={{
        minWidth,
        minHeight,
      }}
      disabled={loading || disabled}
    >
      <>
        {loading && (
          <div className={cs.loaderContainer}>
            <Loader2
              className="animate-spin"
              style={{
                width: "30px",
                height: "30px",
                color: loaderColor,
              }}
            />
          </div>
        )}
        <>
          {icon && iconPosition === "left" && (
            <div className={`${iconClassName || ""}`}>{icon}</div>
          )}
          {value && (
            <span>
              <Trans i18nKey={valueTransKey}>{value}</Trans>
            </span>
          )}
          {children && <span>{children}</span>}
          {icon && iconPosition === DirectionEnum.RIGHT && (
            <div className={`${iconClassName || ""}`}>{icon}</div>
          )}
        </>
      </>
    </Button>
  );
}
