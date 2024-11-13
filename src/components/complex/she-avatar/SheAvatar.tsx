import cs from "./SheAvatar.module.scss";
import { Avatar } from "@/components/ui/avatar.tsx";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function SheAvatar() {
  return (
    <Avatar className={cs.SheAvatar}>
      <AvatarImage src="" />
      <AvatarFallback></AvatarFallback>
    </Avatar>
  );
}
