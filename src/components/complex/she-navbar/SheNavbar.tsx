import { useState, KeyboardEvent, useCallback } from "react";
import { AvatarImage } from "@radix-ui/react-avatar";
import { BellDot, Search } from "lucide-react";
import debounce from "lodash/debounce";

import cs from "./SheNavbar.module.scss";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast.ts";
import { useNavigate } from "react-router-dom";

export default function SheNavbar() {
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (!query.trim()) return;

      try {
        setIsSearching(true);
        // Add your search logic here
        console.log("Searching for:", query);
      } catch (error) {
        console.error("Search failed:", error);
        toast({
          variant: "destructive",
          title: "Search failed",
          description: "Please try again later",
        });
      } finally {
        setIsSearching(false);
      }
    }, 500),
    [toast],
  );

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      debouncedSearch(searchValue);
    }
  }

  function handleBlur() {
    if (searchValue.trim()) {
      debouncedSearch(searchValue);
    }
  }

  function handleBellClick() {}

  function handleUserAvatarClick() {
    navigate("/profile");
  }

  return (
    <div className={cs.SheNavbar}>
      <SidebarTrigger className={cs.SidebarTrigger} />
      <div className={cs.SearchWrapper}>
        <Search className={cs.SearchIcon} />
        <Input
          className={cs.SearchInput}
          type="search"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          disabled={isSearching}
        />
      </div>
      <BellDot className={cs.BellIcon} onClick={handleBellClick} />
      <Avatar className={cs.UserAvatar} onClick={handleUserAvatarClick}>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      </Avatar>
    </div>
  );
}
