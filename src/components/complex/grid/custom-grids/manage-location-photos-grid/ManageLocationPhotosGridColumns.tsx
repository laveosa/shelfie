import { ColumnDef, Row } from "@tanstack/react-table";
import { ImageIcon, Trash2 } from "lucide-react";

import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";

export function ManageLocationPhotosGridColumns({
  onAction,
}: {
  onAction: (actionType: string, row?: Row<any>) => void;
}): ColumnDef<any>[] {
  return [
    {
      accessorKey: "thumbnailUrl",
      header: "Preview",
      minSize: 80,
      maxSize: 80,
      cell: ({ row }) => {
        const photoUrl: string = row.getValue("thumbnailUrl");

        return (
          <div
            className="relative w-12 h-12 cursor-pointer"
            onClick={() => onAction("image", row)}
          >
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={"Company"}
                className="object-cover rounded-md w-full h-full"
                style={{ width: "48px", height: "48px" }}
              />
            ) : (
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SheIcon icon={ImageIcon} maxWidth="30px" />
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "format",
      header: "Format",
      minSize: 190,
      cell: ({ row }) => {
        return (
          <span className="she-subtext">{`${row.original.height}px x ${row.original.width}px`}</span>
        );
      },
    },
    {
      id: "rowActions",
      header: "Actions",
      minSize: 80,
      maxSize: 80,
      cell: ({ row }) => {
        return (
          <SheButton
            icon={Trash2}
            variant="secondary"
            onClick={() => onAction("deleteLocationPhoto", row.original)}
          />
        );
      },
    },
  ];
}
