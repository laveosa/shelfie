import { ImageIcon } from "lucide-react";
import React from "react";

import cs from "./CustomerInfoLayout.module.scss";
import { getInitials } from "@/utils/helpers/quick-helper.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";
import { ICustomerInfoLayout } from "@/const/interfaces/layouts/ICustomerInfoLayout.ts";
import messengerIcon from "@/assets/images/facebook-messenger-logo.svg";

export default function CustomerInfoLayout({
  className,
  customer,
  showMessengerIcon,
}: ICustomerInfoLayout) {
  return (
    <div className={`${cs.customerNameBlock} ${className}`}>
      {showMessengerIcon && (
        <SheIcon
          className={cs.messengerIcon}
          icon={messengerIcon}
          maxWidth="16px"
        />
      )}
      <div className={cs.customerAvatar}>
        {customer?.thumbnailUrl ? (
          <img
            src={customer?.thumbnailUrl}
            alt={customer?.customerName || "Customer"}
          />
        ) : customer?.customerName ? (
          <div className={cs.avatarInitials}>
            {getInitials(customer?.customerName)}
          </div>
        ) : (
          <div className={cs.noImageIcon}>
            <SheIcon icon={ImageIcon} maxWidth="38px" />
          </div>
        )}
      </div>
      <div className={cs.customerInfoBlock}>
        <SheTooltip
          delayDuration={200}
          text={customer?.customerName}
          className={cs.customerInfoBlockTooltip}
        >
          <span className="she-text">{customer?.customerName}</span>
        </SheTooltip>
        {customer?.email && (
          <SheTooltip
            delayDuration={200}
            text={customer?.email}
            className={cs.customerInfoBlockTooltip}
          >
            <span className="she-subtext">{customer?.email}</span>
          </SheTooltip>
        )}
      </div>
    </div>
  );
}
