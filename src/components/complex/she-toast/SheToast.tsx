import React from "react";
import cs from "./SheToast.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { X } from "lucide-react";

interface ISheToast {
  id: string;
  icon?: any;
  title?: string;
  message: string;
  description?: string;
  dismiss?: () => void;
}

export default function SheToast({
  icon,
  title,
  message,
  dismiss,
  description,
}: ISheToast) {
  return (
    <div className={cs.sheToast}>
      <div className={cs.toastIcon}>{<img src={icon} />}</div>
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
