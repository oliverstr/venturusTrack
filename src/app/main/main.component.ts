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
  public tag = 'venturus';

  ngOnInit() {
    this.getMediaItems('venturus');
  }

  checkAuthorization() {
    this._connection.getToken();
  }

  getMediaItems(tag: string): void {
    this._connection.getTagMedia(tag).subscribe(
      data => {
      this._mediaItems = data;
      console.log(this._mediaItems);
      this.selectedMedia = this._mediaItems[0];
      this.switchMedia();
    }, err => console.log(err));
  }

  getLocationItems(): void {
    this._connection.getLocationMedia(ConnectionService.LOCATIONS.venturus).subscribe(
      data => {
      this._mediaItems = data;
      this.selectedMedia = this._mediaItems[0];
      this.switchMedia();
    }, err => console.log(err));
  }

  switchMedia(): void {
    setTimeout(() => {
      this.animate('out');
      setTimeout(_ => {
        this._mediaIndex = this._mediaIndex === (this._mediaItems.length - 1) ? 0 : this._mediaIndex + 1;
        this.selectedMedia = this._mediaItems[this._mediaIndex];
      }, 500); // Wait for out transition complete to load other image
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

