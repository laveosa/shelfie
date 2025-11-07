import { BaseController } from "./base-controller";

import signInModel from "../static-collections/Auth/user-sign-in.json";
import signUpModel from "../static-collections/Auth/user-sign-up.json";
import switchOrganizationModel from "../static-collections/Auth/switch-organization.json";
import resetPasswordModel from "../static-collections/Auth/reset-password.json";
import signInNumber from "../static-collections/Auth/sign-in-number.json";
import switchUserOrganizationModel from "../static-collections/Auth/switch-user-organization.json";

export class AuthController extends BaseController {
  public static userSignIn() {
    return this.staticDataApiHandler(signInModel);
  }

  public static userSignUp() {
    return this.staticDataApiHandler(signUpModel);
  }

  public static switchOrganization() {
    return this.staticDataApiHandler(switchOrganizationModel);
  }

  public static forgotPassword() {
    return this.staticDataApiHandler({});
  }

  public static resetPassword() {
    return this.staticDataApiHandler(resetPasswordModel);
  }

  public static confirmSignInNumber() {
    return this.staticDataApiHandler({});
  }

  public static confirmSignUpPhoneNumber() {
    return this.staticDataApiHandler({});
  }

  public static verifySignUpNumber() {
    return this.staticDataApiHandler({});
  }

  public static verifySignInNumber() {
    return this.staticDataApiHandler(signInNumber);
  }

  public static switchUserOrganization() {
    return this.staticDataApiHandler(switchUserOrganizationModel);
  }
}
