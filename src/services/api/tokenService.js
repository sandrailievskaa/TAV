// src/services/api/tokenService.js

let _token = null;

export const tokenService = {
  setToken(token) {
    _token = token;
  },
  getToken() {
    return _token;
  },
  clearToken() {
    _token = null;
  },
};
