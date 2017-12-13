import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ResponseContentType, Http, Headers } from '@angular/http';
import { AuthorizationService } from './authorization.service';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../app.config';
@Injectable()
export class ConnectionService {

  constructor(
    private _auth: AuthorizationService,
    private _http: Http,
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

  getTagMedia(tag: string): Observable<Object[]> {
    const header = new Headers();
    const url = `https://www.instagram.com/explore/tags/${tag}/`;
    return this._http.get(url, { headers: header, responseType: ResponseContentType.Text })
    .map(data => {
      const posts = JSON.parse(data['_body'].split('"media": ')[1].split(', "top_posts": ')[0]).nodes;
      posts.forEach(post => {
        this.getUserByPostCode(post.code).subscribe(user => post['user'] = user);
      });
      return posts;
    });
  }

  getLocationMedia(location: string): Observable<Object[]> {
    const header = new Headers();
    const url = `https://www.instagram.com/explore/locations/${location}/`;
    return this._http.get(url, { headers: header, responseType: ResponseContentType.Text })
    .map(data => {
      const posts = JSON.parse(data['_body'].split('"media": ')[1].split(', "top_posts": ')[0]).nodes;
      posts.forEach(post => {
        this.getUserByPostCode(post.code).subscribe(user => post['user'] = user);
      });
      return posts;
    });
  }

  getUserByPostCode(postCode: string): Observable<any> {
    const header = new Headers();
    const url = `https://www.instagram.com/p/${postCode}/`;
    return this._http.get(url, { headers: header, responseType: ResponseContentType.Text })
    .map(data => {
      const allUser = data['_body'].split(', "owner": ');
      return JSON.parse(allUser[allUser.length - 1].split(', "is_ad": ')[0]);
    });
  }

}
