import { Row } from "@tanstack/react-table";
import placeholderImage from "@/assets/images/placeholder-image.png";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { Plus } from "lucide-react";

interface IOtherProductPhotoGridColumns {
  id: number | string;
  thumbnailUrl: string;
  height: number;
  width: number;
  isActive: boolean;
  onAction: (
    actionType: string,
    rowId?: string,
    setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: Row<IOtherProductPhotoGridColumns>,
  ) => void;
}

// function onAction(
//   actionType: string,
//   rowId?: string,
//   setLoadingRow?: (rowId: string, loading: boolean) => void,
//   row?: any,
// ) {
//   setLoadingRow(rowId, true);
//   switch (actionType) {
//     case "image":
//       console.log(`Image row ${rowId}`);
//       break;
//     case "manage":
//       console.log(`Managing row ${rowId}`);
//       break;
//     case "active":
//       console.log(`Active row ${rowId}`);
//       break;
//     case "edit":
//       console.log(`Editing row ${rowId}`);
//       break;
//     case "copy":
//       console.log(`Copying row ${rowId}`);
//       break;
//     case "favorite":
//       console.log(`Favoriting row ${rowId}`);
//       break;
//     case "delete":
//       console.log(`Deleting:`, row.original);
//       break;
//   }
//   setLoadingRow(rowId, false);
// }

export const OtherProductPhotosGridColumns = (
  onAction: (
    actionType: string,
    rowId?: string,
    setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: Row<IOtherProductPhotoGridColumns>,
  ) => void,
) => [
  {
    accessorKey: "thumbnailUrl",
    header: "Preview",
    minSize: 80,
    maxSize: 80,
    cell: ({ row, table }) => {
      const photoUrl: string = row.getValue("thumbnailUrl");
      const meta = table.options.meta as {
        setLoadingRow: (rowId: string, loading: boolean) => void;
        isRowLoading: (rowId: string) => boolean;
      };

      return (
        <div
          className="relative w-12 h-12 cursor-pointer"
          onClick={() => onAction("image", row.id, meta?.setLoadingRow)}
        >
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
    minSize: 235,
    maxSize: 235,
    cell: ({ row }) => {
      return (
        <span className="she-subtext">{`${row.original.height}px x ${row.original.width}px`}</span>
      );
    },
  },
  {
    id: "rowActions",
    header: "",
    minSize: 60,
    maxSize: 60,
    cell: ({ row }) => {
      return (
        <SheButton
          icon={Plus}
          variant="secondary"
          onClick={() => onAction("addToVariant", row.id, undefined, row)}
        />
      );
    },
  },
];
