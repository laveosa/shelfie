import { BaseController } from "./base-controller";

import listOfCompanies from "../static-collections/Companies/list-of-companies.json";
import listOfCompaniesForGrid from "../static-collections/Companies/list-of-companies-for-grid.json";
import listOfCompaniesWithLocationsForGrid from "../static-collections/Companies/list-of-companies-with-locations-for-grid.json";
import newCompany from "../static-collections/Companies/new-company.json";
import companyDetails from "../static-collections/Companies/company-details.json";
import locationToCompany from "../static-collections/Companies/location-to-company.json";
import newLocationToCompany from "../static-collections/Companies/new-location-to-company.json";
import companiesList from "../static-collections/Companies/companies-list.json";

export class CompaniesController extends BaseController {
  public static getListOfCompanies() {
    return this.staticDataApiHandler(listOfCompanies);
  }

  public static getListOfCompaniesForGrid() {
    return this.staticDataApiHandler(
      this.createGridDefaultModel(listOfCompaniesForGrid),
    );
  }

  public static getListOfCompaniesWithLocationsForGrid() {
    return this.staticDataApiHandler(
      this.createGridDefaultModel(listOfCompaniesWithLocationsForGrid),
    );
  }

  public static createCompany() {
    return this.staticDataApiHandler(newCompany);
  }

  public static getCompanyDetails() {
    return this.staticDataApiHandler(companyDetails);
  }

  public static addLocationToCompany() {
    return this.staticDataApiHandler(locationToCompany);
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
    return this.staticDataApiHandler(newLocationToCompany);
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
