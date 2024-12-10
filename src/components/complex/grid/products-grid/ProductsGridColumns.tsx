import { ColumnDef } from "@tanstack/react-table";

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

export const productsGridColumns: ColumnDef<Products>[] = [
  {
    accessorKey: "id",
    header: "ID",
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
