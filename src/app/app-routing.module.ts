import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { AuthGuard } from './auth.guard';
import { UploadComponent } from './upload/upload.component';
import { ContactComponent } from './contact/contact.component';
import { HouseDetailsComponent } from './house-details/house-details.component';
import { AuthService } from './auth.service';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditHouseComponent } from './edit-house/edit-house.component';


const routes: Routes = [
  {path: "", component: LandingComponent},
  {path: "register", component: RegisterComponent},
  {path: "login", component: LoginComponent},
  {path: "home", component: HomeComponent, canActivate: [AuthGuard]},
  {path: "upload", component: UploadComponent, canActivate: [AuthGuard]},
  {path: "contact", component: ContactComponent},
  {path: "house/:id", component: HouseDetailsComponent, canActivate: [AuthGuard ]},
  {path: "profile", component: ProfileComponent, canActivate: [AuthGuard ]},
  {path: "profile/:id", component: ProfileComponent, canActivate: [AuthGuard ]},
  {path: "edit/:id", component: EditProfileComponent, canActivate: [AuthGuard ]},
  {path: "edit-house/:id", component: EditHouseComponent, canActivate: [AuthGuard ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
