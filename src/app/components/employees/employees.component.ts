import { Component } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {

  employees: Employee[] = [];
  router: any;
  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.apiService.request('GET', '/employees')
      .subscribe({
        next: (res: any) => {
          this.employees = res.employees || [];
          console.log('Employees:', this.employees);
        },
        error: (err) => {
          if (err.status === 401) {
            alert('Failed to load employees');
            this.authService.setLoginStatus(false);
          } else {
            alert('Something went wrong. Please try again');
          }         
          
          console.error('Failed to load employees', err);
        }
      });
  }
}
