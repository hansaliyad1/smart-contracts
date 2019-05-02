import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateComponent } from './components/template/template.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AssetsListComponent } from './components/assets-list/assets-list.component';
import { AssetsCreateComponent } from './components/assets-create/assets-create.component';
import { AssetsCreateDivComponent } from './components/assets-create-div/assets-create-div.component';
import { UserKeysComponent } from './components/user-keys/user-keys.component';
import { AssetsTransferComponent } from './components/assets-transfer/assets-transfer.component';
import { AssetsInfoComponent } from './components/assets-info/assets-info.component';

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    ProfileComponent,
    AssetsListComponent,
    AssetsCreateComponent,
    AssetsCreateDivComponent,
    UserKeysComponent,
    AssetsTransferComponent,
    AssetsInfoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [AuthService, AuthGuard, NotAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
