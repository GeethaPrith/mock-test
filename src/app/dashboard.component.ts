import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { SharedModule } from './shared/shared.module';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [RouterOutlet, SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(public auth: AuthService, private router: Router) {}

  onNavClick(route: string) {
    console.log('Navigating to:', route);
  }

  onLogout() {
    console.log('Logging out');
    this.auth.logout();
  }
}
