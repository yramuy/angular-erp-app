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
  isConfigOpen = false;
  isMyInfoOpen = false;
  isMenu: boolean = false;
  isChildMenu: boolean = false;

  menus: any = {
    myInfo: false,
    config: false,
    attendance: false,
    daily: false,
    monthly: false,
  };


  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.loadUserFromStorage();

    this.isLoggedIn = this.authService.isLoggedIn();

    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  toggleMenu(menu: string) {
    this.menus[menu] = !this.menus[menu];
  }

  toggleChildMenu() {
    this.isChildMenu = !this.isChildMenu;
  }


  toggleConfigMenu() {
    this.isConfigOpen = !this.isConfigOpen;
  }

  toggleMyInfoMenu() {
    this.isMyInfoOpen = !this.isMyInfoOpen;
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;


    if (this.isCollapsed) {
      this.isMyInfoOpen = false;
      this.isConfigOpen = false;
    }
  }

  logout() {
    this.authService.setLoginStatus(false);
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
