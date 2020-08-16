import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardService as AuthGuard } from "../../services/auth/auth-guard.service";
import { GameFormComponent } from "./game-form/game-form.component";
import { GameListComponent } from "./game-list/game-list.component";

const routes: Routes = [
  {
    path: "",
    component: GameListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "add",
    component: GameFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: GameFormComponent,
    canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
