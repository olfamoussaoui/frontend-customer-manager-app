import { LoginComponent } from './../login/login.component';
import { CustomerComponent } from './../customer/customer.component';
import { CreateComponent } from './../create/create.component';
import { Routes } from '@angular/router';


export const routes: Routes = [
  { path: 'home',       component: CustomerComponent },
  { path: 'create',     component: CreateComponent },
  { path: 'login',      component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
