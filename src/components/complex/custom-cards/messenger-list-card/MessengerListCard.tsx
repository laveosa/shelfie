import React from "react";

import SheCard from "@/components/complex/she-card/SheCard.tsx";
import { IMessengerListCard } from "@/const/interfaces/complex-components/custom-cards/IMessengerListCard.ts";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";

export default function MessengerListCard({
  chats,
  selectedChat,
  onAction,
}: IMessengerListCard) {
  return (
    <SheCard
      // view={ComponentViewEnum.STANDARD}
      title="Header Title"
      showHeader
      showToggleButton
      // showCloseButton
      // footerClassName="SOME_FOOTER_CLASS_NAME"
      // footerStyle={{ border: "1px solid red" }}
      showNotificationCard
      notificationCardProps={{
        title: "Delete Purchase",
        titleTransKey: "CardTitles.DeletePurchase",
        text: "The purchase will be deleted, but the changes in stock will remain intact.",
        textTransKey: "ConfirmationMessages.DeletePurchase",
        // onClick: () => console.log("NOTIFICATION CARD:"),
      }}
      onNotificationCardButtonClick={(value) => console.log("MODEL: ", value)}
      showFooter
      showSecondaryButton
      showPrimaryButton
      // isLoading
      onSecondaryButtonClick={(event) => console.log("SECONDARY BTN: ", event)}
      onPrimaryButtonClick={(event) => console.log("PRIMARY BTN: ", event)}
    >
      <h1>Some card context</h1>
      {[1, 2, 3, 4, 5, 6, 7].map(() => (
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores
          ducimus nesciunt odit sapiente voluptas. Adipisci cum ipsa magni
          necessitatibus numquam tempora temporibus vitae? Atque culpa dolorem
          impedit quasi. Beatae, enim!
        </p>
      ))}
    </SheCard>
  );

  /*return (
    <SheCard className={cs.messengerCard} width="400px">
      <div className={cs.messengerCardContent}>
        <SheInput
          icon={Search}
          placeholder="Search"
          fullWidth
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
  );*/
}
