import React from "react";
import cs from "./SheToast.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from "lucide-react";

interface ISheToast {
  id?: string;
  title?: string;
  message: string;
  description?: string;
  dismiss?: () => void;
  type?: "success" | "error" | "info" | "warning";
}

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
  message,
  dismiss,
  description,
  type = "info",
}: ISheToast) {
  return (
    <div className={`${cs.sheToast} ${cs[type]}`}>
      <div className={cs.toastIcon}>{getIcon(type)}</div>
      <div className={cs.toastContent}>
        {title && <span className="she-title">{title}</span>}
        <span className="she-text">{message}</span>
        {description && <span className="she-subtext">{description}</span>}
        <button onClick={dismiss} className={cs.dismissButton}>
          Dismiss
        </button>
      </div>
      <div className={cs.closeButton}>
        <SheButton icon={X} onClick={dismiss} />
      </div>
    </div>
  );
}
