import {Injectable} from '@angular/core';
import {User} from "../models/user";


const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  setUserAccessToken(token: string) {
    localStorage.setItem('user_access_token', token);
  }

  setItem(key: string, value: string | null) {
    if (typeof value === "string") {
      localStorage.setItem(key, value);
    }
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key) || null;
  }

  getToken(): string | null {
    const token= localStorage.getItem(TOKEN_KEY) || '{}';
    return token || null;
  }

  getTokenExpiration() {
    const tokenData = localStorage.getItem(TOKEN_KEY);
    if (tokenData) {
      return JSON.parse(tokenData).expiration;
    }
    return null;
  }


  isLoggedIn(): boolean {
    const token = this.getToken();
    return token !== null;
  }

  isTokenExpired(): boolean {
    const accessToken = this.getToken();
    if (!accessToken || accessToken === '{}') {
      return true;
    }

    const tokenData = JSON.parse(atob(accessToken.split('.')[1]));
    const expirationDate = new Date(tokenData.exp * 1000);
    return expirationDate <= new Date();
  }

  clearToken() {
    localStorage.removeItem(TOKEN_KEY);
  }

  getUserId(): string {
    const userId = localStorage.getItem('userId');
    return userId || '';
  }

  setUserInfo(user: User ) {
    localStorage.setItem('userId', <string>user.id);
  }
}
