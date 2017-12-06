import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthorizationService } from './authorization.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { AppConfig } from '../app.config';

@Injectable()
export class ConnectionService {

  constructor(
    private _auth: AuthorizationService,
    private _http: HttpClient,
    private _config: AppConfig
  ) { }

  static LOCATIONS = {
    venturus: '251957435',
  };


  private _clientID = this._config.getConfig(AppConfig.KEYS.CLIENT_ID);
  private _appURI = this._config.getConfig(AppConfig.KEYS.APP_URI);
  private _tokenHandler = this._config.getConfig(AppConfig.KEYS.TOKEN_HANDLER);
  private _athorizationLink =
  `https://api.instagram.com/oauth/authorize/?client_id=${this._clientID}&redirect_uri=${this._appURI}` +
  `${this._tokenHandler}&response_type=token&scope=public_content`;

  redirectToAuth() {
    window.location.href = this._athorizationLink;
  }

  getToken(): void {
    if (!this._auth.getLocalToken()) {
      this.redirectToAuth();
    }
  }

  getUserData(): Observable<any> {
    const url = `https://api.instagram.com/v1/users/self/?access_token=${this._auth.token}`;
    return this._http.get<any>(url);
  }

  getLocationLastMedia(locationID: string): Observable<any> {
    const url = `https://api.instagram.com/v1/locations/${locationID}/media/recent?access_token=${this._auth.token}`;
    return this._http.get<any>(url);
  }

  getLocationDetails(locationID: string): Observable<any> {
    const url = `https://api.instagram.com/v1/locations/${locationID}?access_token=${this._auth.token}`;
    return this._http.get<any>(url);
  }

  getTagMedia(tag: string): Observable<any> {
    const url = `https://api.instagram.com/v1/tags/${tag}/media/recent?access_token=${this._auth.token}`;
    return this._http.get<any>(url);
  }

}
