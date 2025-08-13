import { ColumnDef } from "@tanstack/react-table";
import placeholderImage from "@/assets/images/placeholder-image.png";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { Trash2 } from "lucide-react";

interface IProductPhotoGridColumns {
  id: number | string;
  thumbnailUrl: string;
  height: number;
  width: number;
  isActive: boolean;
  onGridAction: (identifier: string, payload: any) => void;
}

export const SupplierPhotosGridColumns = (
  onGridAction: (identifier, data) => void,
): ColumnDef<IProductPhotoGridColumns>[] => [
  {
    accessorKey: "thumbnailUrl",
    header: "Preview",
    size: 50,
    minSize: 50,
    cell: ({ row }) => {
      const photoUrl: string = row.getValue("thumbnailUrl");

      return (
        <div className="relative w-12 h-12 cursor-pointer">
          <img
            src={photoUrl}
            alt="photo"
            className="object-cover rounded-md w-full h-full"
            onError={(e) => {
              e.currentTarget.src = placeholderImage;
            }}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "format",
    header: "Format",
    size: 50,
    minSize: 50,
    cell: ({ row }) => {
      return (
        <span className="she-subtext">{`${row.original.height}px x ${row.original.width}px`}</span>
      );
    },
  },
  {
    id: "manage",
    header: "Actions",
    size: 50,
    minSize: 50,
    cell: ({ row, table }) => {
      const meta = table.options.meta as {
        setLoadingRow: (rowId: string, loading: boolean) => void;
        isRowLoading: (rowId: string) => boolean;
      };
      return (
        <div onClick={(e) => e.stopPropagation()}>
          <SheButton
            icon={Trash2}
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onGridAction("deleteSupplierPhoto", { table, row });
            }}
            disabled={meta?.isRowLoading(row.id)}
            style={{ marginLeft: "10px" }}
          />
        </div>
      );
    },
  },
];
