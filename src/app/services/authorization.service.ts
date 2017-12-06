import { Injectable } from '@angular/core';

@Injectable()
export class AuthorizationService {

  constructor() { }

  public token;

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.token = token;
    console.log(`Token saved succesfully: ${token}`);
  }

  getLocalToken() {
    let ok;
    const localToken = localStorage.getItem('token');
    if (localToken) {
      this.token = localToken.toString();
      return ok = true;
    }
    return ok = false;
  }

}
