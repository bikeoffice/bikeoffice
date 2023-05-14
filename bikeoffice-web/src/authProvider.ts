import { AuthProvider } from "react-admin";

export const authProvider: AuthProvider = {
  // called when the user attempts to log in
  login: async ({ username, password }) => {
    const request = new Request('api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    try {
      const response = await fetch(request);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      return Promise.resolve();
    } catch(e: any) {
      throw new Error('Network error');
    }
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
      : Promise.reject();
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve(),
};

/**
 * import { AuthProvider } from "react-admin";

export const authProvider: AuthProvider = {
  // called when the user attempts to log in
  login: async ({ username, password }) => {
    const request = new Request('api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'include', // Send cookies along with the request
    });

    try {
      const response = await fetch(request);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      return Promise.resolve();
    } catch(e: any) {
      throw new Error('Network error');
    }
  },
  // called when the user clicks on the logout button
  logout: () => {
    const request = new Request('api/auth/logout', {
      method: 'POST',
      credentials: 'include', // Send cookies along with the request
    });
    return fetch(request).then(() => {
      document.cookie = "schema=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      return Promise.resolve();
    });
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
    const request = new Request('api/auth/check', {
      method: 'GET',
      credentials: 'include', // Send cookies along with the request
    });
    return fetch(request).then(response => {
      if (response.status === 200) {
       

 */