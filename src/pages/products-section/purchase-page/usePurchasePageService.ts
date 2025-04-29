import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";

export default function usePurchasePageService() {
  const [getCountersForProducts] =
    ProductsApiHooks.useLazyGetCountersForProductsQuery();

  function getCountersForProductsHandler(id: any) {
    return getCountersForProducts(id).then((res: any) => {
      return res.data;
    });
  }

  return {
    getCountersForProductsHandler,
  };
}
