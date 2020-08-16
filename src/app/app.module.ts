import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProfileComponent } from "./components/profile/profile.component";
import { LoginComponent } from "./components/login/login.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { RegisterComponent } from "./components/register/register.component";
import { SkillsComponent } from "./components/skills/skills.component";

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ProfileComponent,
    LoginComponent,
    PageNotFoundComponent,
    RegisterComponent,
    SkillsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
