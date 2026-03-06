import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
declare var $: any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, AfterViewInit {

  employees: Employee[] = [];
  router: any;

  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit() {
    this.loadEmployees();
  }

  ngAfterViewInit() {

    setTimeout(() => {

      if ($.fn.DataTable.isDataTable('#employeeTable')) {
        $('#employeeTable').DataTable().destroy();
      }

      $('#employeeTable').DataTable(
        {
          dom: 'Bfrtip',
          buttons: [
            'excelHtml5',
            'pdfHtml5'
          ]
        }
      );
    }, 300);
  }

  loadEmployees(): void {
    this.apiService.request('GET', '/employees')
      .subscribe({
        next: (res: any) => {
          this.employees = res.employees || [];
          setTimeout(() => {
            $('#employeeTable').DataTable();
          }, 200);
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
