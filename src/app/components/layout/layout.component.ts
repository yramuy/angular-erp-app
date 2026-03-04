import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  isCollapsed = false;
  isLoggedIn = false;
  user: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.loadUserFromStorage();

    this.isLoggedIn = this.authService.isLoggedIn();

    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    this.authService.setLoginStatus(false);
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
