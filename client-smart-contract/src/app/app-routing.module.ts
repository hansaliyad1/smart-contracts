import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';

import { TemplateComponent } from './components/template/template.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AssetsListComponent } from './components/assets-list/assets-list.component';
import { AssetsCreateComponent } from './components/assets-create/assets-create.component';
import { AssetsCreateDivComponent } from './components/assets-create-div/assets-create-div.component';
import { UserKeysComponent } from './components/user-keys/user-keys.component';
import { AssetsTransferComponent } from './components/assets-transfer/assets-transfer.component';
import { AssetsInfoComponent } from './components/assets-info/assets-info.component';

const routes: Routes = [
  {
    path: 'template',
    component: TemplateComponent
  },
  {
    path: 'register',
    component: RegisterComponent, // Register Route
    canActivate: [NotAuthGuard] // User must NOT be logged in to view this route
  },
  {
    path: 'login',
    component: LoginComponent, // Login Route
    canActivate: [NotAuthGuard] // User must NOT be logged in to view this route
  },
  {
    path: 'user-keys',
    component: UserKeysComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent, // Dashboard Route,
    canActivate: [AuthGuard] // User must be logged in to view this route
  },
  {
    path: 'profile',
    component: ProfileComponent, // Profile Route
    canActivate: [AuthGuard] // User must be logged in to view this route
  },
  {
    path: 'assets',
    component: AssetsListComponent, // Profile Route
    canActivate: [AuthGuard] // User must be logged in to view this route
  },
  {
    path: 'assets-create',
    component: AssetsCreateComponent, // Profile Route
    canActivate: [AuthGuard] // User must be logged in to view this route
  },
  {
    path: 'assets-create-div',
    component: AssetsCreateDivComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'assets-transfer',
    component: AssetsTransferComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'assets-info/:txid',
    component: AssetsInfoComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', component: HomeComponent } // "Catch-All" Route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
