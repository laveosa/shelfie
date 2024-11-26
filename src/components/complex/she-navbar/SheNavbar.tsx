import { AvatarImage } from "@radix-ui/react-avatar";
import { BellDot, Search } from "lucide-react";

import cs from "./SheNavbar.module.scss";
import { SidebarTrigger } from "@/components/ui/sidebar.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Avatar } from "@/components/ui/avatar.tsx";

export default function SheNavbar() {
  return (
    <div className={cs.SheNavbar}>
      <SidebarTrigger className={cs.SidebarTrigger} />
      <div className={cs.SearchWrapper}>
        <Search className={cs.SearchIcon} />
        <Input className={cs.SearchInput} type="search" placeholder="Search" />
      </div>
      <BellDot style={{ color: "gray", margin: "10px" }} />
      <Avatar
        style={{
          width: "30px",
          height: "30px",
          marginTop: "5px",
          borderRadius: "10px",
        }}
      >
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      </Avatar>
    </div>
  );
}
