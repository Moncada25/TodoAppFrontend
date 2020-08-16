import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "./components/profile/profile.component";
import { LoginComponent } from "./components/login/login.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { RegisterComponent } from "./components/register/register.component";
import { AuthGuardService as AuthGuard } from "./services/auth/auth-guard.service";
import { UserGuardService as UserGuard } from "./services/auth/user-guard.service";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full",
    canActivate: [UserGuard],
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [UserGuard],
  },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [UserGuard],
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "tasks",
    loadChildren: () => import("./modules/tasks/tasks.module").then(m => m.TasksModule)
  },
  {
    path: "games",
    loadChildren: () => import("./modules/games/games.module").then(m => m.GamesModule)
  },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
