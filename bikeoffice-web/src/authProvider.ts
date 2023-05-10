import { AuthProvider } from "react-admin";

export const authProvider: AuthProvider = {
  // called when the user attempts to log in
  login: ({ username }) => {
    return fetch("/api/schema?schema=" + username)
  },
  // called when the user clicks on the logout button
  logout: () => {
    document.cookie = "schema=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    return Promise.resolve();
  },
  // called when the API returns an error
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      document.cookie = "schema=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return document.cookie.includes("schema=")
        ? Promise.resolve()
        : Promise.reject();  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve(),
};
