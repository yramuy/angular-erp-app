import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  user: any;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.loadUserFromStorage();

    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }
}
