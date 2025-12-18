
import { inject, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Task,CreateTaskRequest } from "@team-insights/util-interfaces";

@Injectable({
  providedIn: 'root',
})

export class TasksApiService {
  private url = 'api/tasks';
  private http = inject(HttpClient);

  getTasks():Observable<Task[]>{
    return this.http.get<Task[]>(this.url)
  }

  createTasks(task:CreateTaskRequest): Observable<Task>{
    return this.http.post<Task>(this.url,task)
  }
}