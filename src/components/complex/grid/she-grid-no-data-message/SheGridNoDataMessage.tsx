import React, { JSX } from "react";

import cs from "./SheGridNoDataMessage.module.scss";
import { TableBody, TableCell, TableRow } from "@/components/ui/table.tsx";
import { ISheGridNoDataMessage } from "@/const/interfaces/complex-components/ISheGridNoDataMessage.ts";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";

export default function SheGridNoDataMessage({
  items,
  isLoading,
  totalColumns,
  customMessage = "NO DATA TO DISPLAY",
  customMessageTransKey,
}: ISheGridNoDataMessage): JSX.Element {
  const { translate } = useAppTranslation();

  // ==================================================================== LAYOUT
  if (isLoading || (items && items.length > 0)) {
    return null;
  }

  return (
    <TableBody className={cs.sheGridNoDataMessage}>
      <TableRow>
        <TableCell
          colSpan={totalColumns}
          className={cs.sheGridNoDataMessageWrapper}
        >
          <span>{translate(customMessageTransKey, {}, customMessage)}</span>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
