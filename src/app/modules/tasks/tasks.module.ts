import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TasksRoutingModule } from "./tasks-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TaskFormComponent } from "./task-form/task-form.component";
import { TaskListComponent } from "./task-list/task-list.component";

@NgModule({
  declarations: [
    TaskFormComponent,
    TaskListComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TasksModule { }
