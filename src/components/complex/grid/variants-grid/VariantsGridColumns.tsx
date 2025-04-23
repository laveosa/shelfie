import { ColumnDef } from "@tanstack/react-table";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import ProductsGridColumnActions from "@/components/complex/grid/products-grid/ProductsGridColumnActions.tsx";
import { ImageModel } from "@/const/models/ImageModel.ts";
import placeholderImage from "@/assets/images/placeholder-image.png";
import { CategoryModel } from "@/const/models/CategoryModel.ts";

export function variantsGridColumns(onAction: any): ColumnDef<any>[] {
  return [
    {
      accessorKey: "variantId",
      header: "ID",
    },
    {
      accessorKey: "photo",
      header: "Image",
      cell: ({ row, table }) => {
        console.log(row.getValue("photo"));
        const image: ImageModel = row.getValue("photo");
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
              src={image?.thumbnailUrl || placeholderImage}
              alt={row.getValue("variantName")}
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
      accessorKey: "variantCode",
      header: "Code",
    },
    {
      accessorKey: "variantName",
      header: "Product Name",
    },
    {
      accessorKey: "productCategory",
      header: "Category",
      cell: ({ row }) => {
        const category: CategoryModel = row.getValue("productCategory");
        return <span>{category?.categoryName || "N/A"}</span>;
      },
    },
    {
      accessorKey: "traitOptions",
      header: "Details",
      cell: ({ row }) => {
        const colorOption = row.original.traitOptions.find(
          (option) => option.traitTypeId === 2,
        );
        const sizeOption = row.original.traitOptions.find(
          (option) => option.traitTypeId === 1,
        );

        const color = colorOption ? colorOption.optionColor : null;
        const size = sizeOption ? sizeOption.optionName : null;

        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {color && (
              <div
                style={{
                  background: color,
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                }}
              />
            )}
            {size && <span>{size}</span>}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return (
          <div
            style={{
              border: "1px solid #38BF5E",
              borderRadius: "8px",
              background: "#EBF9EF",
              textAlign: "center",
            }}
          >
            <span
              style={{
                color: "#38BF5E",
              }}
            >
              {row.getValue("status")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "salePrice",
      header: "Price",
      cell: ({ row }) => {
        const price = row.getValue("salePrice");
        return <span>{price ? `${price}zł` : "N/A"}</span>;
      },
    },
    {
      accessorKey: "stockAmount",
      header: "In Stock",
      cell: ({ row }) => {
        return <span>{`${row.getValue("stockAmount")} units`}</span>;
      },
    },
    // {
    //   accessorKey: "isActive",
    //   header: "Active",
    //   cell: ({ row, table }) => {
    //     const meta = table.options.meta as {
    //       setLoadingRow: (rowId: string, loading: boolean) => void;
    //       isRowLoading: (rowId: string) => boolean;
    //     };
    //
    //     return (
    //       <Switch
    //         disabled={meta?.isRowLoading(row.id)}
    //         checked={row.getValue("active")}
    //         onCheckedChange={() =>
    //           onAction("activateVariant", row.id, undefined, row.original)
    //         }
    //       />
    //     );
    //   },
    // },
    {
      id: "manage",
      header: "",
      cell: ({ row, table }) => {
        const meta = table.options.meta as {
          setLoadingRow: (rowId: string, loading: boolean) => void;
          isRowLoading: (rowId: string) => boolean;
        };

        const handleManageClick = (e) => {
          e.stopPropagation();
          e.preventDefault();
          onAction("manageVariant", row.id, meta?.setLoadingRow, row.original);
        };

        return (
          <div onClick={(e) => e.stopPropagation()}>
            <SheButton
              onClick={handleManageClick}
              disabled={meta?.isRowLoading(row.id)}
            >
              Manage
            </SheButton>
          </div>
        );
      },
    },
    {
      id: "rowActions",
      header: "",
      cell: ({ row, table }) => {
        return (
          <ProductsGridColumnActions
            row={row}
            onAction={onAction}
            table={table}
          />
        );
      },
    },
  ];
}
