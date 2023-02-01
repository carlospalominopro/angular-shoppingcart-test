import { Component } from '@angular/core';
import { ApiService } from '../utils/api.service';

@Component({
  selector: 'app-logout',
  template: `
    <button
      type="button"
      class="counter-cart btnLogout"
      mat-fab
      matTooltip="Logout"
      color="warn"
      (click)="service.logout()"
    >
      <mat-icon>logout</mat-icon>
    </button>
  `,
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {
  constructor(public service: ApiService) {}
}
