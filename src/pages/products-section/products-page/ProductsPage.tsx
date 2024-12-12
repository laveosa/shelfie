import cs from "./ProductsPage.module.scss";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { useEffect } from "react";

export function ProductsPage() {
  const service = useProductsPageService();

  useEffect(() => {
    // service.getAllProductsHandler();
    Promise.all([service.getAllProductsHandler()]).then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div id={cs.ProductsPage}>
      <h1>Products Page</h1>
      {service.isLoading && <div>isLoading...</div>}
      {service.products && (
        <div>
          {service.products.map((product) => (
            <div key={product.id} className="flex gap-5">
              <span>{product.title}</span>
              <button onClick={() => service.manageProductHandler(product)}>
                Manage
              </button>
              <button onClick={() => service.deleteProductHandler(product.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
