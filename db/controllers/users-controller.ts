import { BaseController } from "./base-controller";

import userPreferences from "../static-collections/user-preferences.json";
import defaultUserPreferences from "../static-collections/default-user-preferences.json";
import userDetails from "../static-collections/user-details.json";
import userOrganizations from "../static-collections/user-organizations.json";

export class UsersController extends BaseController {
  public static getUserPreferences() {
    return this.staticDataApiHandler(userPreferences);
  }

  public static getDefaultUserPreferences() {
    return this.staticDataApiHandler(defaultUserPreferences);
  }

  public static updateUserPreferences() {
    return this.staticDataApiHandler({});
  }

  public static resetUserPreferences() {
    return this.staticDataApiHandler({});
  }

  public static updateUserContactInformation() {
    return this.staticDataApiHandler({});
  }

  public static updateUserPassword() {
    return this.staticDataApiHandler({});
  }

  public static changeLanguage() {
    return this.staticDataApiHandler({});
  }

  public static getUserDetails() {
    return this.staticDataApiHandler(userDetails);
  }

  public static getUserOrganization() {
    return this.staticDataApiHandler(userOrganizations);
  }
}
