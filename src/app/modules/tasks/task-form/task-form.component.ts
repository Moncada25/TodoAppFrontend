import { Component, OnInit } from "@angular/core";
import { Task } from "../../../models/task";
import { TasksService } from "../../../services/tasks/task.service";
import { Router, ActivatedRoute } from "@angular/router";
import { User } from "../../../models/user";
import { Alerts } from "../../../helpers/alerts";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-task-form",
  templateUrl: "./task-form.component.html",
  styleUrls: ["./task-form.component.css"],
})
export class TaskFormComponent implements OnInit {
  readonly alerts = new Alerts();
  edit: boolean;
  task: Task = {};
  user: User = {};
  taskForm: FormGroup;

  constructor(
    private readonly tasksServices: TasksService,
    private readonly activatedRouted: ActivatedRoute,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder
  ) {
    this.user = JSON.parse(localStorage.getItem("userLogged"));
  }

  ngOnInit(): void {
    const params = this.activatedRouted.snapshot.params;

    if (params.id) {
      this.tasksServices.getTask(Number(params.id)).subscribe(
        (res) => {
          this.task = res;
          this.taskForm.setValue(this.task);
          this.edit = true;
        },
        () =>
          this.alerts
            .showAlert("Error", "Task not found!", "error")
            .then((result) => {
              if (result.value || result.dismiss) {
                this.router.navigate(["tasks"]);
              }
            })
      );
    }
    this.createTaskForm();
  }

  updateTask(): void {
    delete this.taskForm.value.created_at;

    this.tasksServices
      .updateTask(this.task.id, this.taskForm.value)
      .subscribe(() => {
        this.alerts
          .showAlert("Yeah!", "The task was updated successfully!", "success")
          .then((result) => {
            if (result.value || result.dismiss) {
              this.router.navigate(["tasks"]);
            }
          });
      });
  }

  saveNewTask(): void {
    delete this.task.id;
    delete this.task.created_at;

    const newTask: Task = {
      ...this.task,
      ...this.taskForm.value,
    };

    newTask.assignment = this.user.name + " " + this.user.last_name;
    newTask.id_user = this.user.id;

    this.tasksServices.saveTask(newTask).subscribe(() => {
      this.alerts
        .showAlert("Yeah!", "The task was added successfully!", "success")
        .then((result) => {
          if (result.value || result.dismiss) {
            this.router.navigate(["tasks"]);
          }
        });
    });
  }

  createTaskForm(): void {
    this.taskForm = this.formBuilder.group({
      id: new FormControl(this.task.id, []),
      assignment: new FormControl(
        { value: this.user.name + " " + this.user.last_name, disabled: true },
        [Validators.required]
      ),
      title: new FormControl(this.task.title, [
        Validators.minLength(4),
        Validators.maxLength(30),
      ]),
      description: new FormControl(this.task.description, [
        Validators.minLength(4),
        Validators.maxLength(100),
      ]),
      points: new FormControl(this.task.points, [
        Validators.min(1),
        Validators.max(21),
      ]),
      created_at: new FormControl(this.task.created_at, []),
      completed: new FormControl(this.task.completed, []),
      id_user: [this.task.completed],
    });
  }
}
