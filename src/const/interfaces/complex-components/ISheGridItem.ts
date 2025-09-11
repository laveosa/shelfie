import React, { ComponentPropsWithRef } from "react";
import { Row, RowData } from "@tanstack/react-table";

export interface ISheGridItem extends ComponentPropsWithRef<"div"> {
  className?: string;
  row: Row<RowData>;
  loadingRows?: Set<string>;
  isDragDisabled?: boolean;
  enableDnd?: boolean;
  enableExpansion?: boolean;
  renderExpandedContent?: (
    row: any,
    expandableItem: any,
    expandableIndex: number,
  ) => React.ReactNode;
  totalColumns?: number;
}
