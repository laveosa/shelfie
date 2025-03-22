import ProductsApiHooks from "@/utils/services/api/ProductsApiService.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { DictionaryApiHooks } from "@/utils/services/api/DictionaryApiService.ts";

export default function useManageVariantsPageService() {
  const [getVariantsForGrid] = ProductsApiHooks.useGetVariantsForGridMutation();
  const [getListOfAllTraits] =
    ProductsApiHooks.useLazyGetListOfAllTraitsQuery();
  const [getTrait] = ProductsApiHooks.useLazyGetTraitQuery();
  const [getCountersForProducts] =
    ProductsApiHooks.useLazyGetCountersForProductsQuery();
  const [getListOfTypesOfTraits] =
    DictionaryApiHooks.useLazyGetListOfTypesOfTraitsQuery();
  const [getListOfTraitsForProduct] =
    ProductsApiHooks.useLazyGetListOfTraitsForProductQuery();
  const [getListOfTraitsWithOptionsForProduct] =
    ProductsApiHooks.useLazyGetListOfTraitsWithOptionsForProductQuery();
  const [createNewTrait] = ProductsApiHooks.useCreateNewTraitMutation();
  const [setProductTraits] = ProductsApiHooks.useSetProductTraitsMutation();
  const [getOptionsForTrait] =
    ProductsApiHooks.useLazyGetOptionsForTraitQuery();
  const [createNewOptionForTrait] =
    ProductsApiHooks.useCreateNewOptionForTraitMutation();
  const [updateOptionsForTrait] =
    ProductsApiHooks.useUpdateOptionOfTraitMutation();
  const [deleteOptionsForTrait] =
    ProductsApiHooks.useDeleteOptionOfTraitMutation();
  const [updateTrait] = ProductsApiHooks.useUpdateTraitMutation();
  const [createVariant] = ProductsApiHooks.useCreateVariantMutation();

  function getVariantsForGridHandler(data?: GridRequestModel) {
    return getVariantsForGrid(data).then((res: any) => {
      return res.data;
    });
  }

  function getCountersForProductsHandler(id: any) {
    return getCountersForProducts(id).then((res: any) => {
      return res.data;
    });
  }

  function createVariantHandler(id, model) {
    return createVariant({ id, model }).then((res: any) => {
      return res.data;
    });
  }

  function getListOfAllTraitsHandler() {
    return getListOfAllTraits().then((res: any) => {
      return res.data;
    });
  }

  function getListOfTraitsWithOptionsForProductHandler(id) {
    return getListOfTraitsWithOptionsForProduct(id).then((res: any) => {
      return res.data;
    });
  }

  function getListOfTraitsForProductHandler(id) {
    return getListOfTraitsForProduct(id).then((res: any) => {
      return res.data;
    });
  }

  function getTraitHandler(id: number) {
    return getTrait(id).then((res: any) => {
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

  function updateTraitHandler(id, model) {
    return updateTrait({ id, model }).then((res: any) => {
      return res.data;
    });
  }

  function setProductTraitsHandler(id, model) {
    return setProductTraits({ id, model }).then((res: any) => {
      return res.data;
    });
  }

  function getOptionsForTraitHandler(id) {
    return getOptionsForTrait(id).then((res: any) => {
      return res.data;
    });
  }

  function createNewOptionForTraitHandler(id, model) {
    return createNewOptionForTrait({ id, model }).then((res: any) => {
      return res.data;
    });
  }

  function updateOptionsForTraitHandler(id, model) {
    return updateOptionsForTrait({ id, model }).then((res: any) => {
      return res.data;
    });
  }

  function deleteOptionsForTraitHandler(id) {
    return deleteOptionsForTrait(id).then((res: any) => {
      return res.data;
    });
  }

  return {
    getVariantsForGridHandler,
    getCountersForProductsHandler,
    createVariantHandler,
    getListOfAllTraitsHandler,
    getListOfTraitsForProductHandler,
    getListOfTraitsWithOptionsForProductHandler,
    getTraitHandler,
    getListOfTypesOfTraitsHandler,
    createNewTraitHandler,
    updateTraitHandler,
    setProductTraitsHandler,
    getOptionsForTraitHandler,
    createNewOptionForTraitHandler,
    updateOptionsForTraitHandler,
    deleteOptionsForTraitHandler,
  };
}
