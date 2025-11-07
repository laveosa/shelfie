import { BaseController } from "./base-controller";

export class AssetsController extends BaseController {
  public static uploadPhoto() {
    return this.staticDataApiHandler({});
  }

  public static deletePhoto() {
    return this.staticDataApiHandler({});
  }

  public static downloadAsset() {
    return this.staticDataApiHandler({});
  }

  public static setPhotoActivationState() {
    return this.staticDataApiHandler({});
  }
}
