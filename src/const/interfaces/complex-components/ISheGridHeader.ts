import React, { PropsWithChildren } from "react";

import { RowData, Table } from "@tanstack/react-table";

export interface ISheGridHeader extends PropsWithChildren {
  gridHeaderClassName?: string;
  gridHeaderStyle?: React.CSSProperties;
  table?: Table<RowData>;
  showHeader?: boolean;
  isLoading?: boolean;
}
