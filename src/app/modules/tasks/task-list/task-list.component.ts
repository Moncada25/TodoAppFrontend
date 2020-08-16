import { Component, OnInit, HostBinding } from "@angular/core";
import { TasksService } from "../../../services/tasks/task.service";
import { Router } from "@angular/router";
import { User } from "../../../models/user";
import { Alerts } from "../../../helpers/alerts";
import { Task } from "./../../../models/task";

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.css"],
})
export class TaskListComponent implements OnInit {
  @HostBinding("class") classes = "row";
  tasks: Task[] = [];
  user: User = {};
  readonly alerts = new Alerts();

  constructor(
    private readonly tasksServices: TasksService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.getUserTasks();
  }

  private getUserTasks(): void {
    this.user = JSON.parse(localStorage.getItem("userLogged"));

    this.tasksServices.getUserTasks(this.user.username, this.user.id).subscribe(
      (res) => {
        this.tasks = res;
      },
    );
  }

  deleteTask(id: string): void {
    this.alerts
      .showAlertConfirm(
        "Are you sure?",
        "Once deleted, you will not be able to recover this task!",
        "warning"
      )
      .then((willDelete) => {
        if (willDelete.value) {
          this.tasksServices.deleteTask(id).subscribe((res) => {
            console.log(res);
            this.getUserTasks();
          });

          this.alerts.showAlert("Yeah!", "Task was deleted!", "success");
        }
      });
  }

  editTask(id: number): void {
    this.router.navigateByUrl("tasks/edit/" + id);
  }

  addTask(): void {
    this.router.navigate(["tasks/add"]);
  }
}
