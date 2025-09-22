import { KeyboardEvent, useState } from "react";

import cs from "./SheHeader.module.scss";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SheUserMenu } from "@/components/complex/she-user-menu/SheUserMenu.tsx";
import { ISheHeader } from "@/const/interfaces/complex-components/ISheHeader.ts";

export default function SheHeader({ user, isUserMenuLoading }: ISheHeader) {
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    setIsSearching(true);
    if (event.key === "Enter") {
      event.preventDefault();
      console.log(searchValue);
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

  return (
    <div className={cs.sheHeader}>
      <SidebarTrigger className={cs.sidebarTrigger} />
      <div className={cs.searchWrapper}>
        {/*<Search className={cs.searchIcon} />*/}
        {/*<Input*/}
        {/*  className={cs.searchInput}*/}
        {/*  type="search"*/}
        {/*  placeholder="Search"*/}
        {/*  value={searchValue}*/}
        {/*  onChange={(e) => setSearchValue(e.target.value)}*/}
        {/*  onKeyDown={handleKeyDown}*/}
        {/*  onBlur={handleBlur}*/}
        {/*  disabled={isSearching}*/}
        {/*/>*/}
      </div>
      <SheUserMenu isLoading={isUserMenuLoading} user={user} />
    </div>
  );
}
