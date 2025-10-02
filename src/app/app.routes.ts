import { Routes } from '@angular/router';
import { LoginComponent } from './principal/login/login.component';
import { IndexComponent } from './principal/index/index.component';

export const routes: Routes = [
    {path: ':alias/login', component: LoginComponent},
    {path: ':alias/index', component: IndexComponent}
];
