import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenComponent } from './token/token.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: ':hashtag', component: MainComponent },
  { path: '', component: MainComponent },
  { path: 'token', component: TokenComponent },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
