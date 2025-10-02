import React from "react";

import facebookLogo from "@/assets/images/facebook-messenger_logo.svg";

import cs from "./MessengerListCard.module.scss";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { formatDate, getInitials } from "@/utils/helpers/quick-helper.ts";
import { IMessengerListCard } from "@/const/interfaces/complex-components/custom-cards/IMessengerListCard.ts";

export default function MessengerListCard({
  chats,
  selectedChat,
  onAction,
}: IMessengerListCard) {
  return (
    <SheCard className={cs.messengerCard}>
      <div className={cs.messengerCardContent}>
        <SheInput
          placeholder="Search"
          fullWidth
          isSearch
          showClearBtn
          onDelay={(value) => {
            onAction("chatListSearch", { value });
          }}
        />
        <div className={cs.chatsList}>
          {chats.map((chat) => {
            const isSelected = chat.userId === selectedChat;
            return (
              <div
                key={chat.userId}
                className={`${cs.chatItem} ${isSelected ? cs.selectedChat : ""}`}
                onClick={() => onAction("onChatClick", chat)}
              >
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
                  <div className={cs.nameConversationBlock}>
                    <div className={cs.chatName}>
                      <span className="she-text">{chat.userName}</span>
                    </div>
                    <div className={cs.chatLastMessage}>
                      <span>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Accusamus, ad atque doloribus id magni molestiae
                        repellat veniam. Deserunt dignissimos, vel?
                      </span>
                    </div>
                  </div>
                </div>
                <div className={cs.chatTime}>
                  <span>{formatDate(chat.lastTimeUpdate, "time")}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SheCard>
  );
}
