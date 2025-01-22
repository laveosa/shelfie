import { StorageKeyEnum } from "@/const/enums/StorageKeyEnum.ts";
import { removeObjectProperty } from "@/utils/helpers/quick-helper.ts";

const appKey = StorageKeyEnum.APP;

const StorageService = {
  // ----------------------------------------------------------------------- Local Storage
  setLocalStorage(key, value) {
    let appModel: any = localStorage.getItem(appKey);
    appModel = appModel ? JSON.parse(appModel) : {};
    appModel[key] = value;
    localStorage.setItem(appKey, JSON.stringify(appModel));
  },

  getLocalStorage(key) {
    let appModel = localStorage.getItem(appKey);
    appModel = appModel && JSON.parse(appModel);
    return appModel ? appModel[key] : null;
  },

  removeLocalStorage(key) {
    let appModel: any = localStorage.getItem(appKey);
    appModel = appModel && JSON.parse(appModel);

    if (appModel) {
      appModel = removeObjectProperty(appModel, key);
      localStorage.setItem(appKey, JSON.stringify(appModel));
    }
  },

  clearLocalStorage() {
    localStorage.removeItem(appKey);
  },

  // ----------------------------------------------------------------------- Session Storage
  setSessionStorage(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  },

  getSessionStorage(key) {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },

  removeSessionStorage(key) {
    sessionStorage.removeItem(key);
  },

  clearSessionStorage() {
    sessionStorage.clear();
  },

  // ----------------------------------------------------------------------- Cookies
  setCookie(name, value, days = 7) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  },

  getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) return decodeURIComponent(cookieValue);
    }
    return null;
  },

  removeCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  },

  clearCookies() {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const cookieName = cookie.split("=")[0];
      this.removeCookie(cookieName);
    }
  },
};

export default StorageService;
