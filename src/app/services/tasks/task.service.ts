import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Task } from "../../models/task";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class TasksService {
  constructor(private readonly http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(environment.API_URL + "/tasks");
  }

  getUserTasks(user: string, id: string | number): Observable<Task[]> {
    return this.http.get<Task[]>(environment.API_URL + "/tasks/" + user + "/" + id);
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(environment.API_URL + "/tasks/" + id);
  }

  deleteTask(id: string): Observable<Task> {
    return this.http.delete<Task>(environment.API_URL + "/tasks/" + id);
  }

  saveTask(task: Task): Observable<Task> {
    return this.http.post<Task>(environment.API_URL + "/tasks/", task);
  }

  updateTask(id: string | number, updatedTask: Task): Observable<Task> {
    return this.http.put<Task>(environment.API_URL + "/tasks/" + id, updatedTask);
  }
}
