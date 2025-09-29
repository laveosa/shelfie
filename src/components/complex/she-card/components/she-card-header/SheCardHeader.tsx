import React, { JSX } from "react";

import { PanelLeft, PanelRight, X } from "lucide-react";

import cs from "./SheCardHeader.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { ISheCardHeader } from "@/const/interfaces/complex-components/ISheCardHeader.ts";

export default function SheCardHeader({
  headerClassName: className = "",
  headerStyle: style,
  view,
  icon,
  title,
  titleTransKey,
  text,
  textTransKey,
  description,
  descriptionTransKey,
  isMinimized,
  isLoading,
  showHeader,
  showToggleButton,
  showCloseButton,
  onHeaderToggleClick,
  onHeaderCloseClick,
}: ISheCardHeader): JSX.Element {
  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();

  // ==================================================================== SIDE EFFECTS

  // ==================================================================== EVENT HANDLERS

  // ==================================================================== LAYOUT
  if (!showHeader) {
    return null;
  }

  return (
    <div
      className={`${cs.sheCardHeader} ${className} ${cs[view]}`}
      style={style}
    >
      {showToggleButton && (
        <div
          className={`${cs.sheCardHeaderCell} ${cs.sheCardHeaderCellToggleButton}`}
        >
          <SheButton
            className={cs.sheCardHeaderButton}
            icon={isMinimized ? PanelRight : PanelLeft}
            variant="ghost"
            onClick={onHeaderToggleClick}
          />
        </div>
      )}
      {icon && (
        <div className={`${cs.sheCardHeaderCell} ${cs.sheCardHeaderCellIcon}`}>
          <SheIcon className={cs.sheCardHeaderIcon} icon={icon} />
        </div>
      )}
      <div className={`${cs.sheCardHeaderCell} ${cs.sheCardHeaderCellInfo}`}>
        {title && (
          <span className="she-title">
            {translate(titleTransKey, {}, title)}
          </span>
        )}
        {text && (
          <span className="she-text">{translate(textTransKey, {}, text)}</span>
        )}
        {description && (
          <span className="she-subtext">
            {translate(descriptionTransKey, {}, description)}
          </span>
        )}
      </div>
      {showCloseButton && (
        <div
          className={`${cs.sheCardHeaderCell} ${cs.sheCardHeaderCellCloseButton}`}
        >
          <SheButton
            className={cs.sheCardHeaderButton}
            icon={X}
            variant="ghost"
            disabled={isLoading}
            onClick={onHeaderCloseClick}
          />
        </div>
      )}
    </div>
  );
}
