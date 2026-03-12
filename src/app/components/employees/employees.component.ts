import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

declare var $: any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[] = [];
  message: string = '';
  isMessage: boolean = false;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {

    const state = history.state;

  if (state.message) {
      this.message = state.message;
      this.isMessage = true;

      // Clear History
      history.replaceState({}, '');

      setTimeout(() => {
        this.isMessage = false;
      }, 3000);
    }

    this.loadEmployees();
  }

  loadEmployees(): void {

    this.apiService.request('GET', '/employees')
      .subscribe({
        next: (res: any) => {

          this.employees = res.employees || [];

          setTimeout(() => {
            this.initializeDataTable();
          }, 0);

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

  initializeDataTable() {

    if ($.fn.DataTable.isDataTable('#employeeTable')) {
      $('#employeeTable').DataTable().destroy();
    }

    $('#employeeTable').DataTable({
      dom: 'Bfrtip',
      buttons: [
        'excelHtml5',
        'pdfHtml5'
      ]
    });
  }

  handleAdd() {
    this.router.navigate(['/employees/add']);
  }
}