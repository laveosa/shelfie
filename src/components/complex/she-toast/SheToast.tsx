import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import { Trans } from "react-i18next";
import React from "react";

import cs from "./SheToast.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { ISheToast } from "@/const/interfaces/complex-components/ISheToast.ts";

const getIcon = (type: "success" | "error" | "info" | "warning") => {
  switch (type) {
    case "success":
      return <CheckCircle />;
    case "error":
      return <AlertCircle />;
    case "info":
      return <Info />;
    case "warning":
      return <AlertTriangle />;
    default:
      return null;
  }
};

export default function SheToast({
  title,
  titleTransKey,
  text,
  textTransKey,
  description,
  descriptionTransKey,
  dismissButton,
  type = "info",
}: ISheToast) {
  return (
    <div className={`${cs.sheToast} ${cs[type]}`}>
      <div className={cs.toastIcon}>{getIcon(type)}</div>
      <div className={cs.toastContent}>
        {title && (
          <span className="she-title">
            <Trans i18nKey={titleTransKey}>{title}</Trans>
          </span>
        )}
        <span className="she-text">
          <Trans i18nKey={textTransKey}>{text}</Trans>
        </span>
        {description && (
          <span className="she-subtext">
            <Trans i18nKey={descriptionTransKey}>{description}</Trans>
          </span>
        )}
        <button onClick={dismissButton} className={cs.dismissButton}>
          Dismiss
        </button>
      </div>
      <div className={cs.closeButton}>
        <SheButton icon={X} onClick={dismissButton} />
      </div>
    </div>
  );
}
