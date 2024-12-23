import cs from "./SheTooltip.module.scss";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ISheTooltip } from "@/const/interfaces/complex-components/ISheTooltip.ts";

export default function SheTooltip({
  className,
  children,
  title,
  titleTransKey,
  text,
  textTransKey,
  description,
  descriptionTransKey,
  side,
  align,
  view,
  onClick,
  ...props
}: ISheTooltip) {
  function onClickHandler(e) {
    e.preventDefault();
    onClick({
      title,
      text,
      description,
      side,
      align,
      ...props,
    });
  }

  return (
    <div className={`${className} ${cs.sheTooltip || ""}`}>
      <TooltipProvider {...props}>
        <Tooltip>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          {(title || text || description) && (
            <TooltipContent
              className={`${cs.tooltipMessageBlock} ${cs[view]}`}
              side={side}
              align={align}
              onClick={onClickHandler}
            >
              <div className={cs.tooltipMessageBlock}>
                {title && <span className="she-title">{title}</span>}
                {text && <span className="she-text">{text}</span>}
                {description && (
                  <span className="she-subtext">{description}</span>
                )}
              </div>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
