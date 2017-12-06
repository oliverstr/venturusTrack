import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';
import { ConnectionService } from '../services/connection.service';
import { Media } from '../models/media';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {

  constructor(private _connection: ConnectionService, private _router: Router) { }

  private _mediaItems = [];
  private _mediaIndex = 0;
  public inAnimation = true;
  public outAnimation = false;
  public selectedMedia: Media;

  ngOnInit() {
    this.checkAuthorization();
    this.getMediaItems();
  }

  checkAuthorization() {
    this._connection.getToken();
  }

  getMediaItems(): void {
    this._connection.getTagMedia('venturus').subscribe(data => {
      this._mediaItems.push(data);
      this.selectedMedia = this._mediaItems[0].data[0];
      this.switchMedia();
    }, err => {
      if (err.status === 400) {
        this._connection.redirectToAuth();
      }
      console.log(err);
    });
  }

  switchMedia(): void {
    setTimeout(() => {
      this.animate('out');
      setTimeout(_ => {
        this._mediaIndex = this._mediaIndex === (this._mediaItems[0].data.length - 1) ? 0 : +1;
        this.selectedMedia = this._mediaItems[0].data[this._mediaIndex];
      }, 600); // Wait for out transition complete to load other image
      setTimeout(_ => {
        this.animate('in');
      }, 600); // Wait for in transition complete to load other image
      this.switchMedia();
    }, 5000); // Wait time between one image and the other
  }

  private animate(direction: string) {
    switch (direction) {
      case 'in': {
        this.inAnimation = true;
        this.outAnimation = false;
        break;
      }
      case 'out': {
        this.inAnimation = false;
        this.outAnimation = true;
        break;
      }
    }
  }

}

