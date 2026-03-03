import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-angular-app';
  // hello = "Welcome to Angular JS";
  skills: string[]= [];
  isSideNavClosed = false;

  toggleSideNav() {
    this.isSideNavClosed = !this.isSideNavClosed;
  }

  ngOnInit() {
    this.skills = this.getSkills();
  }

  getName() {
    return "Ramu Y";
  }

  getSkills() {
     return ['PHP 1', 'Flutter 2', 'React 3', 'Angular 4'];
  }
}
