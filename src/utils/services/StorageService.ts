const StorageService = {
  // ----------------------------------------------------------------------- Local Storage
  setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  getLocalStorage(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },

  removeLocalStorage(key) {
    localStorage.removeItem(key);
  },

  clearLocalStorage() {
    localStorage.clear();
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
