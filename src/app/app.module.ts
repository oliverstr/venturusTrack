import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';
import { TokenComponent } from './token/token.component';
import { AuthorizationService } from './services/authorization.service';
import { ConnectionService } from './services/connection.service';
import { HttpClientModule } from '@angular/common/http';
import { AppConfig } from './app.config';
import { HttpModule } from '@angular/http';

export function initConfig(config: AppConfig) {
  return () => config.load();
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TokenComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    AuthorizationService,
    ConnectionService,
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [AppConfig],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
