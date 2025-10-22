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
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";

export default function MessengerConversationCard({
  chat,
  onAction,
  onReceiveConversation,
}: IMessengerConversationCard) {
  // const [messages, setMessages] = useState<any[]>([]);

  const messages = [
    {
      id: 1,
      senderId: chat.userId,
      receiverId: 456,
      text: "Hey, how are you? Hey, how are you?Hey, how are you?Hey, how are you?Hey, how are you?Hey, how are you?Hey, how are you?Hey, how are you?Hey, how are you?Hey, how are you?Hey, how are you?Hey, how are you?Hey, how are you?Hey, how are you?Hey, how are you?Hey, how are you?Hey, how are you?Hey, how are you?Hey, how are you?Hey, how are you?Hey, how are you?Hey, how are you?Hey, how are you?Hey, how are you?Hey, how are you?Hey, how are you?",
      timestamp: "2025-04-28T08:00:00Z",
      isRead: true,
    },
    {
      id: 2,
      senderId: 456,
      receiverId: chat.userId,
      text: "Good, just woke up. You?",
      timestamp: "2025-04-28T08:01:00Z",
      isRead: true,
    },
    {
      id: 3,
      senderId: chat.userId,
      receiverId: 456,
      text: "Same here, planning my day.",
      timestamp: "2025-04-28T08:02:00Z",
      isRead: true,
    },
    {
      id: 4,
      senderId: 456,
      receiverId: chat.userId,
      text: "Busy schedule?",
      timestamp: "2025-04-28T08:03:00Z",
      isRead: true,
    },
    {
      id: 5,
      senderId: chat.userId,
      receiverId: 456,
      text: "Yeah, a lot of meetings.",
      timestamp: "2025-04-28T08:04:00Z",
      isRead: true,
    },
    {
      id: 6,
      senderId: 456,
      receiverId: chat.userId,
      text: "Same here. Mondays are crazy.",
      timestamp: "2025-04-28T08:05:00Z",
      isRead: true,
    },
    {
      id: 7,
      senderId: chat.userId,
      receiverId: 456,
      text: "Tell me about it.",
      timestamp: "2025-04-28T08:06:00Z",
      isRead: true,
    },
    {
      id: 8,
      senderId: 456,
      receiverId: chat.userId,
      text: "Coffee helps though!",
      timestamp: "2025-04-28T08:07:00Z",
      isRead: true,
    },
    {
      id: 9,
      senderId: chat.userId,
      receiverId: 456,
      text: "Definitely. Already had two cups.",
      timestamp: "2025-04-28T08:08:00Z",
      isRead: true,
    },
    {
      id: 10,
      senderId: 456,
      receiverId: chat.userId,
      text: "Haha same!",
      timestamp: "2025-04-28T08:09:00Z",
      isRead: true,
    },
    {
      id: 11,
      senderId: chat.userId,
      receiverId: 456,
      text: "Plans for today?",
      timestamp: "2025-04-28T08:10:00Z",
      isRead: true,
    },
    {
      id: 12,
      senderId: 456,
      receiverId: chat.userId,
      text: "Meetings till noon, then project work.",
      timestamp: "2025-04-28T08:11:00Z",
      isRead: true,
    },
    {
      id: 13,
      senderId: chat.userId,
      receiverId: 456,
      text: "Nice. Hope it goes smooth!",
      timestamp: "2025-04-28T08:12:00Z",
      isRead: true,
    },
    {
      id: 14,
      senderId: 456,
      receiverId: chat.userId,
      text: "Thanks! You too!",
      timestamp: "2025-04-28T08:13:00Z",
      isRead: true,
    },
    {
      id: 15,
      senderId: chat.userId,
      receiverId: 456,
      text: "Need to prep slides first.",
      timestamp: "2025-04-28T08:14:00Z",
      isRead: true,
    },
    {
      id: 16,
      senderId: 456,
      receiverId: chat.userId,
      text: "Good luck!",
      timestamp: "2025-04-28T08:15:00Z",
      isRead: true,
    },
    {
      id: 17,
      senderId: chat.userId,
      receiverId: 456,
      text: "Thanks, appreciate it.",
      timestamp: "2025-04-28T08:16:00Z",
      isRead: true,
    },
    {
      id: 18,
      senderId: 456,
      receiverId: chat.userId,
      text: "Let's catch up later?",
      timestamp: "2025-04-28T08:17:00Z",
      isRead: true,
    },
    {
      id: 19,
      senderId: chat.userId,
      receiverId: 456,
      text: "Sure, after lunch maybe?",
      timestamp: "2025-04-28T08:18:00Z",
      isRead: true,
    },
    {
      id: 20,
      senderId: 456,
      receiverId: chat.userId,
      text: "Perfect!",
      timestamp: "2025-04-28T08:19:00Z",
      isRead: true,
    },
    {
      id: 21,
      senderId: chat.userId,
      receiverId: 456,
      text: "BTW, did you see the new designs?",
      timestamp: "2025-04-28T08:20:00Z",
      isRead: true,
    },
    {
      id: 22,
      senderId: 456,
      receiverId: chat.userId,
      text: "Not yet, planning to today.",
      timestamp: "2025-04-28T08:21:00Z",
      isRead: true,
    },
    {
      id: 23,
      senderId: chat.userId,
      receiverId: 456,
      text: "They're amazing, you're gonna love them.",
      timestamp: "2025-04-28T08:22:00Z",
      isRead: true,
    },
    {
      id: 24,
      senderId: 456,
      receiverId: chat.userId,
      text: "Can't wait!",
      timestamp: "2025-04-28T08:23:00Z",
      isRead: true,
    },
    {
      id: 25,
      senderId: chat.userId,
      receiverId: 456,
      text: "Sent you the link on Slack.",
      timestamp: "2025-04-28T08:24:00Z",
      isRead: true,
    },
    {
      id: 26,
      senderId: 456,
      receiverId: chat.userId,
      text: "Got it, thanks!",
      timestamp: "2025-04-28T08:25:00Z",
      isRead: true,
    },
    {
      id: 27,
      senderId: chat.userId,
      receiverId: 456,
      text: "Np :)",
      timestamp: "2025-04-28T08:26:00Z",
      isRead: true,
    },
    {
      id: 28,
      senderId: 456,
      receiverId: chat.userId,
      text: "Gotta go into a call now.",
      timestamp: "2025-04-28T08:27:00Z",
      isRead: true,
    },
    {
      id: 29,
      senderId: chat.userId,
      receiverId: 456,
      text: "Good luck!",
      timestamp: "2025-04-28T08:28:00Z",
      isRead: true,
    },
    {
      id: 30,
      senderId: 456,
      receiverId: chat.userId,
      text: "Thanks, talk later!",
      timestamp: "2025-04-28T08:29:00Z",
      isRead: true,
    },
    {
      id: 31,
      senderId: chat.userId,
      receiverId: 456,
      text: "Ping me if you need anything.",
      timestamp: "2025-04-28T08:30:00Z",
      isRead: true,
    },
    {
      id: 32,
      senderId: 456,
      receiverId: chat.userId,
      text: "Will do!",
      timestamp: "2025-04-28T08:31:00Z",
      isRead: true,
    },
    {
      id: 33,
      senderId: chat.userId,
      receiverId: 456,
      text: "Cool!",
      timestamp: "2025-04-28T08:32:00Z",
      isRead: true,
    },
    {
      id: 34,
      senderId: 456,
      receiverId: chat.userId,
      text: "Heading out for lunch soon.",
      timestamp: "2025-04-28T11:00:00Z",
      isRead: true,
    },
    {
      id: 35,
      senderId: chat.userId,
      receiverId: 456,
      text: "Enjoy!",
      timestamp: "2025-04-28T11:01:00Z",
      isRead: true,
    },
    {
      id: 36,
      senderId: 456,
      receiverId: chat.userId,
      text: "Thanks, you too.",
      timestamp: "2025-04-28T11:02:00Z",
      isRead: true,
    },
    {
      id: 37,
      senderId: chat.userId,
      receiverId: 456,
      text: "Will do.",
      timestamp: "2025-04-28T11:03:00Z",
      isRead: true,
    },
    {
      id: 38,
      senderId: 456,
      receiverId: chat.userId,
      text: "Back from lunch!",
      timestamp: "2025-04-28T12:00:00Z",
      isRead: true,
    },
    {
      id: 39,
      senderId: chat.userId,
      receiverId: 456,
      text: "Nice, how was it?",
      timestamp: "2025-04-28T12:01:00Z",
      isRead: true,
    },
    {
      id: 40,
      senderId: 456,
      receiverId: chat.userId,
      text: "Delicious 😋",
      timestamp: "2025-04-28T12:02:00Z",
      isRead: true,
    },
    {
      id: 41,
      senderId: chat.userId,
      receiverId: 456,
      text: "Now sleepy? :D",
      timestamp: "2025-04-28T12:03:00Z",
      isRead: true,
    },
    {
      id: 42,
      senderId: 456,
      receiverId: chat.userId,
      text: "A little 😅",
      timestamp: "2025-04-28T12:04:00Z",
      isRead: true,
    },
    {
      id: 43,
      senderId: chat.userId,
      receiverId: 456,
      text: "Hang in there!",
      timestamp: "2025-04-28T12:05:00Z",
      isRead: true,
    },
    {
      id: 44,
      senderId: 456,
      receiverId: chat.userId,
      text: "Trying my best!",
      timestamp: "2025-04-28T12:06:00Z",
      isRead: true,
    },
    {
      id: 45,
      senderId: chat.userId,
      receiverId: 456,
      text: "Almost done for today.",
      timestamp: "2025-04-28T16:00:00Z",
      isRead: true,
    },
    {
      id: 46,
      senderId: 456,
      receiverId: chat.userId,
      text: "Yes, finally.",
      timestamp: "2025-04-28T16:01:00Z",
      isRead: true,
    },
    {
      id: 47,
      senderId: chat.userId,
      receiverId: 456,
      text: "Any evening plans?",
      timestamp: "2025-04-28T16:02:00Z",
      isRead: true,
    },
    {
      id: 48,
      senderId: 456,
      receiverId: chat.userId,
      text: "Just relaxing, watching TV.",
      timestamp: "2025-04-28T16:03:00Z",
      isRead: true,
    },
    {
      id: 49,
      senderId: chat.userId,
      receiverId: 456,
      text: "Sounds good!",
      timestamp: "2025-04-28T16:04:00Z",
      isRead: true,
    },
    {
      id: 50,
      senderId: 456,
      receiverId: chat.userId,
      text: "Yep, much needed.",
      timestamp: "2025-04-28T16:05:00Z",
      isRead: true,
    },
  ];

  function onReceiveMessages(conversationId: string) {
    onReceiveConversation(conversationId)
      .then((res) => {
        console.log("CHAT", chat);
        console.log("Messages", res);
        // setMessages(res);
      })
      .catch((error) => {
        console.error("Failed to fetch messages:", error);
      });
  }

  // useEffect(() => {
  //   if (chat?.conversationId) {
  //     onReceiveMessages(chat.conversationId);
  //   }
  // }, [chat?.conversationId]);

  return (
    <SheCard
      className={cs.messengerConversationCard}
      width="450px"
      showFooter
      showPrimaryButton
      primaryButtonTitle="Send"
      showSecondaryButton
      secondaryButtonTitle="Close"
      view={ComponentViewEnum.CARD}
      onPrimaryButtonClick={() => onAction("sendMessage")}
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
        <div className={cs.conversationItems}>
          {messages?.map((message) => (
            <div key={message.id} className={cs.conversationItem}>
              {message.senderId != chat.userId ? (
                <div key={message.id} className={cs.conversationItemFromMe}>
                  <span>{message.text}</span>
                </div>
              ) : (
                <>
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
                  </div>
                  <div key={message.id} className={cs.conversationItemToMe}>
                    <span>{message.text}</span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        <div>
          <SheTextArea fullWidth rows={2} />
        </div>
      </div>
    </SheCard>
  );
}
