import {
  Component,
  inject,
  ChangeDetectorRef,
  ViewChild,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UsersActions, usersFeature } from '@team-insights/user-data-access';
import { SocketService } from '@team-insights/data-access';
import { HttpClient } from '@angular/common/http';
import { DynamicForm, FormFieldConfig } from '@team-insights/dynamic-form';
import { UiCharts, ChartData } from '@team-insights/ui-charts';
@Component({
  selector: 'lib-feature-overview',
  standalone: true,
  imports: [CommonModule, DynamicForm, UiCharts],
  templateUrl: './feature-overview.html',
  styleUrl: './feature-overview.css',
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FeatureOverview {
  private router = inject(Router);
  private store = inject(Store);
  private socketService = inject(SocketService);
  private cdr = inject(ChangeDetectorRef);
  private http = inject(HttpClient);

  @ViewChild(DynamicForm) dynamicForm!: DynamicForm;

  task: any[] = [];
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

  chartData: ChartData[] = [];

  private updateChart() {
    const counts: Record<string, number> = { High: 0, Medium: 0, Low: 0 };
    this.task.forEach((t) => {
      const p = t.priority || 'Low';
      if (counts[p] !== undefined) {
        counts[p]++;
      }
    });
    this.chartData = [
      { labels: 'High', values: counts['High'] },
      { labels: 'Medium', values: counts['Medium'] },
      { labels: 'Low', values: counts['Low'] },
    ];
  }

  handleTaskSubmit(formData: any) {
    console.log('Form submitted', formData);

    this.http.post('api/tasks', formData).subscribe((newTask) => {
      this.task.push(newTask);
      this.updateChart();
      this.cdr.detectChanges();
      this.dynamicForm.resetForm();
    });
  }

  users$ = this.store.select(usersFeature.selectUsers);
  loading$ = this.store.select(usersFeature.selectLoading);

  ngOnInit() {
    this.store.dispatch(UsersActions.enterDashboard());
    this.http.get<any[]>('api/tasks').subscribe((data) => {
      this.task = data;
    });

    this.socketService.onTaskCreated().subscribe((newTask) => {
      this.task.push(newTask);
      this.cdr.detectChanges();
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
