import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-token',
  template: `Autorizando aplicação no instagram..`
})
export class TokenComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _auth: AuthorizationService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getToken();
  }

  getToken(): void {
    this._route.fragment.subscribe((fragment: string) => {
      this._auth.saveToken(fragment.replace('access_token=', ''));
      this._router.navigate(['/main']);
    });
  }

}
