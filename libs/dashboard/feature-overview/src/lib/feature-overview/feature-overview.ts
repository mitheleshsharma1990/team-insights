import { Component, inject, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UsersActions, usersFeature } from '@team-insights/user-data-access';
// import { SocketService } from '@team-insights/data-access';
// import { HttpClient } from '@angular/common/http';
import { DynamicForm, FormFieldConfig } from '@team-insights/dynamic-form';
import { UiCharts, ChartData } from '@team-insights/ui-charts';
import { AuthService } from '@team-insights/feature-login';
import { Actions, ofType } from '@ngrx/effects';
import {
  CreateTaskRequest,
  CreateUserRequest,
} from '@team-insights/util-interfaces';
import { tasksFeature, TasksActions } from '@team-insights/tasks-data-access';
import { map, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'lib-feature-overview',
  standalone: true,
  imports: [CommonModule, DynamicForm, UiCharts],
  templateUrl: './feature-overview.html',
  styleUrl: './feature-overview.css',
})
export class FeatureOverview {
  private router = inject(Router);
  private store = inject(Store);
  private actions$ = inject(Actions);
  // private socketService = inject(SocketService);
  // private cdr = inject(ChangeDetectorRef);
  // private http = inject(HttpClient);
  private auth = inject(AuthService);

  @ViewChild(DynamicForm) dynamicForm!: DynamicForm;
  @ViewChild('barChart') barChart!: UiCharts;

  showAddUserForm = false;
  currentUser = this.auth.currentUser();
  tasks$ = this.store.select(tasksFeature.selectTasks);
  tasksLoading$ = this.store.select(tasksFeature.selectLoading);
  users$ = this.store.select(usersFeature.selectUsers);
  loading$ = this.store.select(usersFeature.selectLoading);

  chartData$: Observable<ChartData[]> = new Observable<[]>();

  taskFormConfig: FormFieldConfig[] = [
    {
      type: 'text',
      name: 'title',
      label: 'Task Title',
      required: true,
    },
    {
      type: 'select',
      name: 'priority',
      label: 'Priority',
      required: true,
      options: ['Low', 'Medium', 'High'],
    },
    {
      type: 'checkbox',
      name: 'isUrgent',
      label: 'Mark as Urgent',
      value: false,
      required: false,
    },
  ];

  addUserFormConfig: FormFieldConfig[] = [
    {
      type: 'text',
      name: 'name',
      label: 'Full Name',
      required: true,
    },
    {
      type: 'text',
      name: 'email',
      label: 'Email Address',
      required: true,
    },
    {
      type: 'password',
      name: 'password',
      label: 'Temporary Password',
      required: true,
    },
    {
      type: 'select',
      name: 'role',
      label: 'Role',
      options: ['ADMIN', 'MANAGER', 'ENGINEER'],
      required: true,
      value: 'ENGINEER',
    },
  ];

  toggleAddUser() {
    this.showAddUserForm = !this.showAddUserForm;
  }

  private updateChart() {
    const counts: Record<string, number> = { High: 0, Medium: 0, Low: 0 };
    this.chartData$ = this.tasks$.pipe(
      map((tasks) => {
        tasks.forEach((t) => {
          const p = t.priority || 'Low';
          if (counts[p] !== undefined) {
            counts[p]++;
          }
        });
        console.log('counts', counts);

        return [
          { labels: 'High', values: counts['High'] },
          { labels: 'Medium', values: counts['Medium'] },
          { labels: 'Low', values: counts['Low'] },
        ];
      })
    );
    this.barChart.updateChart();
  }

  handleTaskSubmit(formData: CreateTaskRequest) {
    this.store.dispatch(TasksActions.createTask({ task: formData }));
  }

  handleAddUserSubmit(formData: CreateUserRequest) {
    this.store.dispatch(UsersActions.createUser({ user: formData }));
    this.showAddUserForm = false;
  }

  ngOnInit() {
    this.store.dispatch(UsersActions.enterDashboard());
    this.store.dispatch(TasksActions.loadTasks());
    this.tasks$.subscribe(() => {
      this.updateChart();
    });

    // we will use this socket code later to display new task notifications
    // this.socketService.onTaskCreated().subscribe((newTask) => {
    //   this.task.push(newTask);
    //   this.cdr.detectChanges();
    // });
    this.actions$
      .pipe(
        ofType(TasksActions.createTaskSuccess),
        takeUntilDestroyed() // Automatically cleans up when component is destroyed
      )
      .subscribe(() => {
        this.dynamicForm.resetForm();
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
