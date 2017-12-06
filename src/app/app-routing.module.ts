import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenComponent } from './token/token.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'token', component: TokenComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
