import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { DictionaryApiHooks } from "@/utils/services/api/DictionaryApiService.ts";

export default function useManageVariantsPageService() {
  const [getVariantsForGrid] = ProductsApiHooks.useGetVariantsForGridMutation();
  const [getListOfAllTraits] =
    ProductsApiHooks.useLazyGetListOfAllTraitsQuery();
  const [getCountersForProducts] =
    ProductsApiHooks.useLazyGetCountersForProductsQuery();
  const [getListOfTypesOfTraits] =
    DictionaryApiHooks.useLazyGetListOfTypesOfTraitsQuery();
  const [createNewTrait] = ProductsApiHooks.useCreateNewTraitMutation();

  function getVariantsForGridHandler(data?: GridRequestModel) {
    return getVariantsForGrid(data).then((res: any) => {
      return res.data;
    });
  }

  function getListOfAllTraitsHandler() {
    return getListOfAllTraits().then((res: any) => {
      return res.data;
    });
  }

  function getCountersForProductsHandler(id: any) {
    return getCountersForProducts(id).then((res: any) => {
      return res.data;
    });
  }

  function getListOfTypesOfTraitsHandler() {
    return getListOfTypesOfTraits().then((res: any) => {
      return res.data;
    });
  }

  function createNewTraitHandler(model) {
    return createNewTrait(model).then((res: any) => {
      return res.data;
    });
  }

  return {
    getVariantsForGridHandler,
    getListOfAllTraitsHandler,
    getCountersForProductsHandler,
    getListOfTypesOfTraitsHandler,
    createNewTraitHandler,
  };
}
