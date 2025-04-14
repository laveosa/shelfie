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

/*
import { Loader2 } from "lucide-react";

import cs from "./SheButton.module.scss";
import { ISheButton } from "@/const/interfaces/primitive-components/ISheButton.ts";
import { Button } from "@/components/ui/button.tsx";
import { forwardRef } from "react";

const SheButton = forwardRef<HTMLButtonElement, ISheButton>(
  (
    {
      className,
      loading,
      disabled,
      minWidth,
      minHeight,
      icon: Icon,
      iconPosition = "left",
      iconSize = 16,
      iconClassName,
      ...props
    },
    ref,
  ) => {
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

    return (
      <Button
        {...props}
        ref={ref}
        disabled={loading || disabled}
        className={`${className || ""} ${cs.sheButton || ""} ${
          Icon ? cs.withIcon : ""
        } ${cs[`icon-${iconPosition}`] || ""}`}
        style={{
          minWidth,
          minHeight,
        }}
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
            {Icon && iconPosition === "left" && (
              <Icon
                className={`${cs.buttonIcon} ${cs.leftIcon} ${iconClassName || ""}`}
                size={iconSize}
              />
            )}
            <span className={cs.buttonContent}>{props.children}</span>
            {Icon && iconPosition === "right" && (
              <Icon
                className={`${cs.buttonIcon} ${cs.rightIcon} ${iconClassName || ""}`}
                size={iconSize}
              />
            )}
          </>
        </>
      </Button>
    );
  },
);

SheButton.displayName = "SheButton";

export default SheButton;
*/
