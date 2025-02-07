import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";

export class EnvironmentService {
  public static isLocalEnvironment(): boolean {
    return window.location.href.includes(NavUrlEnum.LOCAL);
  }

  public static isDevEnvironment(): boolean {
    return window.location.href.includes(NavUrlEnum.DEV);
  }
}
