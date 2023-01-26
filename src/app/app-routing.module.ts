import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './utils/login.guard';

const routes: Routes = [

  {
    path : 'login',
    component : LoginComponent,
  },

  {
    path : 'products',
    loadChildren : () => import('./products/products.module').then(m => m.ProductsModule),
    canActivate : [LoginGuard]

  },

  {
    path : '',
    redirectTo : 'login',
    pathMatch : 'full'
  },

  { path: '**', redirectTo: 'login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
