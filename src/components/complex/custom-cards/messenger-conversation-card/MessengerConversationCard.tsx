import { OctagonAlert, Trash2Icon } from "lucide-react";
import React from "react";

import SheCard from "@/components/complex/she-card/SheCard.tsx";
import cs from "./MessengerConversationCard.module.scss";
import { IMessengerConversationCard } from "@/const/interfaces/complex-components/custom-cards/IMessengerConversationCard.ts";
import { getInitials } from "@/utils/helpers/quick-helper.ts";
import facebookLogo from "@/assets/images/facebook-messenger_logo.svg";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import SheTextArea from "@/components/primitive/she-textarea/SheTextarea.tsx";

export default function MessengerConversationCard({
  chat,
  onAction,
}: IMessengerConversationCard) {
  return (
    <SheCard
      view="card"
      className={cs.messengerConversationCard}
      width="400px"
      showFooter
      showPrimaryButton
      primaryButtonTitle="Send"
      onPrimaryButtonClick={() => onAction("sendMessage")}
      showSecondaryButton
      secondaryButtonTitle="Close"
      onSecondaryButtonClick={() => onAction("onChatClick", chat)}
    >
      <div className={cs.messengerConversationCardContent}>
        <div className={cs.messengerConversationCardHeader}>
          <div className={cs.avatarNameBlock}>
            <div
              className={cs.chatAvatar}
              onClick={(e) => {
                e.stopPropagation();
                onAction("onAvatarClick", chat.userId);
              }}
            >
              {chat.userPrifilePic ? (
                <img
                  src={chat.userPrifilePic}
                  alt={chat.userId.toString()}
                  className={cs.chatAvatarImage}
                />
              ) : (
                <div className={cs.avatarInitials}>
                  {getInitials(chat.userName)}
                </div>
              )}
              <img
                src={facebookLogo}
                alt="facebook-logo"
                className={cs.facebookLogo}
              />
            </div>
            <div className={cs.chatName}>
              <span className="she-title">{chat.userName}</span>
            </div>
          </div>
          <div className={cs.headerButtonBlock}>
            <SheButton icon={OctagonAlert} variant="secondary" />
            <SheButton icon={Trash2Icon} variant="secondary" />
          </div>
        </div>
        <Separator />
        <div className={cs.messengerConversationCardChat}></div>
        <div className={cs.messengerConversationCardFooter}>
          <SheTextArea fullWidth />
        </div>
      </div>
    </SheCard>
  );
}
