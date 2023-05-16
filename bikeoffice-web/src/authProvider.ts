import { response } from "express";
import { AuthProvider } from "react-admin";

export const authProvider: AuthProvider = {
  // called when the user attempts to log in
  login: async ({ username, password }) => {
    const request = new Request('api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const response = await fetch(request);
    if (response.status < 200 || response.status >= 300) {
      return Promise.reject('Invalid credentials');
    }
    return Promise.resolve();

  },
  // called when the user clicks on the logout button
  logout: () => {
    document.cookie = "plato=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    return Promise.resolve();
  },
  // called when the API returns an error
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      document.cookie = "plato=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => fetch('/api/auth/check').then(res => !res.ok ? Promise.reject('Unauthorized') : Promise.resolve()),
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve(),
};