import cs from "./CreateProductPage.module.scss";
import useCreateProductPageService from "@/pages/products-section/create-product-page/useCreateProductPageService.ts";

export function CreateProductPage() {
  const service = useCreateProductPageService();
  return <div className={cs.CreateProductPage}>Create Product</div>;
}
