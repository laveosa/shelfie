import React, { useEffect, useState } from "react";

import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheInputEditor from "@/components/primitive/she-input-editor/SheInputEditor.tsx";
import { Box } from "lucide-react";

export function DashboardPage() {
  const service = useDashboardPageService();

  const [_textValue, setTextValue] = useState<string | number>(null);

  useEffect(() => {
    setTimeout(() => {
      setTextValue("some text for test 111");
    }, 2000);
  }, []);

  // ================================================================== EVENT

  // ================================================================== LAYOUT

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>

      <br />

      <SheInputEditor
        label="Input Editor"
        icon={Box}
        onChange={(event) => console.log("onChange: ", event)}
        onToggleManage={(event) => console.log("onManage: ", event)}
        onSave={(event) => console.log("onSave: ", event)}
        onCancel={(event) => console.log("onCancel: ", event)}
      />

      <br />
    </div>
  );
}
