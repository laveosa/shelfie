import { BaseController } from "./base-controller";

import token from "../static-collections/Auth/token.json";
import signInNumber from "../static-collections/Auth/sign-in-number.json";

export class AuthController extends BaseController {
  public static userSignIn() {
    return this.staticDataApiHandler(token);
  }

  public static userSignUp() {
    return this.staticDataApiHandler(token);
  }

  public static switchOrganization() {
    return this.staticDataApiHandler(token);
  }

  public static forgotPassword() {
    return this.staticDataApiHandler({});
  }

  public static resetPassword() {
    return this.staticDataApiHandler(token);
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
    return this.staticDataApiHandler(token);
  }
}
