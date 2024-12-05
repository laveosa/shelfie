import { Loader2 } from "lucide-react";

import cs from "./SheButton.module.scss";
import { ISheButton } from "@/const/interfaces/primitive-components/ISheButton.ts";
import { Button } from "@/components/ui/button.tsx";

export default function SheButton({
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
}: ISheButton) {
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
}
