import React, { useEffect, useRef, useState } from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheList from "@/components/primitive/she-list/SheList.tsx";
import { Box } from "lucide-react";

export function DashboardPage() {
  const service = useDashboardPageService();

  const searchRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState<string>("TEST");

  useEffect(() => {
    setTimeout(() => searchRef.current.focus());

    setTimeout(() => {
      searchRef.current.value = "some value";
    }, 2000);

    setTimeout(() => {
      setSearchValue("bla bla some text in search state change!!!");
    }, 3000);
  }, []);

  // ================================================================== EVENT

  // ================================================================== LAYOUT

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>

      <br />

      <SheList
        headerClassName="SOME-HEADER-CLASS-NAME"
        headerStyle={{
          border: "1px solid red",
        }}
        searchClassName="SEARCH-CLASS-NAME"
        searchStyle={{
          backgroundColor: "lightgray",
        }}
        searchRef={searchRef}
        searchValue={searchValue}
        searchPlaceholder="some text to type..."
        searchPlaceholderTransKey="sf909fj0je"
        clearBtnIcon={Box}
        hideSearchClearBtn
        showHeader
        showFooter
        onSearch={(event) => console.log("onSearch: ", event)}
      />

      <br />
    </div>
  );
}
