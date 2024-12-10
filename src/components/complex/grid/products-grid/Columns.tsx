import { ColumnDef } from "@tanstack/react-table";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { ArrowUpDown } from "lucide-react";

export type Products = {
  id: any;
  imageUrl: string;
  code: number;
  productName: string;
  category: string;
  brand: string;
  barcode: number;
  status: string;
  salePrice: number;
  variantCount: number;
  stock: boolean;
};

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <SheButton
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </SheButton>
      );
    },
  },
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.getValue("imageUrl") as string;
      return (
        <div className="relative w-12 h-12">
          <img
            src={imageUrl}
            alt={row.getValue("productName")}
            className="object-cover rounded-md w-full h-full"
            onError={(e) => {
              e.currentTarget.src =
                "https://ircsan.com/wp-content/uploads/2024/03/placeholder-image.png";
            }}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "productName",
    header: "Product Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "barcode",
    header: "Barcode",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "salePrice",
    header: "Sale Price",
  },
  {
    accessorKey: "variantCount",
    header: "Variant Count",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
];
