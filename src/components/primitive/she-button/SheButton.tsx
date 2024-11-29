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
      className={`${className || ""} ${cs.sheButton || ""}`}
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
        {props.children}
      </>
    </Button>
  );
}
