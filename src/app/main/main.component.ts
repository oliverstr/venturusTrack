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
  public config = {
    mediaItemsInterval: undefined, switchMediaInteral: undefined
  };
  public newConfig;
  public displaySettings = false;

  ngOnInit() {
    this.setConfig();
    this.getMediaItems(this.config['tag']);
    this.config.mediaItemsInterval = setInterval(() => {
       this.getMediaItems(this.config['tag']); }
      , ( this.config['refreshMinutes'] * 60000 ));
    this.config.switchMediaInteral = setInterval(this.switchMedia.bind(this), ( this.config['durationSeconds'] * 1000 ));
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

  setNewConfig() {
    clearInterval(this.config.switchMediaInteral);
    clearInterval(this.config.mediaItemsInterval);
    localStorage['tag'] = this.newConfig.tag;
    localStorage['durationSeconds'] = this.newConfig.durationSeconds;
    localStorage['refreshMinutes'] = this.newConfig.refreshMinutes;
    this.config = this.newConfig;
    this.ngOnInit();
    this.toggleSettings();
  }

  toggleSettings() {
    this.displaySettings = this.displaySettings ? false : true;
    if (this.displaySettings) {
      setTimeout(() => {
        this.displaySettings = false;
      }, 10000);
    }
  }

  setConfig() {
    this.config['tag'] = localStorage['tag'] || 'boracurtirvnt';
    this.config['durationSeconds'] = localStorage['durationSeconds'] || 5;
    this.config['refreshMinutes'] = localStorage['refreshMinutes'] || 5;
    this.newConfig = Object.assign({}, this.config);
  }

}

