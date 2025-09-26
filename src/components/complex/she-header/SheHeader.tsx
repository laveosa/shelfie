import { KeyboardEvent, useEffect, useRef, useState } from "react";
import _ from "lodash";

import cs from "./SheHeader.module.scss";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { SheUserMenu } from "@/components/complex/she-user-menu/SheUserMenu.tsx";
import StorageService from "@/utils/services/StorageService.ts";
import { ISheHeader } from "@/const/interfaces/complex-components/ISheHeader.ts";

export default function SheHeader({ user, isUserMenuLoading }: ISheHeader) {
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [_isMinimized, setIsMinimized] = useState<boolean>(null);
  const { open, setOpen } = useSidebar();

  const isMinimizedStorageKey = "isMinimizedSheHeaderStorageKey";
  const clickEventRef = useRef<any>(null);

  useEffect(() => {
    isAnimationActive(false);

    const isMinimizedStorageValue: boolean = StorageService.getLocalStorage(
      isMinimizedStorageKey,
    );

    if (
      !_.isNil(isMinimizedStorageValue) &&
      isMinimizedStorageValue !== _isMinimized
    ) {
      setIsMinimized(isMinimizedStorageValue);
      setOpen(isMinimizedStorageValue);
    }

    setTimeout(() => {
      isAnimationActive(true);
    }, 100);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (!clickEventRef.current) return;
      clickEventRef.current = false;

      if (_isMinimized !== open) {
        setIsMinimized(open);
        StorageService.setLocalStorage(isMinimizedStorageKey, open);
      }
    });
  }, [open]);

  function onSidebarTriggerHandler(event) {
    clickEventRef.current = event;
  }

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

  function isAnimationActive(value: boolean) {
    const element = document.querySelector("#ShelfieAppWrapper");
    if (element)
      value
        ? element.classList.remove("noAnimation")
        : element.classList.add("noAnimation");
  }

  return (
    <div className={`${cs.sheHeader}`}>
      <SidebarTrigger
        className={`${cs.sidebarTrigger}`}
        onClick={onSidebarTriggerHandler}
      />
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
