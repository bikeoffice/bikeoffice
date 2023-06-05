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
    response.json().then(data => localStorage.setItem('info', JSON.stringify(data)));
    return Promise.resolve();
  },

  // called when the user clicks on the logout button
  logout: () => fetch('/api/auth/logout').then(res => res.ok ? Promise.resolve() : Promise.reject()),

  // called when the API returns an error
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      window.location.href = '/login';
      return Promise.reject('Unauthorized');
    }
    return Promise.resolve();
  },

  // called when the user navigates to a new location, to check for authentication
  checkAuth: async () => {
    return fetch('/api/auth/check').then(res =>  !res.ok ? Promise.reject() : Promise.resolve());
  },

  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve(),
};
