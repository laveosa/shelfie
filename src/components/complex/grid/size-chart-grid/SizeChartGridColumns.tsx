import { ColumnDef } from "@tanstack/react-table";
import { GripVertical } from "lucide-react";
import { SizeChartModel } from "@/const/models/SizeChartModel.ts";
import React from "react";

export const SizeChartGridColumns = (
  handleInputChange: (id: number, key: string, value: string) => void,
): ColumnDef<SizeChartModel>[] => [
  {
    accessorKey: "id",
    header: "",
    cell: () => {
      return (
        <div>
          <GripVertical />
        </div>
      );
    },
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => {
      return <div>{row.getValue("size")}</div>;
    },
  },
  {
    accessorKey: "chest",
    header: "Chest",
    cell: ({ row }) => {
      const chest = row.getValue("chest") as string; // Type assertion
      return (
        <input
          type="text"
          defaultValue={`${chest}cm`} // Use defaultValue
          onBlur={(e) =>
            handleInputChange(row.original.id, "chest", e.target.value)
          } // Update on blur
        />
      );
    },
  },
  {
    accessorKey: "waist",
    header: "Waist",
    cell: ({ row }) => {
      const waist = row.getValue("waist") as string; // Type assertion
      return (
        <input
          type="text"
          defaultValue={`${waist}cm`} // Use defaultValue
          onBlur={(e) =>
            handleInputChange(row.original.id, "waist", e.target.value)
          } // Update on blur
        />
      );
    },
  },
  {
    accessorKey: "sleeve",
    header: "Sleeve",
    cell: ({ row }) => {
      const sleeve = row.getValue("sleeve") as string; // Type assertion
      return (
        <input
          type="text"
          defaultValue={`${sleeve}cm`} // Use defaultValue
          onBlur={(e) =>
            handleInputChange(row.original.id, "sleeve", e.target.value)
          } // Update on blur
        />
      );
    },
  },
];
