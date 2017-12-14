import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';
import { ConnectionService } from '../services/connection.service';
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
  public selectedMedia;
  public tag = 'venturus';
  public durationSeconds = 5;
  public refreshMinutes = 5;

  ngOnInit() {
    this.getMediaItems(this.tag);
    setInterval(() => { this.getMediaItems(this.tag); }, ( this.refreshMinutes * 60000 ));
    setInterval(this.switchMedia.bind(this), ( this.durationSeconds * 1000 ));
  }

  checkAuthorization() {
    this._connection.getToken();
  }

  getMediaItems(tag: string): void {
    console.log(`Searching for posts with #${tag}..`);
    this._connection.getTagMedia(tag).subscribe(
      data => {
      console.log(data.length + ' posts ready...');
      this._mediaItems = data;
      this._mediaIndex = -1;
    }, err => console.log(err));
  }

  getLocationItems(location: string): void {
    console.log(`Searching for posts with location ${location}..`);
    this._connection.getLocationMedia(location).subscribe(
      data => {
        console.log(data.length + ' posts ready...');
        this._mediaItems = data;
        this._mediaIndex = -1;
      }, err => console.log(err));
  }

  switchMedia(): void {
      this.animate('out');
      setTimeout(() => {
        this._mediaIndex = this._mediaIndex === (this._mediaItems.length - 1) ? 0 : this._mediaIndex + 1;
        this.selectedMedia = this._mediaItems[this._mediaIndex];
      }, 500); // Wait for out transition complete to load other image
      setTimeout(() => {
        this.animate('in');
      }, 500); // Wait for in transition complete to load other image
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

