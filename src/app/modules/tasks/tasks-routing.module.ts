import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TaskFormComponent } from "./task-form/task-form.component";
import { TaskListComponent } from "./task-list/task-list.component";
import { AuthGuardService as AuthGuard } from "../../services/auth/auth-guard.service";

const routes: Routes = [
  {
    path: "",
    component: TaskListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "add",
    component: TaskFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit/:id",
    component: TaskFormComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
