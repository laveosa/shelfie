import cs from "./ProductsPage.module.scss";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";

export function ProductsPage() {
  const service = useProductsPageService();

  return <div id={cs.ProductsPage}>Products Page</div>;
}
