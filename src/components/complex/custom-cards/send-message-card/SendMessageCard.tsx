import React from "react";

import { ISendMessageCard } from "@/const/interfaces/complex-components/custom-cards/ISendMessageCard.ts";
import cs from "./SendMessageCard.module.scss";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import CustomerInfoLayout from "@/components/layouts/customer-info-layout/CustomerInfoLayout.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import {
  ChevronsUpDown,
  Clock10,
  Copy,
  MessageCircle,
  MessageCircleOff,
  ShoppingCart,
} from "lucide-react";
import SheTextArea from "@/components/primitive/she-textarea/SheTextarea.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";

export default function SendMessageCard({
  isLoading,
  onAction,
  selectedCustomer,
  customersList,
}: ISendMessageCard) {
  // ==================================================================== STATE MANAGEMENT
  const [isOpen, setIsOpen] = React.useState(false);
  // ==================================================================== SIDE EFFECTS

  // ==================================================================== PRIVATE

  // ==================================================================== LAYOUT
  return (
    <div>
      <SheCard
        isLoading={isLoading}
        className={cs.sendMessageCard}
        title="Send Message"
        showCloseButton
        onSecondaryButtonClick={() => onAction("closeSendMessageCard")}
      >
        <div className={cs.sendMessageCardContent}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className={cs.selectContactBlock}>
              <div className={cs.selectedContact}>
                <CustomerInfoLayout
                  customer={selectedCustomer}
                  showMessengerIcon
                />
                <SheIcon icon={ChevronsUpDown} maxWidth="20px" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={cs.customersListItems}>
              {customersList?.length > 0 && (
                <>
                  {customersList?.map((customer) => (
                    <DropdownMenuItem key={customer.id || customer.name}>
                      <CustomerInfoLayout
                        customer={customer}
                        showMessengerIcon
                      />
                    </DropdownMenuItem>
                  ))}
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className={cs.messageBlock}>
            <SheTextArea fullWidth rows={8} />
            <div className={cs.messageButtonsBlock}>
              <div className={cs.manageCartButtons}>
                <SheButton variant="secondary" icon={ShoppingCart} />
                <SheButton variant="secondary" icon={Clock10} />
              </div>
              <SheButton variant="secondary" icon={Copy} />
            </div>
            <div className={cs.messageBlockFooter}>
              <SheButton
                variant="secondary"
                icon={MessageCircleOff}
                value="Cancel"
                onClick={() => onAction("closeSendMessageCard")}
              />
              <SheButton variant="info" icon={MessageCircle} value="Send" />
            </div>
          </div>
        </div>
      </SheCard>
    </div>
  );
}
