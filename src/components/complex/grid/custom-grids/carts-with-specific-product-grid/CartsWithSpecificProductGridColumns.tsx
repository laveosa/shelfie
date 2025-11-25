import { Circle, CircleCheckBig } from "lucide-react";
import { ColumnDef, Row } from "@tanstack/react-table";
import React from "react";

import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import cs from "./CartsWithSpecificProductGridColumns.module.scss";
import CustomerInfoLayout from "@/components/layouts/customer-info-layout/CustomerInfoLayout.tsx";

export const CartsWithSpecificProductGridColumns = (
  onAction: (actionType: string, row?: Row<any>) => void,
): ColumnDef<any>[] => [
  {
    id: "select",
    minSize: 70,
    maxSize: 70,
    cell: ({ row }) => {
      return (
        <div onClick={(e) => e.stopPropagation()}>
          <SheButton
            className={row.original.isSelected === true ? cs.iconCheck : ""}
            icon={row.original.isSelected === true ? CircleCheckBig : Circle}
            variant="ghost"
            onClick={() =>
              onAction("selectCartWithSpecificProduct", row.original)
            }
          />
        </div>
      );
    },
  },
  {
    accessorKey: "unitsAmount",
    header: "Units",
    minSize: 60,
    maxSize: 60,
    cell: ({ row }) => {
      return <span className="she-text">{row.original.unitsAmount}</span>;
    },
  },
  {
    accessorKey: "user",
    header: "User",
    minSize: 90,
    cell: ({ row }) => {
      return <CustomerInfoLayout customer={row.original.customer} />;
    },
  },
];
