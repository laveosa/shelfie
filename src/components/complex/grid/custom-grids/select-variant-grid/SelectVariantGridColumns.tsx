import { Circle, CircleCheckBig } from "lucide-react";
import { ColumnDef, Row } from "@tanstack/react-table";
import React from "react";

import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import cs from "./SelectVariantGridColumns.module.scss";

export const SelectVariantGridColumns = (
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
            onClick={() => onAction("selectMargin", row.original)}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "traitOptions",
    header: "Traits",
    minSize: 100,
    cell: ({ row }) => {
      const traitOptions = row.original?.traitOptions || [];
      const colorOptions = traitOptions.filter(
        (option) => option.traitTypeId === 2 && option.optionColor,
      );
      const sizeOptions = traitOptions.filter(
        (option) => option.traitTypeId === 1 && option.optionName,
      );
      return (
        <div className={cs.variantDetailsBlock}>
          <div className={cs.variantTraitsBlock}>
            <div className={cs.variantTraits}>
              {colorOptions?.map((colorOpt, index) => (
                <div
                  className={cs.colorOptions}
                  key={`color-${index}`}
                  style={{
                    background: colorOpt.optionColor,
                  }}
                />
              ))}
              {sizeOptions?.map((sizeOpt, index) => (
                <span key={`size-${index}`} className="she-text">
                  {sizeOpt.optionName}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
    minSize: 80,
    maxSize: 80,
    cell: ({ row }) => {
      return <span className="she-text">{row.original.stockAmount}</span>;
    },
  },
];
