import { BaseController } from "./base-controller";

import countyCodeModel from "../static-collections/Dictionaries/country-code.json";
import sortingOptionsList from "../static-collections/Dictionaries/sorting-options-list.json";
import listOfTypesOfTraits from "../static-collections/Dictionaries/list-of-types-traits.json";
import taxesList from "../static-collections/Dictionaries/taxes-list.json";
import currenciesList from "../static-collections/Dictionaries/currencies-list.json";
import languagesList from "../static-collections/Dictionaries/languages-list.json";
import deliveryServicesList from "../static-collections/Dictionaries/delivery-services-list.json";

export class DictionaryController extends BaseController {
  public static getCountryCode() {
    return this.staticDataApiHandler(countyCodeModel);
  }

  public static getSortingOptionsForGrid() {
    return this.staticDataApiHandler(
      this.createGridDefaultModel(sortingOptionsList),
    );
  }

  public static getListOfTypesOfTraits() {
    return this.staticDataApiHandler(listOfTypesOfTraits);
  }

  public static getTaxesList() {
    return this.staticDataApiHandler(taxesList);
  }

  public static getCurrenciesList() {
    return this.staticDataApiHandler(currenciesList);
  }

  public static getLanguagesList() {
    return this.staticDataApiHandler(languagesList);
  }

  public static getDeliveryServicesList() {
    return this.staticDataApiHandler(deliveryServicesList);
  }
}
