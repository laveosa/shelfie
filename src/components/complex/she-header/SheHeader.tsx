import { useState, KeyboardEvent } from "react";
import { AvatarImage } from "@radix-ui/react-avatar";
import { BellDot, Search } from "lucide-react";

import cs from "./SheHeader.module.scss";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

export default function SheHeader() {
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    setIsSearching(true);
    if (event.key === "Enter") {
      event.preventDefault();
      console.log(searchValue);
      // API call for search
      setSearchValue("");
    }
    setIsSearching(false);
  }

  function handleBlur() {
    setIsSearching(true);
    if (searchValue.trim()) {
      console.log(searchValue);
      // API call for search
    }
    setSearchValue("");
    setIsSearching(false);
  }

  function handleBellClick() {}

  function handleUserAvatarClick() {
    navigate("/profile");
  }

  return (
    <div className={cs.sheHeader}>
      <SidebarTrigger className={cs.sidebarTrigger} />
      <div className={cs.searchWrapper}>
        <Search className={cs.searchIcon} />
        <Input
          className={cs.searchInput}
          type="search"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          disabled={isSearching}
        />
      </div>
      <BellDot className={cs.bellIcon} onClick={handleBellClick} />
      <Avatar className={cs.userAvatar} onClick={handleUserAvatarClick}>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      </Avatar>
    </div>
  );
}
