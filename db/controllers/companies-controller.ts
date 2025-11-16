import { BaseController } from "./base-controller";

import companiesList from "../static-collections/Companies/companies-list.json";
import company from "../static-collections/Companies/company.json";
import companyLocation from "../static-collections/Companies/company-location.json";

export class CompaniesController extends BaseController {
  public static getListOfCompanies() {
    return this.staticDataApiHandler(companiesList);
  }

  public static getListOfCompaniesForGrid() {
    return this.staticDataApiHandler(
      this.createGridDefaultModel(companiesList),
    );
  }

  public static getListOfCompaniesWithLocationsForGrid() {
    return this.staticDataApiHandler(
      this.createGridDefaultModel(companiesList),
    );
  }

  public static createCompany() {
    return this.staticDataApiHandler(company);
  }

  public static getCompanyDetails() {
    return this.staticDataApiHandler(company);
  }

  public static addLocationToCompany() {
    return this.staticDataApiHandler(companyLocation);
  }

  public static deleteCompany() {
    return this.staticDataApiHandler({});
  }

  public static restoreCompany() {
    return this.staticDataApiHandler({});
  }

  public static updateLocationDetails() {
    return this.staticDataApiHandler({});
  }

  public static addNewLocationToCompany() {
    return this.staticDataApiHandler(companyLocation);
  }

  public static updateCompanyDetails() {
    return this.staticDataApiHandler({});
  }

  public static changePositionOfCompanyPhoto() {
    return this.staticDataApiHandler({});
  }

  public static changePositionOfLocationPhoto() {
    return this.staticDataApiHandler({});
  }

  public static deleteLocation() {
    return this.staticDataApiHandler({});
  }

  public static getCompaniesList() {
    return this.staticDataApiHandler(companiesList);
  }
}
