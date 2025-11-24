import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UsersActions, usersFeature } from '@team-insights/user-data-access';
@Component({
  selector: 'lib-feature-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-overview.html',
  styleUrl: './feature-overview.css',
})
export class FeatureOverview {
  private router = inject(Router);
  private store = inject(Store);

  users$ = this.store.select(usersFeature.selectUsers);
  loading$ = this.store.select(usersFeature.selectLoading);

  ngOnInit() {
    this.store.dispatch(UsersActions.enterDashboard());
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
